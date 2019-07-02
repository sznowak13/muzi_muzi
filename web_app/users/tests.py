from django.contrib.auth.hashers import make_password
from django.core import mail
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Users, VerificationToken
from rest_framework.authtoken.models import Token
from web_app.utils import reverse
import pytest

import json


class TestUsers(APITestCase):

    def setUp(self) -> None:
        Users.objects.create(username="Test1", first_name="Adam", last_name="Adamowski", password=make_password("Adam"))
        Users.objects.create(username="Test2", first_name="Bdam", last_name="Bdamowski", password=make_password("Bdam"))
        Users.objects.create(username="Test3", first_name="Cdam", last_name="Cdamowski", password=make_password("Cdam"))
        Users.objects.create(username="Test4", first_name="Ddam", last_name="Ddamowski", password=make_password("Ddam"))

    def test_get_latest(self):
        url = reverse('users-latest')
        response = self.client.get(url)
        json_response = json.loads(response.content.decode('utf-8'))

        # Ok, its ugly, but since tests dont reset id sequence between each method
        # we are getting basically random ids each time this test is ran (because test method execution is random)
        # so we are checking ids dynamically as we dont care much about correct user id
        user_ids = [user.user_id for user in Users.objects.order_by('pk')]

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 4
        assert json_response == [
            {'user_id': user_ids[3], 'url': f'http://testserver/users/{user_ids[3]}/', 'first_name': 'Ddam', 'last_name': 'Ddamowski',
             'username': 'Test4', 'role': None, 'city': None, 'photo_url': None, 'video': None, 'description': None,
             'genres': [], 'professions': [], 'bands': [], 'adverts': []},
            {'user_id': user_ids[2], 'url': f'http://testserver/users/{user_ids[2]}/', 'first_name': 'Cdam', 'last_name': 'Cdamowski',
             'username': 'Test3', 'role': None, 'city': None, 'photo_url': None, 'video': None, 'description': None,
             'genres': [], 'professions': [], 'bands': [], 'adverts': []},
            {'user_id': user_ids[1], 'url': f'http://testserver/users/{user_ids[1]}/', 'first_name': 'Bdam', 'last_name': 'Bdamowski',
             'username': 'Test2', 'role': None, 'city': None, 'photo_url': None, 'video': None, 'description': None,
             'genres': [], 'professions': [], 'bands': [], 'adverts': []},
            {'user_id': user_ids[0], 'url': f'http://testserver/users/{user_ids[0]}/', 'first_name': 'Adam', 'last_name': 'Adamowski',
             'username': 'Test1', 'role': None, 'city': None, 'photo_url': None, 'video': None, 'description': None,
             'genres': [], 'professions': [], 'bands': [], 'adverts': []},
        ]

    def test_user_register(self):
        Users.objects.all().delete()  # Deleting users from setUp
        url = reverse('register-list')
        resp = self.client.post(url, data={
            'username': 'test_user',
            'password': 'tester',
            'password2': 'tester',
            'email': 'email@test.pl',
            'email2': 'email@test.pl'
        })
        assert resp.status_code == status.HTTP_201_CREATED
        assert Users.objects.count() == 1  # As 4 users are created on setup
        assert Users.objects.get().username == 'test_user'
        assert Users.objects.get().is_active is False

    def test_user_register_with_not_same_password_email(self):
        url = reverse('register-list')
        resp = self.client.post(url, data={
            'username': 'test_user',
            'password': 'tester',
            'password2': 'not_same',
            'email': 'email@test.pl',
            'email2': 'not_same@test.pl'
        })
        json_response = json.loads(resp.content.decode('utf-8'))
        assert resp.status_code == status.HTTP_400_BAD_REQUEST
        assert json_response == {
            "password": [
                "Password must match"
            ],
            "email": [
                "Emails must match"
            ]
        }

    def test_login_inactive_user(self):
        url = reverse('api-token-auth')
        user = Users.objects.get(username="Test1")
        resp = self.client.post(url, data={'username': user.username, 'password': 'Adam'})
        assert resp.status_code == status.HTTP_400_BAD_REQUEST

    def test_login_active_user(self):
        url = reverse('api-token-auth')
        user = Users.objects.get(username="Test1")
        user.is_active = True
        user.save()
        token = Token.objects.get(user=user).key
        resp = self.client.post(url, data={'username': user.username, 'password': 'Adam'})
        json_response = json.loads(resp.content.decode('utf-8'))
        assert resp.status_code == status.HTTP_200_OK
        assert json_response == {
            'token': token
        }

    def test_verification_tokens_are_created_for_each_user(self):
        # setup creates 4 users
        assert VerificationToken.objects.count() == 4

    def test_email_verification_without_token(self):
        url = reverse('register-verify-email')
        resp = self.client.get(url)
        json_response = json.loads(resp.content.decode('utf-8'))
        assert resp.status_code == status.HTTP_400_BAD_REQUEST
        assert json_response == {"error": "Missing verification token"}

    def test_email_verification_with_unknown_token(self):
        url = reverse('register-verify-email', query_params={"key": "very_wrong_token"})
        resp = self.client.get(url)
        json_response = json.loads(resp.content.decode('utf-8'))
        assert resp.status_code == status.HTTP_400_BAD_REQUEST
        assert json_response == {"error": "Wrong token provided"}

    def test_email_verification_with_correct_token(self):
        user = Users.objects.get(pk=1)
        assert not user.is_active
        correct_token = VerificationToken.objects.get(user=user)
        url = reverse('register-verify-email', query_params={"key": correct_token})
        resp = self.client.get(url)
        json_response = json.loads(resp.content.decode('utf-8'))
        user = Users.objects.get(pk=1)  # Need to re-fetch the user from DB!! Previous one isn't changed!
        assert resp.status_code == status.HTTP_200_OK
        assert json_response == {"success": "Account activated"}
        assert user.is_active

    def test_mail_sent_after_register(self):
        # TODO test sending mails
        pass

    def test_verification_token_delete_after_confirmation(self):
        user = Users.objects.get(username="Test1")
        correct_token = VerificationToken.objects.get(user=user)
        url = reverse('register-verify-email', query_params={"key": correct_token})
        resp = self.client.get(url)
        with pytest.raises(VerificationToken.DoesNotExist):
            VerificationToken.objects.get(pk=correct_token)

    def test_to_fail(self):
        assert 1 == 2
