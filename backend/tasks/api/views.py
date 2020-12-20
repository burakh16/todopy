from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT

from tasks.models import Task
from .serializers import TaskSerializer


class UserTasksList(ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer