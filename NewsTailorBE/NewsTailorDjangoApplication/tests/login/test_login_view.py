from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class UserLoginViewTestCase(APITestCase):
    url = "/api/login/"

    valid_user_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "Password123!"
    }
    invalid_login_data_wrong_password = {
        "email": "testuser@example.com",
        "password": "WrongPassword"
    }
    nonexistent_user_data = {
        "email": "nonexistent@example.com",
        "password": "Password123!"
    }
    banned_user_data = {
        "email": "testuser@example.com",
        "password": "Password123!"
    }

    def setUp(self):
        self.user = User.objects.create_user(**self.valid_user_data)

    def test_valid_login(self):
        data = {
            "email": self.valid_user_data["email"],
            "password": self.valid_user_data["password"]
        }

        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("username", response.data)
        self.assertIn("email", response.data)
        self.assertIn("id", response.data)
        self.assertIn("tokens", response.data)
        self.assertIn("access", response.data["tokens"])
        self.assertIn("refresh", response.data["tokens"])

    def test_invalid_login_with_wrong_password(self):
        response = self.client.post(self.url, self.invalid_login_data_wrong_password)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_login_with_invalid_user(self):
        response = self.client.post(self.url, self.nonexistent_user_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_login_with_banned_user(self):
        self.user.is_banned = True
        self.user.save()

        response = self.client.post(self.url, self.banned_user_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
