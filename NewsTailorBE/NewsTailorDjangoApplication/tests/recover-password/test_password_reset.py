from django.contrib.auth import get_user_model
from django.test import TestCase

User = get_user_model()

class ForgotPasswordViewTestCase(TestCase):
    url = "/api/forgot-password/"

    def setUp(self):
        self.user = User.objects.create_user(username='testuser',
                                             email="",
                                                password="password")
        self.valid_data = {
            "email": "",
            "host": "http://localhost:5173"
        }

        self.invalid_data = {
            "email": "testemail"
        }