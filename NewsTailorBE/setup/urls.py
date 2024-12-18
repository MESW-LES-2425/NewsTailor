from django.contrib import admin
from django.urls import path, include

from NewsTailorDjangoApplication.views_dir.v_google_login import GoogleLoginApi

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("NewsTailorDjangoApplication.urls")),
    path("auth/api/login/google/", GoogleLoginApi.as_view()),
]
