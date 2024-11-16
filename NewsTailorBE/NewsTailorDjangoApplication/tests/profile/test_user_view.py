from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()

class UserProfileViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='testpass',
                                             wpm=200)
        self.client.force_authenticate(user=self.user)

    def test_retrieves_user_profile(self):
        url = reverse('profile', kwargs={'user_id': self.user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user.username)
        self.assertEqual(response.data['email'], self.user.email)
        self.assertEqual(response.data['wpm'], self.user.wpm)

    def test_fails_to_retrieve_profile_for_nonexistent_user(self):
        url = reverse('profile', kwargs={'user_id': 999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)