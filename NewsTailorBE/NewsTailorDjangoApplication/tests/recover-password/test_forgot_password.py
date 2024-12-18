from django.contrib.auth import get_user_model
from django.test import TestCase

User = get_user_model()

class ForgotPasswordViewTestCase(TestCase):
    url = "/api/forgot-password/"

    def setUp(self):
        self.user = User.objects.create_user(username='testuser',
                                             email="testemail@gmail.com",
                                             password="password")
        self.valid_data = {
            "email": "testemail@gmail.com",
            "host": "http://localhost:5173"
        }

        self.invalid_data = {
            "email": "testemail"
        }

        self.non_existent_email = {
            "email": "nonexistent@gmail.com"
        }

    def test_forgot_password_success(self):
        response = self.client.post(self.url, self.valid_data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['message'], "Password reset email sent.")

    def test_forgot_password_non_existent_email(self):
        response = self.client.post(self.url, self.non_existent_email, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['error'], "User with this email does not exist.")