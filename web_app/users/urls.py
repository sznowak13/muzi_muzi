from django.urls import path, include
from . import views
from rest_framework.routers import SimpleRouter
from rest_framework.urlpatterns import format_suffix_patterns

router = SimpleRouter()
router.register('users', views.UserViewSet)

app_name = 'users'
urlpatterns = [
    path('', include(router.urls))
]
