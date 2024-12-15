from django.test import TestCase
from NewsTailorDjangoApplication.models import Category, User, Configuration_Category
from NewsTailorDjangoApplication.serializers.configuration_serializer import ConfigurationSerializer


class ConfigurationSerializerTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='password')
        self.category1 = Category.objects.create(name="economy")
        self.category2 = Category.objects.create(name="politics")
        self.category3 = Category.objects.create(name="technology")

        self.valid_data = {
            'name': 'Test Configuration',
            'fetch_period': '30',
            'read_time': 5,
            'user_id': self.user.id,
            'categories': [
                {'value': "economy", 'percentage': 50},
                {'value': "politics", 'percentage': 30},
                {'value': "technology", 'percentage': 20},
            ],
            'sources': ["guardian", "news_api"],
        }

    def test_serializer_valid_data(self):
        serializer = ConfigurationSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        configuration = serializer.save()

        self.assertEqual(configuration.name, 'Test Configuration')
        self.assertEqual(configuration.fetch_period, 30 * 60)
        self.assertEqual(configuration.user_configuration, self.user)
        self.assertEqual(configuration.read_time, 5)
        self.assertEqual(configuration.sources, ["guardian", "news_api"])

        # Check that the intermediate table Configuration_Category has the correct entries
        config_categories = Configuration_Category.objects.filter(configuration=configuration)
        self.assertEqual(config_categories.count(), 3)

        # Verify the categories and their associated percentages
        category_map = {config_category.category.name: config_category.percentage for config_category in
                        config_categories}
        self.assertEqual(category_map["economy"], 50)
        self.assertEqual(category_map["politics"], 30)
        self.assertEqual(category_map["technology"], 20)