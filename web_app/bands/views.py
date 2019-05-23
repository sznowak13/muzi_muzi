from .models import Band
from .serializers import BandsSerializer
from rest_framework import viewsets


class BandViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Band.objects.all()
    serializer_class = BandsSerializer


