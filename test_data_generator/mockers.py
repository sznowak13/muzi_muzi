from providers import provide_user_data, provide_band_data, provide_musician_advert_data, \
    provide_band_advert_data
import random
from pymocker.abstract_mockers import RecordMocker, LinkRelationRecordMocker


class UserMocker(RecordMocker):
    table_name = "users"
    fields = (
        "first_name", "last_name", "username", "email", "password", "city_id", "description", "is_superuser",
        "is_staff", "is_active", "date_joined", "role_id", "photo_url"
    )
    values_statement = "(%s, %s, %s, %s, %s, %s, %s, FALSE, FALSE, TRUE, %s, %s, %s)"
    returning_column = "user_id"

    def generate(self):
        amount = self.generator_sources['amount']
        cities_ids = self.generator_sources['cities_ids']
        for _ in range(amount):
            yield provide_user_data(cities_ids)


class CityMocker(RecordMocker):
    table_name = "city"
    base_statement = "INSERT INTO city (name) VALUES "
    values_statement = "(%s)"
    returning_column = "city_id"

    def generate(self):
        cities = self.generator_sources['cities']
        for city in cities:
            yield (city,)


class GenresUsersMocker(LinkRelationRecordMocker):
    first_table = 'users'
    second_table = 'genres'
    second_column = 'genre_id'
    max_relations = 3


class BandGenreMocker(LinkRelationRecordMocker):
    first_table = 'band'
    second_table = 'genre'
    max_relations = 1


class UserProfessionMocker(LinkRelationRecordMocker):
    first_table = 'users'
    second_table = 'professions'
    second_column = 'profession_id'
    max_relations = 3


class UserBandMocker(LinkRelationRecordMocker):
    first_table = 'user'
    second_table = 'band'
    first_column = 'users_id'
    max_relations = 4


class BandMocker(RecordMocker):
    table_name = 'band'
    fields = ('name', 'city_id', 'year_founded', 'homepage', 'description', 'created')
    returning_column = 'band_id'

    def generate(self):
        amount = self.generator_sources['amount']
        cities_ids = self.generator_sources['cities_ids']
        for _ in range(amount):
            yield provide_band_data(cities_ids)


class AdvertMocker(RecordMocker):
    table_name = 'advert'
    fields = ('title', 'description', 'posted_on', 'band_id', 'genre_id', 'profession_id', 'user_id')

    def generate(self):
        amount = self.generator_sources['amount']
        prof_ids = self.generator_sources['prof_ids']
        user_ids = self.generator_sources['user_ids']
        for _ in range(amount):
            if random.random() < 0.5:
                yield provide_band_advert_data(prof_ids, user_ids)
            else:
                yield provide_musician_advert_data(user_ids)
