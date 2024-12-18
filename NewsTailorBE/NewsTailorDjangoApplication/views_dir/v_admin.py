from tempfile import template

from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

User = get_user_model()

class UserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = []
        users = User.objects.all()
        for user in users:
            print(user.username)
            response.append({"user_id": user.id,"username": user.username, "is_banned": user.is_banned})
        return Response(response)


class BanUnbanUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        print(user_id)
        user = User.objects.get(id=user_id)
        user.is_banned = not user.is_banned
        user.save()
        changed_user = User.objects.get(id=user_id)

        return Response({"user_id": changed_user.id, "username": changed_user.username, "is_banned": changed_user.is_banned})

class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            if user.username == "admin":
                return Response({"detail": "Cannot delete the admin user."}, status=status.HTTP_400_BAD_REQUEST)
            user.delete()
            return Response({"detail": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)