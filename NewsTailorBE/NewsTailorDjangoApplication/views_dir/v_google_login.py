from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth import login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from NewsTailorDjangoApplication.serializers.auth_serializers import AuthSerializer, CustomUserSerializer
from django.contrib.auth import get_user_model
from django.conf import settings
from django.shortcuts import redirect
from django.core.exceptions import ValidationError
from urllib.parse import urlencode
from typing import Dict, Any
import requests
import jwt

from setup.settings import ALLOWED_HOSTS

User = get_user_model()

GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'
LOGIN_URL = f'{settings.BASE_APP_URL}'


# Exchange authorization token with access token
def google_get_access_token(code: str, redirect_uri: str) -> str:
    data = {
        'code': code,
        'client_id': settings.GOOGLE_OAUTH2_CLIENT_ID,
        'client_secret': settings.GOOGLE_OAUTH2_CLIENT_SECRET,
        'redirect_uri': "postmessage",
        'grant_type': 'authorization_code'
    }

    response = requests.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)
    if not response.ok:
        raise ValidationError('Could not get access token from Google.')

    access_token = response.json()['access_token']

    return access_token


# Get user info from google
def google_get_user_info(access_token: str) -> Dict[str, Any]:
    response = requests.get(
        GOOGLE_USER_INFO_URL,
        params={'access_token': access_token}
    )

    if not response.ok:
        raise ValidationError('Could not get user info from Google.')

    return response.json()


def get_user_data(validated_data):
    domain = settings.BASE_API_URL
    redirect_uri = f'{domain}/auth/api/login/google/'

    code = validated_data.get('code')
    error = validated_data.get('error')

    if error or not code:
        params = urlencode({'error': error})
        return redirect(f'{LOGIN_URL}?{params}')

    access_token = google_get_access_token(code=code, redirect_uri=redirect_uri)
    user_data = google_get_user_info(access_token=access_token)

    # Creates user in DB if first time login
    user, created = User.objects.get_or_create(email=user_data["email"])
    if created:
        user.set_unusable_password()
        user.save()

    # Generate or retrieve a token
    token, created = RefreshToken.for_user(user), False
    access_token = token.access_token
    serializer = CustomUserSerializer(user)
    data = serializer.data
    data['tokens'] = {
        'refresh': str(token),
        'access': str(access_token)
    }

    return data


class GoogleLoginApi(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        serializer = AuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_data = get_user_data(serializer.validated_data)

        return Response(user_data, status=status.HTTP_200_OK)

