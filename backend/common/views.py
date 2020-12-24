from rest_framework.generics import ListAPIView
from rest_framework.filters import OrderingFilter

from django_filters.rest_framework import DjangoFilterBackend

from .pagination import CustomPagination


class ListApiView(ListAPIView):
    """ 
    ListAPIView with pagination, filter and ordering   
    """
    pagination_class = CustomPagination
    filter_backends = [OrderingFilter]
    ordering = ['id']
