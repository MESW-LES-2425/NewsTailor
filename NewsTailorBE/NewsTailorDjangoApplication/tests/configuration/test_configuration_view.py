from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from NewsTailorDjangoApplication.models import Category
from django.test import TestCase

User = get_user_model()

class CreateConfigurationViewTestCase(TestCase):
    url = "/api/create-configuration/"

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.category1 = Category.objects.create(name="Economy")
        self.category2 = Category.objects.create(name="Politics")
        self.category3 = Category.objects.create(name="Technology")

        self.valid_data = {
            'name': 'Test Configuration',
            'fetch_period': '30',
            'read_time': 5,
            'user_id': self.user.id,
            'categories': [
                {"label": "Economy", "value": "economy", "id":self.category1.id},
                {"label": "Politics", "value": "politics", "id":self.category2.id},
                {"label": "Technology", "value": "technology", "id":self.category3.id}
            ],
            'sources': [
                {"label": "Guardian", "value": "guardian"},
                {"label": "News API (Generic)", "value": "news_api"}
            ],
        }

    def test_create_configuration_success(self):
        response = self.client.post(self.url, self.valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
