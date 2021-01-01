import datetime

from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

from rest_framework.exceptions import ValidationError

User = get_user_model()


class TaskManager(models.Manager):
    def get_user_tasks(self, user):
        return self.filter(user=user)

    def complate_task(self, task):
        if task.complated_at:
            raise ValidationError("This task already complated!")
        task.complated_at = datetime.datetime.now(tz=timezone.utc)
        task.save()
        return task


class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    complated_at = models.DateTimeField(blank=True, null=True)
    title = models.CharField(max_length=30)
    description = models.TextField()

    objects = TaskManager()

    def __str__(self):
        return self.title

    @property
    def complated(self):
        return True if self.complated_at else False
