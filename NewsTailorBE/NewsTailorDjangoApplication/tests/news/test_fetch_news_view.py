'''
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import patch

class FetchNewsViewTests(APITestCase):
    url = reverse('fetch-news')

    def setUp(self):
        # Test data used in the requests
        self.valid_data = {
            "category": "technology",
            "language": "en",
            "sources": ["news_api", "guardian", "nyt", "dev_to"]
        }
        self.partial_data = {
            "category": "technology",
            "language": "en"
        }
        self.invalid_sources_data = {
            "category": "technology",
            "language": "en",
            "sources": "not_a_list"
        }
        self.invalid_source_name_data = {
            "category": "technology",
            "language": "en",
            "sources": ["invalid_source"]
        }

    @patch("NewsTailorDjangoApplication.connections.news_api.obtain_news_from_news_api")
    @patch("NewsTailorDjangoApplication.connections.news_api.obtain_news_from_guardian_api")
    @patch("NewsTailorDjangoApplication.connections.news_api.obtain_news_from_new_york_times")
    @patch("NewsTailorDjangoApplication.connections.dev_to_news.obtain_news_from_dev_to")
    def test_fetch_news_success(self, mock_dev_to, mock_nyt, mock_guardian, mock_news_api):
        # Mock responses for each source function
        mock_news_api.return_value = {"articles": ["news_api_article"]}
        mock_guardian.return_value = {"articles": ["guardian_article"]}
        mock_nyt.return_value = {"articles": ["nyt_article"]}
        mock_dev_to.return_value = {"articles": ["dev_to_article"]}

        # Send the request with valid data
        response = self.client.post(self.url, self.valid_data, format='json')

        # Check response status and data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("news_api", response.data)
        self.assertIn("guardian", response.data)
        self.assertIn("nyt", response.data)
        self.assertIn("dev_to", response.data)

    def test_fetch_news_missing_fields(self):
        # Send the request with partial data (missing 'sources')
        response = self.client.post(self.url, self.partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_fetch_news_invalid_sources_type(self):
        # Send the request where 'sources' is not a list
        response = self.client.post(self.url, self.invalid_sources_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    @patch("NewsTailorDjangoApplication.connections.news_api.obtain_news_from_news_api")
    def test_fetch_news_invalid_source_name(self, mock_news_api):
        # Send the request with an invalid source name
        response = self.client.post(self.url, self.invalid_source_name_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)
'''

