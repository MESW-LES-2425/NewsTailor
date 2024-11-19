import os
import requests
from datetime import datetime, timedelta

NUMBER_OF_NEWS_ARTICLES = os.getenv('NUMBER_OF_NEWS_ARTICLES')


def obtain_news_from_dev_to(categories=None, timeline=None):
    # Base URL to fetch articles, with a placeholder for the tag filter
    base_url = f"https://dev.to/api/articles?per_page={NUMBER_OF_NEWS_ARTICLES}"

    # Initialize an empty list to collect articles
    all_news_data = []

    # Iterate over each tag in the tags list (if provided)
    if categories:
        for category in categories:
            url = f"{base_url}&tag={category}"

            # Calculate the published_after date based on the timeline
            if timeline:
                cutoff_time = datetime.utcnow() - timedelta(hours=int(timeline))
                published_after = cutoff_time.isoformat() + "Z"  # Convert to ISO 8601 format
                url += f"&published_after={published_after}"

            # Fetch articles for the current tag
            response = requests.get(url)
            if response.status_code == 200:
                articles = response.json()

                # Fetch full content for each article
                for article in articles:
                    article_content = obtain_news_content_from_devto_id(article)
                    if article_content:  # Ensure valid content is added
                        all_news_data.append(article_content)
            else:
                print(f"Failed to fetch articles for tag '{category}'. Status code: {response.status_code}")
    else:
        # If no tags are provided, fetch articles without filtering by tag
        url = base_url
        if timeline:
            cutoff_time = datetime.utcnow() - timedelta(hours=int(timeline))
            published_after = cutoff_time.isoformat() + "Z"
            url += f"&published_after={published_after}"

        response = requests.get(url)
        if response.status_code == 200:
            articles = response.json()
            for article in articles:
                article_content = obtain_news_content_from_devto_id(article)
                if article_content:
                    all_news_data.append(article_content)
        else:
            print(f"Failed to fetch articles. Status code: {response.status_code}")

    # Return collected news data or a fallback message
    return all_news_data.__getitem__(0).get("content")


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
