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
    content = summarize(articles_formatted, duration_of_session, wpm)

    NewsPaperSerializer.create_news_paper(content, userid)

    return content


def summarize(raw_news, duration_of_session, user_wpm) -> str:
    """Summarize the news obtained from the sources."""

    total_word_counter = duration_of_session * user_wpm
    #print(total_word_counter)

    with open("NewsTailorDjangoApplication/connections/config/summarization_prompt.txt", "r") as file:
        message_content = file.read().format(total_word_counter=total_word_counter,
                                             raw_news=raw_news)

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


def extend_newspaper(sources, categories, timeline, user_id , reading_time, newspaper):
    """Extend the newspaper content based on the reading time."""
    news_article_list = []
    for source in sources:
        if source == WORLD_NEWS_SOURCE:
            news_article_list.extend(obtain_news_from_world_news(categories, timeline, reading_time))
        elif source == DEV_TO_SOURCE:
            news_article_list.extend(obtain_news_from_dev_to(categories, timeline, reading_time))
        else:
            return Response({"error": f"Invalid source specified: {source}"},
                            status=status.HTTP_400_BAD_REQUEST)
    wpm = UserProfileView.get_wpm(user_id)
    articles_formatted = format_articles(news_article_list)
    with open("NewsTailorDjangoApplication/connections/config/extension_prompt.txt", "r") as file:
        message_content = file.read().format(newspaper=newspaper, reading_time=reading_time, wpm=wpm, raw_news=articles_formatted, total_word_counter=reading_time * wpm)

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
        return f"Error in extending news: {str(e)}"

    return completion.choices[0].message.content