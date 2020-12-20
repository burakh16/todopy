from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    complated_at = models.DateTimeField(blank=True, null=True)
    title = models.CharField(max_length=30)
    content = models.TextField()
    order = models.SmallIntegerField()