from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from NewsTailorDjangoApplication.serializers.newspaper_serializers import NewsPaperSerializer


class ObtainNewsPaperByIdView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request, user_id):
        newspaper_data = NewsPaperSerializer.get_news_paper_by_user(user_id)

        if newspaper_data:
            return Response({'exists': True, 'Newspaper': newspaper_data}, status=status.HTTP_200_OK)
        else:
            return Response({'exists': False}, status=status.HTTP_200_OK)


class DeleteNewsPaperByIdView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request):
        newspaper_id = request.data.get('newspaperid')

        NewsPaperSerializer.delete_news_paper_if_not_saved(newspaper_id)

        return Response(status=status.HTTP_200_OK)

class SaveNewsPaperByIdView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request):

        newspaper_id = request.data.get('newspaperid')

        NewsPaperSerializer.save_news_paper_by_id(newspaper_id)

        return Response(status=status.HTTP_200_OK)
    

class ObtainUserNewsPapersView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def get(request, user_id):
        newspapers = NewsPaperSerializer.get_user_newspapers(user_id)

        if newspapers:
            return Response({'Newspapers': newspapers}, status=status.HTTP_200_OK)
        else:
            return Response({'Newspapers': []}, status=status.HTTP_200_OK)