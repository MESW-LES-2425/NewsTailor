import requests
from datetime import datetime, timedelta

from NewsTailorDjangoApplication.connections.news_sources.NewsArticle import NewsArticle

ARTICLE_VALUE_MULTIPLIER = 2


def obtain_news_from_dev_to(categories=None, timeline=None, duration_of_session=None):
    """Obtain news articles from Dev.to API"""
    base_url = f"https://dev.to/api/articles?per_page={duration_of_session * ARTICLE_VALUE_MULTIPLIER}"

    news_articles = []

    # Iterate over each category in the list
    for category in categories:
        url = f"{base_url}&tag={category}"
        url += f"&published_after={obtain_published_after(timeline)}"

        # Fetch articles for the current category
        response = requests.get(url)
        if response.status_code == 200:
            articles = response.json()

            # Fetch full content for each article
            for article in articles:
                article_content = obtain_news_content_from_devto_id(article)
                if article_content:
                    news_article = NewsArticle(article_content.get("title"), article_content.get("content"),
                                               article_content.get("url"))
                    news_articles.append(news_article)
        else:
            print(f"Failed to fetch articles for category '{category}'. Status code: {response.status_code}")

    return news_articles


def obtain_news_content_from_devto_id(article):
    """Obtain full content for a given article ID"""
    article_id = article.get("id")
    article_url = f"https://dev.to/api/articles/{article_id}"

    # Request full article details according to article ID
    full_article_response = requests.get(article_url)
    if full_article_response.status_code == 200:
        full_article = full_article_response.json()
        article_data = {
            "title": full_article.get("title"),
            "content": full_article.get("body_markdown"),
            "url": full_article.get("url")
        }
        return article_data
    else:
        print(f"Failed to fetch full content for article ID {article_id}")
        return None


def obtain_published_after(timeline):
    """Calculate the published_after date based on the timeline"""
    cutoff_time = datetime.utcnow() - timedelta(hours=int(timeline))
    published_after = cutoff_time.isoformat() + "Z"

    return published_after
