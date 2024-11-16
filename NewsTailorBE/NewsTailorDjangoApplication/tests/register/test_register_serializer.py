from django.test import TestCase
from NewsTailorDjangoApplication.serializers.auth_serializers import UserRegistrationSerializer


class UserRegistrationSerializerTestCase(TestCase):
    valid_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password1": "Password123!",
        "password2": "Password123!"
    }

    def test_valid_password(self):
        serializer = UserRegistrationSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())

    def test_passwords_do_not_match(self):
        data = self.valid_data.copy()
        data["password2"] = "DifferentPassword123!"
        serializer = UserRegistrationSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors["password"], ["Passwords do not match!"])

    def test_short_password(self):
        data = self.valid_data.copy()
        data["password1"] = "Short1!"
        data["password2"] = "Short1!"
        serializer = UserRegistrationSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors["password"], ["Passwords must be at least 8 characters!"])

    def test_missing_uppercase_in_password(self):
        data = self.valid_data.copy()
        data["password1"] = "password123!"
        data["password2"] = "password123!"
        serializer = UserRegistrationSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors["password"], ["Passwords must contain at least one uppercase letter!"])

    def test_missing_number_in_password(self):
        data = self.valid_data.copy()
        data["password1"] = "Password!"
        data["password2"] = "Password!"
        serializer = UserRegistrationSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors["password"], ["Passwords must contain at least one number!"])

    def test_missing_special_char_in_password(self):
        data = self.valid_data.copy()
        data["password1"] = "Password123"
        data["password2"] = "Password123"
        serializer = UserRegistrationSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors["password"], ["Passwords must contain at least one special character!"])
