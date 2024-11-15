import os
import requests
from datetime import datetime, timedelta

NUMBER_OF_NEWS_ARTICLES = os.getenv('NUMBER_OF_NEWS_ARTICLES')


def obtain_news_from_dev_to(tag=None, timeline=None):
    # Base URL to fetch articles, optionally filtering by tag
    url = f"https://dev.to/api/articles?per_page={NUMBER_OF_NEWS_ARTICLES}"
    if tag:
        url += f"&tag={tag}"

    # Calculate the published_after date based on the timeline
    if timeline:
        cutoff_time = datetime.utcnow() - timedelta(hours=int(timeline))
        published_after = cutoff_time.isoformat() + "Z"  # Convert to ISO 8601 format
        url += f"&published_after={published_after}"

    # List of articles request
    response = requests.get(url)
    if response.status_code == 200:
        articles = response.json()

        # Fetch full content for each article by its ID
        news_data = []
        for article in articles:
            article_content = obtain_news_content_from_devto_id(article)
            news_data.append(article_content)
        return news_data[0].get("content") if news_data else "No articles found within the specified timeline."
    else:
        return f"Failed to fetch articles. Status code: {response.status_code}"


def obtain_news_content_from_devto_id(article):
    article_id = article.get("id")
    article_url = f"https://dev.to/api/articles/{article_id}"

    # Request full article details according to article ID
    full_article_response = requests.get(article_url)
    if full_article_response.status_code == 200:
        full_article = full_article_response.json()
        article_data = {
            "title": full_article.get("title"),
            "content": full_article.get("body_markdown"),
            "url": full_article.get("url"),
            "tags": full_article.get("tag_list"),
        }
        return article_data
    else:
        print(f"Failed to fetch full content for article ID {article_id}")
        return None
