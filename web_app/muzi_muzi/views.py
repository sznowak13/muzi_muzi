from rest_framework import viewsets, mixins
from .models import Profession, Genre, City
from .serializers import ProfessionSerializer, GenreSerializer, CitySerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken


class ObtainTokenAndId(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        resp = super().post(request, *args, **kwargs)
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        resp.data['id'] = user.user_id
        return resp


class ProfessionList(viewsets.ModelViewSet):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer


class GenreList(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class CityList(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class LatestViewMixIn(object):

    """
    Custom mixin for /latest endpoint, returning a list of models ordered by some creation date.
    By default it uses 'created' column in model and 'num' query param for parametrization; returns 10
    records by default. To be used with DRF serializers.
    """

    latest_num = 10
    latest_by = 'created'
    latest_param = 'num'

    @action(detail=False)
    def latest(self, request):
        latest_num = request.query_params.get(self.latest_param, self.latest_num)
        if not isinstance(latest_num, int) and not latest_num.isdigit():
            return Response({'error': f'Wrong {self.latest_param} parameter, was not a number. ({self.latest_param}={latest_num})'})
        queryset = self.get_queryset().order_by('-' + self.latest_by)[:int(latest_num)]
        serializer = self.serializer_class(queryset, many=True, context={'request': request})
        return Response(serializer.data)
