import json
from cgi import print_form
from pydoc_data.topics import topics

from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from NewsTailorDjangoApplication.connections.summarizer_api import obtain_news_for_sources, extend_newspaper
from NewsTailorDjangoApplication.models import Newspaper


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


class NewsExtension(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request):
        sources = json.loads(request.data.get('sources', '[]'))
        topics = json.loads(request.data.get('topics', '[]'))
        date = json.loads(request.data.get("date"))
        isPresetSelected = request.data.get("isPresetSelected")
        reading_time = request.data.get("reading_time")
        user_id = request.data.get("user_id")
        newspaper_id = request.data.get("newspaper_id")
        newspaper = Newspaper.objects.get(id=newspaper_id).content
        extension = extend_newspaper(sources, topics, date, user_id, reading_time, newspaper)
        return Response(extension, status=status.HTTP_200_OK)
