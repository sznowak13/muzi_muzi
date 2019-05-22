from django.core import serializers
from django.http import HttpResponse, JsonResponse
from .models import UserListView


def users(request):
    limit = request.GET.get('limit', 20)
    if not isinstance(limit, int) and not limit.isdigit():
        response = {'error': f'requested with incorrect query param limit: {limit}',
                    'description': f'Endpoint {request.path} with query params {request.GET.dict()}'}
        return JsonResponse(response)

    limit = int(limit)
    filter_by = request.GET.get('filter', '-city')
    sample = UserListView.objects.order_by(filter_by)[:limit]
    data = serializers.serialize('json', sample)

    return HttpResponse(data, content_type='application/json')
