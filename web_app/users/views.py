from .models import Users, VerificationToken
from .serializers import UsersSerializer, UsersRegisterSerializer
from rest_framework import mixins, viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
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

    @action(detail=False, methods=['get'])
    def verify_email(self, request):
        token = request.query_params.get('key')
        if not token:
            return Response({"error": "Missing verification token"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            verified_user = VerificationToken.objects.get(key=token).user
        except VerificationToken.DoesNotExist:
            return Response({"error": "Wrong token provided"}, status=status.HTTP_400_BAD_REQUEST)

        verified_user.is_active = True
        verified_user.save()
        print("ISACTIVE: ", verified_user.is_active)
        return Response({"success": "Account activated"})
