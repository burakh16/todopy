from .base import *

ALLOWED_HOSTS = ['localhost']

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:8080"
]

INSTALLED_APPS += [
    'django_extensions',
]
