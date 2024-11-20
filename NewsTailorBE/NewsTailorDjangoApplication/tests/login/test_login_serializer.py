from django.test import TestCase
from NewsTailorDjangoApplication.serializers.auth_serializers import UserLoginSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserLoginSerializerTestCase(TestCase):

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

    def test_valid_user_login(self):
        data = {
            "email": "testuser@example.com",
            "password": "Password123!"
        }

        serializer = UserLoginSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_invalid_user_login(self):
        serializer = UserLoginSerializer(data=self.invalid_login_data_wrong_password)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors["non_field_error"], ["Incorrect Credentials!"])

    def test_user_not_found(self):
        serializer = UserLoginSerializer(data=self.nonexistent_user_data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors["email"], ["User not found!"])

    def test_user_account_banned(self):
        self.user.is_banned = True
        self.user.save()

        serializer = UserLoginSerializer(data=self.banned_user_data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors["non_field_error"], ["User account is banned!"])
