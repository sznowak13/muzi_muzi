from django.test import TestCase
from django.urls import reverse
from django.utils import timezone

from .models import *


# Create your tests here.


def create_test_data():
    u = Users.objects.create(username='Tester', password='tester123', email='tester@gmail.com')
    u.genres.create(name='test_genre1')
    u.professions.create(name='prof1')
    u.city = City.objects.create(name='test_city')
    b = Band.objects.create(name='test_band', city=u.city, year_founded=timezone.now())
    b.genres.add(u.genres.all()[0])
    b.members.add(u)
    Advert.objects.create(user=u, band=b, title='this is a test advert', description='lorem ipsum i tak dalej',
                          profession_id=1, genre_id=1)


def create_adverts():
    pass


class TestGetAdverts(TestCase):

    def test_basic_endpoint(self):
        create_test_data()
        res = self.client.get(reverse('muzi_muzi:adverts'))
        adverts = Advert.objects.all()
