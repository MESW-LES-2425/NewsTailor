from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from NewsTailorDjangoApplication.connections.dev_to_news import obtain_news_from_dev_to
from NewsTailorDjangoApplication.connections.news_api import obtain_news_from_news_api, obtain_news_from_guardian_api, \
    obtain_news_from_new_york_times
from NewsTailorDjangoApplication.serializers.newspaper_serializers import NewsPaperSerializer


class FetchNewsView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request):
        data = request.data
        categories = data.get("categories")
        language = data.get("language")
        sources = data.get("sources")
        userid = data.get("userid")
        timeline = data.get("timeline")

        if not all([categories, language, sources]):
            return Response({"error": "Missing Category, Language, or Sources in the request."},
                            status=status.HTTP_400_BAD_REQUEST)

        if not isinstance(sources, list) or not isinstance(categories, list):
            return Response({"error": "Sources should be provided as a list."},
                            status=status.HTTP_400_BAD_REQUEST)

        aggregated_response = {}

        for source in sources:
            if source == "news_api":
                aggregated_response["news_api"] = obtain_news_from_news_api(categories, language, timeline)
            elif source == "guardian":
                aggregated_response["guardian"] = obtain_news_from_guardian_api(categories)
            elif source == "nyt":
                aggregated_response["nyt"] = obtain_news_from_new_york_times()
            elif source == "dev_to":
                aggregated_response["dev_to"] = obtain_news_from_dev_to(categories, timeline)
            else:
                return Response({"error": f"Invalid source specified: {source}"},
                                status=status.HTTP_400_BAD_REQUEST)

        NewsPaperSerializer.create_news_paper(aggregated_response, userid)

        return Response(aggregated_response, status=status.HTTP_200_OK)
