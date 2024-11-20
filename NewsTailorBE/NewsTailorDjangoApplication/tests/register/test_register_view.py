from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegistrationViewTestCase(APITestCase):
    url = "/api/register/"

    valid_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password1": "Password123!",
        "password2": "Password123!"
    }
    invalid_data_passwords_do_not_match = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password1": "Password123!",
        "password2": "Password1233!"
    }
    invalid_data_short_password = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password1": "short",
        "password2": "short"
    }
    invalid_data_duplicate_username = {
        "username": "existinguser",
        "email": "newuser@example.com",
        "password1": "Password123!",
        "password2": "Password123!"
    }
    invalid_data_duplicate_email = {
        "username": "newuser",
        "email": "existinguser@example.com",
        "password1": "Password123!",
        "password2": "Password123!"
    }

    def setUp(self):
        self.existing_user = User.objects.create_user(
            username="existinguser",
            email="existinguser@example.com",
            password="Password123!"
        )

    def test_successful_registration(self):
        response = self.client.post(self.url, self.valid_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("id", response.data)
        self.assertIn("username", response.data)
        self.assertIn("email", response.data)
        self.assertNotIn("password", response.data)

    def test_invalid_registration_with_different_passwords(self):
        response = self.client.post(self.url, self.invalid_data_passwords_do_not_match)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_registration_with_invalid_password(self):
        response = self.client.post(self.url, self.invalid_data_short_password)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_registration_with_duplicate_username(self):
        response = self.client.post(self.url, self.invalid_data_duplicate_username)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_registration_with_duplicate_email(self):
        response = self.client.post(self.url, self.invalid_data_duplicate_email)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
