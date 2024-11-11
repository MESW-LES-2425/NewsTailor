import requests
from bs4 import BeautifulSoup
from NewsTailorDjangoApplication.connections.request_utils import translate_user_preferred_language

# Global variables
news_api_key = "6403ec0578fc47c89422eacab1a9565f"
NewsAPIUrl = "https://newsapi.org/v2/top-headlines"
NUMBER_OF_ARTICLES = 5  # Limit on the number of articles to fetch

def obtain_article_urls(category: str, user_language: str) -> list:
    """Fetch article URLs based on category, language, and optional query."""
    params = {
        "category": category,
        "apiKey": news_api_key,
        "language": translate_user_preferred_language(user_language),
        "pageSize": NUMBER_OF_ARTICLES
    }

    response = requests.get(NewsAPIUrl, params=params)
    if response.status_code == 200:
        articles = response.json().get("articles", [])
        urls = [article["url"] for article in articles if "url" in article]
        return urls
    else:
        print(f"Request failed with status code {response.status_code}")
        return []

def fetch_full_article_content(url: str) -> str:
    """Scrape the full content of an article from the HTML page."""
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, "html.parser")
            # This logic might vary based on each site’s structure
            paragraphs = soup.find_all("p")
            full_content = "\n".join(paragraph.text for paragraph in paragraphs)
            return full_content
        else:
            print(f"Failed to fetch content for URL {url}. Status code: {response.status_code}")
            return "Content unavailable"
    except Exception as e:
        print(f"An error occurred while fetching content from {url}: {e}")
        return "Content unavailable"

def obtain_news_from_news_api(category: str, user_language: str, query: str = None) -> list:
    """Fetch full news articles by category, language, and optional query."""
    urls = obtain_article_urls(category, user_language)
    news_data = []
    for url in urls:
        full_content = fetch_full_article_content(url)
        news_data.append({
            "url": url,
            "content": full_content
        })
    return news_data

# Example usage
category = "technology"
user_language = "English"
query = "AI"

articles = obtain_news_from_news_api(category, user_language, query=query)
for article in articles:
    print(f"URL: {article['url']}\nContent: {article['content'][:500]}...\n")
