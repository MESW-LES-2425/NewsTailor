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

class DeleteNewsPaperIfNotSavedView(APIView):
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
        
class ReadNewsPaperByIdView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request):
        newspaper_id = request.data.get('newspaperid')

        NewsPaperSerializer.read_news_paper_by_id(newspaper_id)

        return Response(status=status.HTTP_200_OK)

class NewsExtensionView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request):
        newspaper_id = request.data.get('newspaperid')

        NewsPaperSerializer.extend_reading_session(newspaper_id)

        return Response(status=status.HTTP_200_OK)


class CreateUserNewsPaperConfigurationView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request):
        user_id = request.data.get('user_configuration')
        font_size = request.data.get('font_size')
        font_family = request.data.get('font_family')
        margin_size = request.data.get('margin_size')

        NewsPaperSerializer.create_user_news_paper_configuration(user_id, font_size, font_family, margin_size)

        return Response(status=status.HTTP_200_OK)      

class FetchUserNewsPaperConfigurationView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def get(request, user_id):

        user_configuration = NewsPaperSerializer.fetch_user_news_paper_configuration(user_id)

        if user_configuration:
            return Response({'User Configuration': user_configuration}, status=status.HTTP_200_OK)
        else:
            return Response({'User Configuration': []}, status=status.HTTP_200_OK)   
        
class ObtainAllNewsPaperCount(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def get(request):
        count = NewsPaperSerializer.get_all_newspaper_count()
        return Response({'NewspaperCount': count}, status=status.HTTP_200_OK)        