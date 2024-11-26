"""
Python class to represent the instance of a news article.
This will be used to unify all the representations of the news article object.
"""


class NewsArticle:
    def __init__(self, title, content, url):
        self.titles = title
        self.contents = content
        self.url = url

    def get_titles(self):
        return self.titles

    def get_contents(self):
        return self.contents

    def get_url(self):
        return self.url
