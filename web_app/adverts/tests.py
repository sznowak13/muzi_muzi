from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Advert


class AdvertsTest(APITestCase):

    def test_latest(self):

        url = reverse('adverts-latest')
