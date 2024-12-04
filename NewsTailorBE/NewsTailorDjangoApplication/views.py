from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from rest_framework import generics
from .serializers.auth_serializers import *
from .serializers.configuration_serializer import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator


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
        token = RefreshToken.for_user(user)
        access_token = token.access_token
        data = serializer.data
        data['tokens'] = {
            'refresh': str(token),
            'access': str(access_token)
        }
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

class UserProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise NotFound(detail="User not found", code=status.HTTP_404_NOT_FOUND)

    def get_wpm(user_id):
        user = User.objects.get(id=user_id)
        return user.wpm

class UserUpdateView(generics.UpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class CreateConfigurationView(generics.CreateAPIView):
    serializer_class = ConfigurationSerializer
    permission_classes = [IsAuthenticated]


class ForgotPassword(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        email = request.data.get('email')
        host = request.data.get('host')
        try:
            user = User.objects.get(email=email)
            host = host if host else settings.FRONTEND_URL
            token = default_token_generator.make_token(user)
            password_reset_url = f"{host}/reset-password/{user.id}/{token}/"
            from_email = settings.EMAIL_HOST_USER
            to_email = email

            subject = "Reset Your Password"
            message = f"Hello {user.username},\n\n" \
                      f"You requested a password reset for your account.\n" \
                      f"Click the link below to reset your password:\n\n" \
                      f"{password_reset_url}\n\n" \
                      f"If you didn’t request this, you can ignore this email."

            send_mail(subject, message, from_email, [to_email])
            return Response({"message": "Password reset email sent."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PasswordResetConfirmSerializer
    def post(self, request):
        id = request.data.get('id')
        token = request.data.get('token')
        password = request.data.get('password')
        try:
            user = User.objects.get(pk=id)
            if default_token_generator.check_token(user, token):
                user.set_password(password)
                user.save()
                return Response({"message": "Password reset successfully."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "Invalid user."}, status=status.HTTP_400_BAD)
        
class ListConfigurationsAPIView(generics.ListAPIView):
    serializer_class = ConfigurationListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Configuration.objects.prefetch_related(
            'configuration_category_set__category'
        ).filter(user_configuration=user)

class DeleteConfigurationAPIView(generics.DestroyAPIView):
    lookup_url_kwarg = 'configuration_id'
    queryset = Configuration.objects.all()
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UpdateConfigurationAPIView(generics.UpdateAPIView):
    lookup_url_kwarg = 'configuration_id'
    queryset = Configuration.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ConfigurationSerializer






