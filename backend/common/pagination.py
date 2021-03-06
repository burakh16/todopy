from rest_framework import pagination, response


class CustomPagination(pagination.PageNumberPagination):

    page_size = 9
    page_size_query_param = 'per_page'

    def get_paginated_response(self, data):
        return response.Response({
            'pagination': {
                'total': self.page.paginator.count,
                'num_pages': self.page.paginator.num_pages,
                'per_page': self.get_page_size(self.request),
                'current_page': int(self.request.query_params.get('page', 1)),
                'last_page': self.page.paginator.num_pages,
                'next_page_url': self.get_next_link(),
                'previous_page_url': self.get_previous_link(),
            },
            'data': data
        })
