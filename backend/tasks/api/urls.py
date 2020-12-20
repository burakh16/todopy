from django.urls import path

from .views import UserTasksList

urlpatterns = [
    path('user-tasks/', UserTasksList.as_view())
]
