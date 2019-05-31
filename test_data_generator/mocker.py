import data_generator as generator
import db_manager
import sql_generator as sql_gen
from record_generators import *
from functools import wraps
from time import time
import datetime

CONFIRMS = ['y', 'yes']


def time_it(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time()
        res = func(*args, **kwargs)
        end = time()
        seconds = end - start
        print(f"Time: {str(datetime.timedelta(seconds=seconds)):3} sec")
        return res

    return wrapper


def get_bool_from_input(inpt: str, valid_confirms):
    inpt = inpt.strip().lower()
    for confirm in valid_confirms:
        if inpt == confirm:
            return True
    return False


class TableSetting:

    def __init__(self, to_generate: int, generate: bool, clear: bool):
        self.to_generate = to_generate
        self.generate = generate
        self.clear = clear


def get_table_input(prompt, confirms=None):
    if confirms is None:
        confirms = CONFIRMS
    to_generate = input(prompt)
    if not to_generate or not to_generate.isdigit():
        to_generate = 0
    else:
        to_generate = int(to_generate)
    generate = to_generate > 0
    clear = False if not generate else get_bool_from_input(input("Clear table first? (y/N) "), confirms)
    return TableSetting(to_generate, generate, clear)


def main():
    print("Welcome to test data mocker for muzi_muzi database!")

    users_to_generate = int(input("Input number of users to generate: "))
    user_clear = False if users_to_generate < 1 else get_bool_from_input(input("Clear table first? (y/N) "), CONFIRMS)
    print(user_clear)
    bands_to_generate = int(input("Input number of bands to generate (Approx. half the users is best): "))
    band_clear = False if bands_to_generate < 1 else get_bool_from_input(input("Clear table first? (y/N) "), CONFIRMS)
    print(band_clear)
    adverts_to_generate = int(input("Input number of adverts to create: "))
    advert_clear = False if adverts_to_generate < 1 else get_bool_from_input(input("Clear table first? (y/N) "),
                                                                             CONFIRMS)
    print(advert_clear)
    repopulate_cities = get_bool_from_input(
        input("Re-populate city table? (y/N) *enter 'yes' if this is first time* "), CONFIRMS
    )

    cities_ids = populate_table_with_generator(CityGenerator(cities=generator.cities)) \
        if repopulate_cities else db_manager.get_all_cities_ids()
    profession_ids = db_manager.get_all_professions_ids()
    users_ids = populate_table_with_generator(UserGenerator(amount=users_to_generate, cities_ids=cities_ids), clear=user_clear)
    genres_ids = db_manager.get_all_genres_ids()
    populate_table_with_generator(GenresUsersGenerator(users_ids=users_ids, genre_ids=genres_ids))
    populate_table_with_generator(UserProfessionGenerator(users_ids=users_ids, profession_ids=profession_ids))
    populate_bands(bands_to_generate, cities_ids)
    # bands_ids = db_manager.get_all_bands_ids()
    # assign_genres_to_bands(bands_ids, genres_ids)
    # assign_users_to_bands(bands_ids, users_ids)
    # populate_adverts(adverts_to_generate, profession_ids, users_ids)


def populate_bands(row_number, cities_ids):
    statement = ("INSERT INTO band (name, city_id, year_founded, homepage, description) "
                 "VALUES (%s, %s, %s, %s, %s);")

    populate_table("band", statement, generator.band_data_generator, gnrt_sources=[row_number, cities_ids])


def populate_adverts(amount, prof_ids, user_ids):
    statement = ("INSERT INTO advert (title, description, posted_on, band_id, genre_id, profession_id, user_id) "
                 "VALUES (%s, %s, %s, %s, %s, %s, %s);")
    populate_table("advert",
                   statement, generator.advert_data_generator,
                   gnrt_sources=[
                       amount, prof_ids, user_ids
                   ])


def assign_users_to_bands(bands_ids, users_ids):
    statement = "INSERT INTO user_band (band_id, users_id) VALUES (%s, %s);"
    populate_table("user_band", statement, generator.band_user_tuple_generator, gnrt_sources=[bands_ids, users_ids])


def assign_genres_to_bands(bands_ids, genres_ids):
    statement = "INSERT INTO band_genre (band_id, genre_id) VALUES (%s, %s);"
    populate_table("band_genre", statement, generator.band_genre_data_generator, gnrt_sources=[bands_ids, genres_ids])


def assign_profession_to_users(users_ids, prof_ids):
    statement = "INSERT INTO users_professions (users_id, profession_id) VALUES (%s, %s);"
    populate_table("users_professions", statement, generator.user_prof_data_generator,
                   gnrt_sources=[users_ids, prof_ids])


def populate_table(table_name, statement: str, param_gnrt, clear: bool = True, gnrt_sources: list = None):
    print(f"-- Populating {table_name} --")
    if clear:
        print(f"Clearing the data from {table_name}...")
        db_manager.clear_table(table_name)

    print("Preparing sql...")
    sql, params = sql_gen.generate_sql_with_params(statement, param_gnrt, gnrt_sources)
    print("Executing inserts...")
    returning_values = db_manager.execute_with_params(sql, params)
    return [value[0] for value in returning_values]


def populate_table_with_generator(record_generator: BaseGenerator, clear=False):
    print(f"-- Populating {record_generator.table_name} --")
    if clear:
        print(f"Clearing the data from {record_generator.table_name}...")
        db_manager.clear_table(record_generator.table_name)

    print("Preparing sql...")
    sql, params = sql_gen.generate_sql_from_generator(record_generator)
    print("Executing inserts...")
    returning_values = db_manager.execute_with_params(sql, params)
    return [value[0] for value in returning_values]


if __name__ == '__main__':
    main()
