# Test cases for the NewsArticle class.
from datetime import datetime, timedelta

from django.test import TestCase
from NewsTailorDjangoApplication.connections.news_sources.NewsArticle import NewsArticle
from NewsTailorDjangoApplication.connections.news_sources.dev_to_news import obtain_published_after
from NewsTailorDjangoApplication.connections.summarizer_api import format_articles


class TestSourcesUtils(TestCase):

    def test_format_articles(self):
        """Test the format_articles function."""
        articles = [
            NewsArticle(title="Title 1", content="Content 1", url="https://url1.com"),
            NewsArticle(title="Title 2", content="Content 2", url="https://url2.com")
        ]
        expected_output = (
            "Title: Title 1\nContent: Content 1\nURL: https://url1.com\n\n"
            "Title: Title 2\nContent: Content 2\nURL: https://url2.com"
        )
        self.assertEqual(format_articles(articles), expected_output)

    def test_obtain_published_after(self):
        """Test the obtain_published_after function."""
        timeline = 24
        expected_output = (datetime.utcnow() - timedelta(hours=timeline)).isoformat() + "Z"
        self.assertEqual(obtain_published_after(timeline)[:19], expected_output[:19])
