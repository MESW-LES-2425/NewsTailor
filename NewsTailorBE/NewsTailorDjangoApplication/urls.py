from django.urls import path
from .connections.fetch_news_view import FetchNewsView
from .connections.newspaper_utils_view import ObtainNewsPaperByIdView, DeleteNewsPaperByIdView
from .views import UserRegistrationView, UserLoginView, UserLogoutView, UserProfileView, UserUpdateView, CreateConfigurationView
from .connections.newspaper_utils_view import ObtainNewsPaperByIdView
from .views import UserRegistrationView, UserLoginView, UserLogoutView
from .views import UserRegistrationView, UserLoginView, UserLogoutView, UserProfileView, UserUpdateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('logout/', UserLogoutView.as_view(), name="logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("user/<int:user_id>/", UserProfileView.as_view(), name="profile"),
    path("user/update/<int:id>/", UserUpdateView.as_view(), name='user-update'),
    path('fetch-news/', FetchNewsView.as_view(), name='fetch-news'),
    path('check-news/<int:user_id>/', ObtainNewsPaperByIdView.as_view(), name='check-news'),
    path('conclude-reading-session/', DeleteNewsPaperByIdView.as_view(), name='delete-newspaper'),
    path('create-configuration/', CreateConfigurationView.as_view(), name='create-configuration')
    path('start-reading-session/', ReadNewsPaperByIdView.as_view(), name='save-newspaper'),
    path('save-newspaper/', SaveNewsPaperByIdView.as_view(), name='save-newspaper'),
    path('newspapers/<int:user_id>/', ObtainUserNewsPapersView.as_view(), name='user-newspapers'),
    path('delete-newspaper/', DeleteNewsPaperIfNotSavedView.as_view(), name='delete-newspaper'),
]
