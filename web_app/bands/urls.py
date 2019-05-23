from django.urls import path, include
from . import views
from rest_framework.routers import SimpleRouter


router = SimpleRouter()
router.register('bands', views.BandViewSet)

app_name = 'bands'
urlpatterns = [
    path('', include(router.urls))
]
