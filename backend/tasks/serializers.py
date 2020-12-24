from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    complated = serializers.ReadOnlyField()
    class Meta:
        model = Task
        fields = '__all__'
