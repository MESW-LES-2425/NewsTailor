"""
Python class to represent the instance of a news article.
This will be used to unify all the representations of the news article object.
"""


class NewsArticle:
    def __init__(self, title, content, url):
        self.title = title
        self.content = content
        self.url = url

    def get_title(self):
        return self.title

    def get_content(self):
        return self.content

    def get_url(self):
        return self.url
