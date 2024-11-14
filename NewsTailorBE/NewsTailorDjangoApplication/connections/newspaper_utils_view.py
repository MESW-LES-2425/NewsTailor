from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class NewsPaperUtilsView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request, user_id):
        news_exists = False
        news_data = None

        if news_exists:
            return Response({'exists': True, 'news': news_data}, status=status.HTTP_200_OK)
        else:
            return Response({'exists': False}, status=status.HTTP_200_OK)
