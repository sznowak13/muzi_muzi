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

    user_setting = get_table_input("Input number of users to generate: ")
    band_setting = get_table_input("Input number of bands to generate (Approx. half the users is best): ")
    advert_setting = get_table_input("Input number of adverts to create: ")

    repopulate_cities = get_bool_from_input(
        input("Re-populate city table? (y/N) *enter 'yes' if this is first time* "), CONFIRMS
    )

    cities_ids = populate_table_with_generator(CityGenerator(cities=generator.cities), clear=repopulate_cities) \
        if repopulate_cities else db_manager.get_all_cities_ids()

    profession_ids = db_manager.get_all_professions_ids()
    genres_ids = db_manager.get_all_genres_ids()

    users_ids = populate_table_with_generator(UserGenerator(amount=user_setting.to_generate, cities_ids=cities_ids),
                                              clear=user_setting.clear) if user_setting.generate else db_manager.get_all_users_ids()

    if user_setting.generate:
        populate_table_with_generator(GenresUsersGenerator(users_ids=users_ids, genre_ids=genres_ids),
                                      clear=user_setting.clear)
        populate_table_with_generator(UserProfessionGenerator(users_ids=users_ids, profession_ids=profession_ids),
                                      clear=user_setting.clear)

    if band_setting.generate:
        bands_ids = populate_table_with_generator(BandGenerator(amount=band_setting.to_generate, cities_ids=cities_ids),
                                                  clear=band_setting.clear)
        populate_table_with_generator(BandGenreGenerator(band_ids=bands_ids, genre_ids=genres_ids),
                                      clear=band_setting.clear)
        populate_table_with_generator(UserBandGenerator(users_ids=users_ids, band_ids=bands_ids),
                                      clear=band_setting.clear)

    if advert_setting.generate:
        populate_table_with_generator(
            AdvertGenerator(amount=advert_setting.to_generate, prof_ids=profession_ids, user_ids=users_ids),
            clear=advert_setting.clear)


@time_it
def populate_table(table_name, statement: str, param_gnrt, clear: bool = True, gnrt_sources: list = None):
    print(f"-- Populating {table_name} --")
    if clear:
        print(f"Clearing the data from {table_name}...")
        db_manager.clear_table(table_name)

    print("Preparing sql...")
    sql, params = sql_gen.generate_sql_with_params(statement, param_gnrt, gnrt_sources)
    print("Executing inserts...")
    returning_values = db_manager.execute_with_params(sql, params)
    return [value[0] for value in returning_values] if returning_values else None


@time_it
def populate_table_with_generator(record_generator: RecordGenerator, clear=False):
    print(f"-- Populating {record_generator.table_name} --")
    if clear:
        print(f"Clearing the data from {record_generator.table_name}...")
        db_manager.clear_table(record_generator.table_name)

    print("Preparing sql...")
    sql, params, added = sql_gen.generate_sql_from_generator(record_generator)
    print("Executing inserts...")
    returning_values = db_manager.execute_with_params(sql, params)
    print(f"Added {added} records")
    return [value[0] for value in returning_values] if returning_values else None


if __name__ == '__main__':
    main()
