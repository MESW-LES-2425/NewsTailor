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