from .models import Band
from .serializers import BandsSerializer
from rest_framework import viewsets
from muzi_muzi.views import LatestViewMixIn


class BandViewSet(viewsets.ReadOnlyModelViewSet, LatestViewMixIn):
    queryset = Band.objects.all()
    serializer_class = BandsSerializer
