# api/urls.py (App-level)
from django.urls import path

from NewsTailorDjangoApplication.views import hello_world



urlpatterns = [
    path('api/hello', hello_world)
]