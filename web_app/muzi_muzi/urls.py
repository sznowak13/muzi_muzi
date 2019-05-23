from django.urls import path, include
from . import views
from rest_framework.routers import SimpleRouter


router = SimpleRouter()
router.register('professions', views.ProfessionList)
router.register('genres', views.GenreList)
router.register('cities', views.CityList)


app_name = 'muzi_muzi'
urlpatterns = [
    path('', include(router.urls)),
]