from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from NewsTailorDjangoApplication.connections.news_api import obtain_news_from_news_api, obtain_news_from_guardian_api, \
    obtain_news_from_new_york_times


class FetchNewsView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request):
        data = request.data
        category = data.get("category")
        language = data.get("language")
        source = data.get("source")

        if not all([category, language, source]):
            return Response({"error": "Missing Category, Language, or Source in the request."},
                            status=status.HTTP_400_BAD_REQUEST)

        if source == "news_api":
            response = obtain_news_from_news_api(category, language)
        elif source == "guardian":
            response = obtain_news_from_guardian_api(category)
        elif source == "nyt":
            response = obtain_news_from_new_york_times()
        else:
            return Response({"error": "Invalid source specified."}, status=status.HTTP_400_BAD_REQUEST)

        return Response(response, status=status.HTTP_200_OK)
