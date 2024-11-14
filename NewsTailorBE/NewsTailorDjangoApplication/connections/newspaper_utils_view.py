from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from NewsTailorDjangoApplication.serializers.newspaper_serializers import NewsPaperSerializer


class NewsPaperUtilsView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request, user_id):
        newspaper_data = NewsPaperSerializer.get_news_paper_by_user(user_id)

        if newspaper_data:
            return Response({'exists': True, 'content': newspaper_data['content']}, status=status.HTTP_200_OK)
        else:
            return Response({'exists': False}, status=status.HTTP_200_OK)
