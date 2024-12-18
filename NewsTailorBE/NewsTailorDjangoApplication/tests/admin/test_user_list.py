from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from django.test import TestCase

User = get_user_model()


class UserListTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_user_list(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['username'], 'testuser')
        self.assertEqual(response.data[0]['is_banned'], False)
        self.assertEqual(len(response.data), 1)

    def test_ban_unban_user(self):
        response = self.client.post(f'/api/users/ban/{self.user.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['is_banned'], True)

        response = self.client.post(f'/api/users/ban/{self.user.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['is_banned'], False)