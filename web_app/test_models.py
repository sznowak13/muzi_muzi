# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Advert(models.Model):
    advert_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    band = models.ForeignKey('Band', models.DO_NOTHING, blank=True, null=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    posted_on = models.DateTimeField()
    profession = models.ForeignKey('Profession', models.DO_NOTHING)
    genre = models.ForeignKey('Genre', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'advert'


class Band(models.Model):
    band_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    city = models.ForeignKey('City', models.DO_NOTHING, blank=True, null=True)
    year_founded = models.DateField(blank=True, null=True)
    photo = models.CharField(max_length=255, blank=True, null=True)
    homepage = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'band'


class BandGenre(models.Model):
    band = models.ForeignKey(Band, models.DO_NOTHING, blank=True, null=True)
    genre = models.ForeignKey('Genre', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'band_genre'


class City(models.Model):
    city_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'city'


class Genre(models.Model):
    genre_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'genre'


class PrivateMessages(models.Model):
    msg_id = models.AutoField(primary_key=True)
    user_to = models.ForeignKey('Users', models.DO_NOTHING, db_column='user_to', blank=True, null=True)
    user_from = models.ForeignKey('Users', models.DO_NOTHING, db_column='user_from', blank=True, null=True)
    sent_time = models.DateTimeField(blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    read = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'private_messages'


class Profession(models.Model):
    prof_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'profession'


class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'role'


class UserBand(models.Model):
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    band = models.ForeignKey(Band, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_band'


class UserGenre(models.Model):
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    genre = models.ForeignKey(Genre, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_genre'


class UserProfession(models.Model):
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    prof = models.ForeignKey(Profession, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_profession'


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    role = models.ForeignKey(Role, models.DO_NOTHING, blank=True, null=True)
    first_name = models.CharField(max_length=40, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    nickname = models.CharField(max_length=30, blank=True, null=True)
    email = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=100)
    city = models.ForeignKey(City, models.DO_NOTHING, blank=True, null=True)
    photo_url = models.CharField(max_length=255, blank=True, null=True)
    video = models.ForeignKey('Videos', models.DO_NOTHING, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'


class Videos(models.Model):
    video_id = models.AutoField(primary_key=True)
    url = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'videos'
