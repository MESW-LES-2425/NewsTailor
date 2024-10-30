import os
import requests
from dotenv import load_dotenv
from request_utils import obtain_user_preferred_language

load_dotenv()
NewsAPIUrl = "https://newsapi.org/v2/top-headlines/sources"
news_api_key = os.getenv("NEWS_API_KEY")
guardian_api_key = os.getenv("GUARDIAN_API_KEY")


def general_request_from_news_api(category: str) -> requests:
    params = {
        "category": category,
        "apiKey": news_api_key,
        "language": obtain_user_preferred_language(),
    }

    response = requests.get(NewsAPIUrl, params=params)

    if response.status_code == 200:
        print(response.json())
    else:
        print(f"Request failed with status code {response.status_code}")
    return response


def general_request_from_guardian_api(category: str) -> requests:
    url = "https://content.guardianapis.com/search"
    params = {"api-key": guardian_api_key, "section": category, "page-size": 10}
    response = requests.get(url, params=params)
    data = response.json()
    print(data)

    return data
