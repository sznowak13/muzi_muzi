from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()
router.register('', views.AdvertViewSet)

app_name = 'adverts'
urlpatterns = [
    path('', include(router.urls))
    ]
