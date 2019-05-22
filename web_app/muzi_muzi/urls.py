from django.urls import path
from . import views

app_name = 'muzi_muzi'

urlpatterns = [
    path('api/', views.api_root, name='api'),
    path('professions/', views.ProfessionList.as_view(), name='professions')
]
