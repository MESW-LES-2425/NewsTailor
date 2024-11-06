from django.urls import path
from .views import UserRegistrationView, UserLoginView, UserLogoutView, UserProfileView ,UserUpdateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('logout/', UserLogoutView.as_view(), name="logout"),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("user/<int:user_id>/", UserProfileView.as_view(), name="profile"),
    path("user/update/<int:user_id>/", UserUpdateView.as_view(), name='user-update'),

]
