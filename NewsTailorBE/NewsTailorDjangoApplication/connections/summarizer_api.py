from openai import OpenAI
import os

from rest_framework import status
from NewsTailorDjangoApplication.connections.news_sources.dev_to_news import obtain_news_from_dev_to
from NewsTailorDjangoApplication.connections.news_sources.world_news import obtain_news_from_world_news
from rest_framework.response import Response
from NewsTailorDjangoApplication.serializers.newspaper_serializers import NewsPaperSerializer
from NewsTailorDjangoApplication.views import UserProfileView

openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY environment variable not set")

client = OpenAI(api_key=openai_api_key)

WORLD_NEWS_SOURCE = "world_news"
DEV_TO_SOURCE = "dev_to"


def obtain_news_for_sources(sources, categories, timeline, userid, duration_of_session):
    news_article_list = []

    # Iterating each source and adding the corresponding news articles to the aggregated response.
    for source in sources:
        if source == WORLD_NEWS_SOURCE:
            news_article_list.extend(obtain_news_from_world_news(categories, timeline, duration_of_session))
        elif source == DEV_TO_SOURCE:
            news_article_list.extend(obtain_news_from_dev_to(categories, timeline, duration_of_session))
        else:
            return Response({"error": f"Invalid source specified: {source}"},
                            status=status.HTTP_400_BAD_REQUEST)

    # Obtaining the words per minute configuration for the user by id.
    wpm = UserProfileView.get_wpm(userid)

    articles_formatted = format_articles(news_article_list)
    content = summarize(articles_formatted, 10, wpm)

    NewsPaperSerializer.create_news_paper(content, userid)

    return content


def summarize(raw_news, duration_of_session, user_wpm) -> str:
    """Summarize the news obtained from the sources."""

    message_content = (
        "You are a News Tailor bot. "
        "You create news using provided configurations and from provided news articles."
        "For a newspaper, you should provide a title, have various different subtitles for the "
        "different news articles obtained and you should summarize the content of the news articles. "
        f"The user reads at {user_wpm} words per minute. "
        f"Make sure the total word count on the result that will be presented to the reader "
        f"is close to {user_wpm * duration_of_session} words. "
        "Make the content seem like the text was written by an expert journalist with several years in the field. "
        "Make the content interesting to the user and engaging so that he wants to continue reading."
        "Try to make the content natural, articulating the different articles together."
        "You can summarize more or less according to the relevance of the article - always respecting the duration of the session."
        "For each article, create it with a title, an enhanced summary of the content and the url of the article which should be clickable. "
        "You will receive a list of articles from different sources. Each news article has a title, a content and a url. Display the URLS as 'Read the Full Article'."
        f"These are all the news articles I have obtained: {raw_news}"
        "Make sure not to include any fake news or any content that is not appropriate. If the article is not appropriate, do not use it."
        "For the main title, create a title  relates to the content of the article and has the time of the reading session - example: Your 5 Minutes Sports Read."
        "In terms of markdown content, do not use separation lines between the articles. Only use h1, h2 and p for content."
    )

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": message_content
                }
            ]
        )
    except Exception as e:
        return f"Error in summarizing news: {str(e)}"

    return completion.choices[0].message.content


def format_articles(news_articles):
    """Format a list of news articles into a readable string."""
    formatted_articles = "\n\n".join(
        f"Title: {article.get_title()}\n"
        f"Content: {article.get_content()}\n"
        f"URL: {article.get_url()}"
        for article in news_articles
    )

    return formatted_articles
