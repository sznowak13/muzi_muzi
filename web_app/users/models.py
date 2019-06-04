from django.db import models
from django.contrib.auth.models import AbstractUser


DEFAULT_ROLE_ID = 1


class Users(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    role = models.ForeignKey('muzi_muzi.Role', models.SET_NULL, null=True, default=DEFAULT_ROLE_ID)
    city = models.ForeignKey('muzi_muzi.City', models.SET_NULL, blank=True, null=True)
    photo_url = models.CharField(max_length=255, blank=True, null=True)
    video = models.ForeignKey('muzi_muzi.Videos', models.SET_NULL, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    genres = models.ManyToManyField('muzi_muzi.Genre')
    professions = models.ManyToManyField('muzi_muzi.Profession')

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'users'
        verbose_name_plural = 'Users'


#  --- Views ---


class UserListView(models.Model):
    user_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=40)
    email = models.CharField(max_length=100)
    photo_url = models.CharField(max_length=255)
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
    photo = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    video = models.CharField(max_length=255)
    prof = models.TextField()
    genre = models.TextField()
    bands = models.TextField()

    class Meta:
        managed = False
        db_table = 'user_profile_view'
