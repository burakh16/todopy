from django.urls import path

from .views import UserTasksListView, TaskCreateView, ComplateTaskView, DeleteTaskView

urlpatterns = [
    path('user-tasks/', UserTasksListView.as_view()),
    path('create/', TaskCreateView.as_view()),
    path('complate-task/<pk>/', ComplateTaskView.as_view()),
    path('delete-task/<pk>/', DeleteTaskView.as_view()),
]
