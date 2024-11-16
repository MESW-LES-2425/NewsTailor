from openai import OpenAI
import os

openai_api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI()

def summarize(raw_news, duration_of_session, user_wpm) -> str:
    """Summarize the news obtained from the sources."""

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": f"You are a News Tailor bot. "
                           f"You create news according to user configurations and different contexts. "
                           f"For a newspaper, you should provide a title, have various different subtitles for the "
                           f"different news articles obtained and you should summarize the content - "
                           f"each article should be no longer than {duration_of_session} minute reading time. "
                           f"The user reads at {user_wpm} words per minute. "
                           f"Make the content seem like the text was written by an expert journalist with several years in the field. "
                           f"Make the content interesting to the user and engaging so that he wants to continue reading."
                           f"This is the news I have obtained from the sources: {raw_news}"
            }
        ]
    )

    print(completion.choices[0].message)
    return completion.choices[0].message.content




