from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from NewsTailorDjangoApplication.models import Category, Configuration, Configuration_Category
from django.test import TestCase

User = get_user_model()

class CreateConfigurationViewTestCase(TestCase):
    url = "/api/create-configuration/"

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.category1 = Category.objects.create(name="economy")
        self.category2 = Category.objects.create(name="politics")
        self.category3 = Category.objects.create(name="technology")

        self.valid_data = {
            'name': 'Test Configuration',
            'fetch_period': '30',
            'read_time': 5,
            'user_id': self.user.id,
            'categories': ["economy", "politics", "technology"],
            'sources': ["guardian", "news_api"]
        }

    def test_create_configuration_success(self):
        response = self.client.post(self.url, self.valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class DeleteConfigurationViewTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.category1 = Category.objects.create(name="Technology")
        self.category2 = Category.objects.create(name="AI")

        self.config = Configuration.objects.create(
            name="Tech News",
            read_time=15,
            fetch_period=24*60,
            sources=["source1", "source2"],
            user_configuration=self.user,
        )

        Configuration_Category.objects.create(configuration=self.config, category=self.category1, percentage=60)
        Configuration_Category.objects.create(configuration=self.config, category=self.category2, percentage=40)

        self.delete_url = f"/api/delete-configuration/{self.config.id}/"

    def test_delete_configuration_with_categories(self):
        response = self.client.delete(self.delete_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Configuration.objects.filter(id=self.config.id).exists())
        self.assertFalse(Configuration_Category.objects.filter(configuration=self.config).exists())

    def test_delete_nonexistent_configuration(self):
        response = self.client.delete("/api/delete-configuration/999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class ListConfigurationsViewTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.category1 = Category.objects.create(name="Technology")
        self.category2 = Category.objects.create(name="AI")

        self.config = Configuration.objects.create(
            name="Tech News",
            read_time=15,
            fetch_period=24*60,
            sources=["source1", "source2"],
            user_configuration=self.user,
        )

        self.config2 = Configuration.objects.create(
            name="Tech News 2",
            read_time=15,
            fetch_period=24 * 60,
            sources=["source1", "source2", "source3"],
            user_configuration=self.user,
        )

        Configuration_Category.objects.create(configuration=self.config, category=self.category1, percentage=60)
        Configuration_Category.objects.create(configuration=self.config, category=self.category2, percentage=40)
        Configuration_Category.objects.create(configuration=self.config2, category=self.category1, percentage=60)
        Configuration_Category.objects.create(configuration=self.config2, category=self.category2, percentage=40)

    def test_list_configurations(self):
        response = self.client.get("/api/configurations/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.json()
        config1 = data[0]
        config2 = data[1]

        self.assertEqual(len(data), 2)

        self.assertEqual(config1['name'], "Tech News")
        self.assertEqual(config1['read_time'], 15)
        self.assertEqual(config1['fetch_period'], 24*60)
        self.assertEqual(config1['sources'], ["source1", "source2"])

        self.assertEqual(len(config1['categories']), 2)
        self.assertEqual(config1['categories'][0]['name'], "Technology")
        self.assertEqual(config1['categories'][0]['percentage'], 60)
        self.assertEqual(config1['categories'][1]['name'], "AI")
        self.assertEqual(config1['categories'][1]['percentage'], 40)

        self.assertEqual(config2['name'], "Tech News 2")
        self.assertEqual(config2['read_time'], 15)
        self.assertEqual(config2['fetch_period'], 24 * 60)
        self.assertEqual(config2['sources'], ["source1", "source2", "source3"])

        self.assertEqual(len(config2['categories']), 2)
        self.assertEqual(config2['categories'][0]['name'], "Technology")
        self.assertEqual(config2['categories'][0]['percentage'], 60)
        self.assertEqual(config2['categories'][1]['name'], "AI")
        self.assertEqual(config2['categories'][1]['percentage'], 40)

class UpdateConfigurationAPIViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.category1 = Category.objects.create(name="category1")
        self.category2 = Category.objects.create(name="category2")

        self.config = Configuration.objects.create(
            name="Tech News",
            read_time=15,
            fetch_period=24 * 60,
            sources=["source1", "source2"],
            user_configuration=self.user,
        )

        self.config2 = Configuration.objects.create(
            name="Tech News 2",
            read_time=15,
            fetch_period=24 * 60,
            sources=["source1", "source2", "source3"],
            user_configuration=self.user,
        )

        Configuration_Category.objects.create(configuration=self.config, category=self.category1, percentage=60)
        Configuration_Category.objects.create(configuration=self.config, category=self.category2, percentage=40)
        Configuration_Category.objects.create(configuration=self.config2, category=self.category1, percentage=60)
        Configuration_Category.objects.create(configuration=self.config2, category=self.category2, percentage=40)

        self.url = f"/api/update-configuration/{self.config.id}/"

    def test_update_configuration_all_fields(self):
        payload = {
            "name": "Updated Configuration",
            'user_id': self.user.id,
            "read_time": 50,
            "fetch_period": "72",
            "categories": ["category1"],
            "sources": ["news_api"]
        }

        response = self.client.put(self.url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.config.refresh_from_db()
        self.assertEqual(self.config.name, "Updated Configuration")
        self.assertEqual(self.config.read_time, 50)
        self.assertEqual(self.config.fetch_period, 4320)  # 72 h in minutes
        self.assertEqual(self.config.sources, ["news_api"])

        linked_categories = Configuration_Category.objects.filter(configuration=self.config)
        self.assertEqual(linked_categories.count(), 1)


