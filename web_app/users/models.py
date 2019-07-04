from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework.authtoken.models import Token as TokenModel


class Users(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(blank=False)
    is_active = models.BooleanField(default=False, help_text=(
        'Designates whether this user should be treated as active. '
        'Unselect this instead of deleting accounts.'
    ), )
    role = models.ForeignKey('muzi_muzi.Role', models.DO_NOTHING, blank=True, null=True)
    city = models.ForeignKey('muzi_muzi.City', models.DO_NOTHING, blank=True, null=True)
    photo_url = models.CharField(max_length=255, blank=True, null=True)
    video = models.ForeignKey('muzi_muzi.Videos', models.DO_NOTHING, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    genres = models.ManyToManyField('muzi_muzi.Genre')
    professions = models.ManyToManyField('muzi_muzi.Profession')

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'users'


class VerificationToken(TokenModel):
    class Meta:
        db_table = 'verification_token'


#  --- Views ---


class UserListView(models.Model):
    user_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=40)
    email = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    prof = models.TextField()
    genre = models.TextField()

    class Meta:
        managed = False
        db_table = "user_list_view"


class UserProfileView(models.Model):
    user_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=50)
    nickname = models.CharField(max_length=30)
    email = models.CharField(max_length=100)
    description = models.TextField()
    city = models.CharField(max_length=50)
    video = models.CharField(max_length=255)
    prof = models.TextField()
    genre = models.TextField()
    bands = models.TextField()

    class Meta:
        managed = False
        db_table = 'user_profile_view'
