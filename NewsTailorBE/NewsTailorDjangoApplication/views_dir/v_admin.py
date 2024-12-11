from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

class UserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Example query that interacts with the database
        users = User.objects.all()
        return Response([user.username for user in users])
