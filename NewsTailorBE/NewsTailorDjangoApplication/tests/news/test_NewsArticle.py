# Test cases for the NewsArticle class.
from django.test import TestCase
from NewsTailorDjangoApplication.connections.news_sources.NewsArticle import NewsArticle


class TestNewsArticle(TestCase):

    def setUp(self):
        """Set up test data for NewsArticle."""
        self.article = NewsArticle(
            title="Test Title",
            content="Test Content",
            url="https://testurl.com"
        )

    def test_article_creation(self):
        """Test that a NewsArticle instance is created correctly."""
        self.assertEqual(self.article.title, "Test Title")
        self.assertEqual(self.article.content, "Test Content")
        self.assertEqual(self.article.url, "https://testurl.com")

    def test_article_get_titles(self):
        """Test the get_titles method of the NewsArticle instance."""
        self.assertEqual(self.article.get_title(), "Test Title")

    def test_article_get_contents(self):
        """Test the get_contents method of the NewsArticle instance."""
        self.assertEqual(self.article.get_content(), "Test Content")

    def test_article_get_url(self):
        """Test the get_url method of the NewsArticle instance."""
        self.assertEqual(self.article.get_url(), "https://testurl.com")