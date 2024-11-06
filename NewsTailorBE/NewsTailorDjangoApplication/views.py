from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .serializers.auth_serializers import UserRegistrationSerializer, UserLoginSerializer, CustomUserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model() 

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = CustomUserSerializer(user)
        data = serializer.data

        return Response(data, status=status.HTTP_200_OK)

class UserLogoutView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UserUpdateView(generics.UpdateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user