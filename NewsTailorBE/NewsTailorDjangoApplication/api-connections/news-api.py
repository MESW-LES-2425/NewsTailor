import os
import requests
from dotenv import load_dotenv

NewsAPIUrl = "https://newsapi.org/v2/top-headlines/sources"
load_dotenv()
news_api_key = os.getenv("NEWS_API_KEY")


def technology_request_to_news_api() -> requests:
    params = {"category": "technology", "apiKey": news_api_key}

    response = requests.get(NewsAPIUrl, params=params)

    if response.status_code == 200:
        print(response.json())
    else:
        print(f"Request failed with status code {response.status_code}")

    print(response)

    return response


technology_request_to_news_api()
