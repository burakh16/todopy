from rest_framework import serializers
from rest_framework.validators import UniqueValidator
import django.contrib.auth.password_validation as validators
from django.core import exceptions
from .models import User


class RegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=50, validators=[UniqueValidator(queryset=User.objects.all(), message='Username is already exist!')])
    password = serializers.CharField()
    name = serializers.CharField(max_length=50, min_length=5, error_messages={
                                 'min_length': 'Name must be at least 5 characters!'})

    def validate_password(self, password):
        errors = []
        try:
            validators.validate_password(password=password)
        except exceptions.ValidationError as e:
            errors = list(e.messages)
        if errors:
            raise serializers.ValidationError(errors)
        return password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'name',)