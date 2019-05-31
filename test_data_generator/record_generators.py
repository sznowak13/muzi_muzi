from data_generator import generate_user_data, generate_random_ids, generate_band_data
from abc import ABC, abstractmethod


class BaseGenerator(ABC):
    base_statement = ""
    values_statement = ""
    _non_blank_fields = ('base_statement', 'values_statement')
    returning = False
    returning_column = ""

    def __init__(self, **sources):
        self._check_implementation()
        self.generator_sources = sources

    @abstractmethod
    def generate(self):
        pass

    def _check_implementation(self):
        fields = [getattr(self, name) for name in self._non_blank_fields]
        if not all(fields):
            raise NotImplementedError("Not all class variables are provided")


class RecordGenerator(BaseGenerator, ABC):
    table_name = ""
    fields = ()
    _non_blank_fields = BaseGenerator._non_blank_fields + ('table_name',)

    def __init__(self, **sources):
        fields_repr = ", ".join([f'"{field}"' for field in self.fields])
        self.base_statement = self.base_statement or f"INSERT INTO {self.table_name} ({fields_repr}) VALUES "
        self.values_statement = self.values_statement or '(' + ','.join(['%s' for _ in self.fields]) + ')'
        super(RecordGenerator, self).__init__(**sources)
        self.returning = False if not self.returning_column else True


class LinkRelationRecordGenerator(RecordGenerator):
    first_table = ''
    second_table = ''
    first_column = ''
    second_column = ''
    _non_blank_fields = RecordGenerator._non_blank_fields + ('first_table', 'second_table')

    def __init__(self, **sources):
        self.first_column = self.first_column or self.first_table + '_id'
        self.second_column = self.second_column or self.second_table + '_id'
        self.table_name = self.table_name or self.first_table + '_' + self.second_table
        self.base_statement = f"INSERT INTO {self.table_name} ({self.first_column}, {self.second_column}) VALUES "
        self.values_statement = "(%s, %s)"
        super(LinkRelationRecordGenerator, self).__init__(**sources)

    def generate(self):
        first_fields = self.generator_sources[self.first_column + 's']
        second_fields = self.generator_sources[self.second_column + 's']
        for first_field in first_fields:
            for second_field in generate_random_ids(second_fields, max_num=3):
                yield first_field, second_field


class UserGenerator(RecordGenerator):
    table_name = "users"
    base_statement = ("INSERT INTO users (first_name, last_name, username, "
                      "email, password, city_id, description, is_superuser, is_staff, is_active, date_joined) "
                      "VALUES ")
    values_statement = "(%s, %s, %s, %s, %s, %s, %s, FALSE, FALSE, TRUE, %s)"
    returning_column = "user_id"

    def generate(self):
        amount = self.generator_sources['amount']
        cities_ids = self.generator_sources['cities_ids']
        for _ in range(amount):
            yield generate_user_data(cities_ids)


class CityGenerator(RecordGenerator):
    table_name = "city"
    base_statement = "INSERT INTO city (name) VALUES "
    values_statement = "(%s)"
    returning_column = "city_id"

    def generate(self):
        cities = self.generator_sources['cities']
        for city in cities:
            yield (city,)


class GenresUsersGenerator(LinkRelationRecordGenerator):
    first_table = 'users'
    second_table = 'genres'
    second_column = 'genre_id'


class UserProfessionGenerator(LinkRelationRecordGenerator):
    first_table = 'users'
    second_table = 'professions'
    second_column = 'profession_id'


class BandGenerator(RecordGenerator):
    table_name = 'band'
    fields = ('name', 'city_id', 'year_founded', 'homepage', 'description')

    def generate(self):
        amount = self.generator_sources['amount']
        cities_ids = self.generator_sources['cities_ids']
        for _ in range(amount):
            yield generate_band_data(cities_ids)