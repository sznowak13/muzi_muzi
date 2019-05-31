from .models import Band
from .serializers import BandsSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class BandViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Band.objects.all()
    serializer_class = BandsSerializer
    latest_num = 10

    @action(detail=False)
    def latest(self, request):
        queryset = self.get_queryset().order_by('-created')[:self.latest_num]
        serializer = BandsSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)
