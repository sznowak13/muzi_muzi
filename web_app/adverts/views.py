from .models import Advert
from .serializers import AdvertSerializer
from rest_framework import permissions, viewsets
from .permissions import IsOwnerOrReadOnly
from muzi_muzi.views import LatestViewMixIn


class AdvertViewSet(viewsets.ModelViewSet, LatestViewMixIn):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)
    queryset = Advert.objects.all()
    serializer_class = AdvertSerializer
    latest_by = 'posted_on'

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# def adverts(request):
#     limit = request.GET.get('limit', 20)
#     if not isinstance(limit, int) and not limit.isdigit():
#         response = {'error': f'requested with incorrect query param limit: {limit}',
#                     'description': f'Endpoint {request.path} with query params {request.GET.dict()}'}
#         return JsonResponse(response)
#
#     limit = int(limit)
#     filter_by = request.GET.get('filter', '-posted_on')
#     sample = AdvertListView.objects.order_by(filter_by)[:limit]
#     data = serializers.serialize('json', sample)
#
#     return HttpResponse(data, content_type='application/json')
