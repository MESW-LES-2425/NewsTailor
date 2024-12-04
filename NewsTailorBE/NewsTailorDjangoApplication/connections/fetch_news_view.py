from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from NewsTailorDjangoApplication.connections.summarizer_api import obtain_news_for_sources


class FetchNewsView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request):

        data = request.data
        categories = data.get("categories")
        sources = data.get("sources")
        userid = data.get("userid")
        timeline = data.get("timeline")
        read_time = data.get("read_time")

        if not all([categories, sources]):
            return Response({"error": "Missing List of Categories or Sources in the request."},
                            status=status.HTTP_400_BAD_REQUEST)

        if not isinstance(sources, list) or not isinstance(categories, list):
            return Response({"error": "Sources and Categories should be provided as a list."},
                            status=status.HTTP_400_BAD_REQUEST)

        #aggregated_response = obtain_news_for_sources(sources, categories, timeline, userid, 2)
        aggregated_response = obtain_news_for_sources(sources, categories, timeline, userid, read_time)

        return Response(aggregated_response, status=status.HTTP_200_OK)
