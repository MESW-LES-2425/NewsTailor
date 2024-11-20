from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()

class UserUpdateViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='testpass',
                                             wpm=200)
        self.client.force_authenticate(user=self.user)

    def test_updates_user_profile(self):
        url = reverse('user-update', kwargs={'id': self.user.id})
        data = {'username': 'newusername', 'email': 'newemail@example.com', 'wpm': 250}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, 'newusername')
        self.assertEqual(self.user.email, 'newemail@example.com')
        self.assertEqual(self.user.wpm, 250)

    def test_fails_to_update_with_invalid_email(self):
        url = reverse('user-update', kwargs={'id': self.user.id})
        data = {'email': 'invalid-email'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)