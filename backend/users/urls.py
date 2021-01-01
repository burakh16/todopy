from django.urls import path

from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)

from .views import UserRegisterView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view()),
    path('token/', TokenRefreshView.as_view()),
    path('register/', UserRegisterView.as_view()),
]
