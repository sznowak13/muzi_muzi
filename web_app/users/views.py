from .models import Users
from .serializers import UsersSerializer, UsersRegisterSerializer
from rest_framework import mixins, viewsets, filters
from rest_framework.permissions import AllowAny
from .permissions import IsUserOrReadOnly
from muzi_muzi.views import LatestViewMixIn


class UserViewSet(viewsets.ModelViewSet, LatestViewMixIn):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('username', 'email')
    permission_classes = (IsUserOrReadOnly,)
    latest_by = 'date_joined'


class UserRegisterView(mixins.CreateModelMixin,
                       viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersRegisterSerializer
    permission_classes = (AllowAny,)
