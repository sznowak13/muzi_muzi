from django.urls import path
from . import views

app_name = 'muzi_muzi'

urlpatterns = [
    path('api/', views.api_root, name='api'),
    path('professions/', views.ProfessionList.as_view(), name='professions'),
    path('genre/', views.GenreList.as_view(), name='genre'),
    path('city/', views.CityList.as_view(), name='city')
]
