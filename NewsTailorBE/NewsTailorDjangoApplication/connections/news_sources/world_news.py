"""
Tutorial for news api usage at: https://worldnewsapi.com/docs/quick-start-tutorial/
This is our main news aggregator - obtaining content from several different sources.
Here, we are able to configure varied different parameters such as text detection, publish date and categories.

Categories we will always want to use:
    - news_sources
    - earliest_publish_date
    - categories
"""
import os
from datetime import datetime, timedelta, timezone
import worldnewsapi

from NewsTailorDjangoApplication.connections.news_sources.NewsArticle import NewsArticle
from NewsTailorDjangoApplication.connections.request_utils import English_language_prefix

newsapi_configuration = worldnewsapi.Configuration(api_key={'apiKey': os.getenv('WORLD_NEWS_KEY')})
ARTICLE_VALUE_MULTIPLIER = 2


def obtain_news_from_world_news(categories=None, timeline=None, duration_of_session=None):
    """Method to obtain news from the world news API with the configured parameters"""

    all_results = []
    try:
        newsapi_instance = worldnewsapi.NewsApi(worldnewsapi.ApiClient(newsapi_configuration))

        # Calculate the earliest publishing date based on the timeline
        earliest_publish_date = (datetime.now(timezone.utc) - timedelta(hours=int(timeline))).strftime(
            '%Y-%m-%d %H:%M:%S')

        # Convert categories list to a comma-separated string
        categories_str = ','.join(categories) if categories else None

        # List of possible categories:
        # politics, sports, business, technology, entertainment, health, science, lifestyle, travel, culture, education, environment

        response = newsapi_instance.search_news(
            earliest_publish_date=earliest_publish_date,
            categories=categories_str,
            number=duration_of_session * ARTICLE_VALUE_MULTIPLIER,
            language=English_language_prefix
        )

        all_results.extend(response.news)

    except worldnewsapi.ApiException as e:
        print(f"Exception when calling NewsApi -> search_news: {e}")

    # Obtaining the list of news articles objects from the response.
    news_articles = create_news_articles(all_results)

    return news_articles


def create_news_articles(request_results):
    """Method to create a list of NewsArticle objects from the API response"""
    news_articles = []
    for article in request_results:
        news_article = NewsArticle(article.title, article.text, article.url)
        news_articles.append(news_article)

    return news_articles
