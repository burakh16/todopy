from django.shortcuts import get_object_or_404

from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT
from rest_framework.filters import OrderingFilter

from .models import Task
from .serializers import TaskSerializer

from common.pagination import CustomPagination


class UserTasksListView(ListAPIView):
    serializer_class = TaskSerializer
    pagination_class = CustomPagination
    filter_backends = (OrderingFilter,)
    ordering = ['-id']

    def get_queryset(self):
        queryset = Task.objects.get_user_tasks(self.request.user)
        complated = self.request.query_params.get('complated', None)
        if complated:
            queryset = queryset.filter(
                complated_at__isnull=not bool(complated == 'true'))
        return queryset


class TaskCreateView(CreateAPIView):
    model = Task
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ComplateTaskView(APIView):
    def put(self, request, pk):
        task = get_object_or_404(
            Task.objects.get_user_tasks(request.user), pk=pk)
        task =Task.objects.complate_task(task)
        return Response(TaskSerializer(task).data)


class DeleteTaskView(APIView):
    def delete(self, request, pk):
        task = get_object_or_404(
            Task.objects.get_user_tasks(request.user), pk=pk)
        task.delete()
        return Response(status=HTTP_204_NO_CONTENT)
