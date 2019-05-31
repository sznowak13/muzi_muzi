from .models import Users
from .serializers import UsersSerializer, UsersRegisterSerializer
from rest_framework import generics, mixins, viewsets, filters
from rest_framework.permissions import AllowAny


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('username', 'email')


class UserRegisterView(mixins.CreateModelMixin,
                       viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersRegisterSerializer
    permission_classes = (AllowAny,)
