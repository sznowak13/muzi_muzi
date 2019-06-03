from pymocker.utils import get_table_setting, get_bool_from_input
from pymocker.populators import populate_table_with_generator

import db_manager
import providers as generator
from mockers import *


def main():
    print("Welcome to test data mocker for muzi_muzi database!")

    user_setting = get_table_setting("Input number of users to generate: ")
    band_setting = get_table_setting("Input number of bands to generate (Approx. half the users is best): ")
    advert_setting = get_table_setting("Input number of adverts to create: ")

    repopulate_cities = get_bool_from_input(
        input("Re-populate city table? (y/N) *enter 'yes' if this is first time* ")
    )

    cities_ids = populate_table_with_generator(CityMocker(cities=generator.cities), clear=repopulate_cities) \
        if repopulate_cities else db_manager.get_all_cities_ids()

    profession_ids = db_manager.get_all_professions_ids()
    genres_ids = db_manager.get_all_genres_ids()

    users_ids = populate_table_with_generator(UserMocker(amount=user_setting.to_generate, cities_ids=cities_ids),
                                              clear=user_setting.clear) if user_setting.generate else db_manager.get_all_users_ids()

    if user_setting.generate:
        populate_table_with_generator(GenresUsersMocker(users_ids=users_ids, genre_ids=genres_ids),
                                      clear=user_setting.clear)
        populate_table_with_generator(UserProfessionMocker(users_ids=users_ids, profession_ids=profession_ids),
                                      clear=user_setting.clear)

    if band_setting.generate:
        bands_ids = populate_table_with_generator(BandMocker(amount=band_setting.to_generate, cities_ids=cities_ids),
                                                  clear=band_setting.clear)
        populate_table_with_generator(BandGenreMocker(band_ids=bands_ids, genre_ids=genres_ids),
                                      clear=band_setting.clear)
        populate_table_with_generator(UserBandMocker(users_ids=users_ids, band_ids=bands_ids),
                                      clear=band_setting.clear)

    if advert_setting.generate:
        populate_table_with_generator(
            AdvertMocker(amount=advert_setting.to_generate, prof_ids=profession_ids, user_ids=users_ids),
            clear=advert_setting.clear)


if __name__ == '__main__':
    main()
