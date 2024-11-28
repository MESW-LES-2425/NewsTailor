# Test cases for the request_utils.py file in the connection's folder.
from django.test import TestCase
from NewsTailorDjangoApplication.connections.request_utils import translate_user_preferred_language

English_language_prefix = "en"
German_language_prefix = "de"


class TestTranslateUserPreferredLanguage(TestCase):
    def test_english_language(self):
        """Test when the requested language is English."""
        self.assertEqual(translate_user_preferred_language("English"), English_language_prefix)

    def test_non_english_language(self):
        """Test when the requested language is not English (e.g., Spanish)."""
        self.assertEqual(translate_user_preferred_language("Spanish"), English_language_prefix)

    def test_german_language(self):
        """Test when the requested language is German."""
        self.assertEqual(translate_user_preferred_language("German"), German_language_prefix)

    def test_empty_string(self):
        """Test when the requested language is an empty string."""
        self.assertEqual(translate_user_preferred_language(""), English_language_prefix)


