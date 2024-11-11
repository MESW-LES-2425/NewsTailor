import os
import requests
from dotenv import load_dotenv

from NewsTailorDjangoApplication.connections.dev_to_news import obtain_news_from_dev_to
from NewsTailorDjangoApplication.connections.request_utils import translate_user_preferred_language

load_dotenv()
NewsAPIUrl = "https://newsapi.org/v2/top-headlines/sources"
news_api_key = os.getenv("NEWS_API_KEY")
guardian_api_key = os.getenv("GUARDIAN_API_KEY")
new_york_times_api_key = os.getenv("NEW_YORK_TIMES_API_KEY")


def obtain_news_from_news_api(category: str, user_language: str) -> requests:
    """Generic method to obtain news from news_api provider. Category and language should be provided via request."""
    params = {
        "category": category,
        "apiKey": news_api_key,
        "language": translate_user_preferred_language(user_language),
    }

    response = requests.get(NewsAPIUrl, params=params)

    if response.status_code == 200:
        print(response.json())
    else:
        print(f"Request failed with status code {response.status_code}")
    return response.content


def obtain_news_from_guardian_api(category: str) -> requests:
    """Generic method to obtain news from guardian provider. Category and language should be provided via request."""
    url = "https://content.guardianapis.com/search"
    params = {"api-key": guardian_api_key, "section": category, "page-size": 10}
    response = requests.get(url, params=params)
    data = response.json()

    return data


def obtain_news_from_new_york_times():
    """Generic method to obtain news from New York Times. This obtains the most popular news from a certain day."""
    url = f"https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json"
    params = {"api-key": new_york_times_api_key}

    response = requests.get(url, params=params)

    return response


"""
What has to be done: (What I thought feel free to change) 
Generic method to contact OpenAI that will have the context retrieved from all the news sources in the sources list.
Those news sources will return a dict with a list of content, news url, source name and date.
"""
