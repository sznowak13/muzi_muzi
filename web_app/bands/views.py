from django.core import serializers
from django.http import HttpResponse, JsonResponse
from .models import Band
from .serializers import BandsSerializer
from rest_framework import generics, mixins, viewsets


class BandViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Band.objects.all()
    serializer_class = BandsSerializer



# def bands(request):
#     limit = request.GET.get('limit', 20)
#     if not isinstance(limit, int) and not limit.isdigit():
#         response = {'error': f'requested with incorrect query param limit: {limit}',
#                     'description': f'Endpoint {request.path} with query params {request.GET.dict()}'}
#         return JsonResponse(response)
#
#     limit = int(limit)
#     filter_by = request.GET.get('filter', '-band_id')
#     sample = Band.objects.order_by(filter_by)[:limit]
#     data = serializers.serialize('json', sample)
#
#     return HttpResponse(data, content_type='application/json')
