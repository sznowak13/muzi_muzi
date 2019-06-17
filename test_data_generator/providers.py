import datetime
import random

from pymocker.common_providers import generate_email, provide_random_text_value

import resources_handler as resources
from db_manager import (
    get_city_name_by_id, get_genre_by_band_id,
    get_band_by_user_id, get_profession_name_by_id,
    get_genre_by_user_id, get_profession_by_user_id,
    get_username_by_id
)

names = resources.get_names()
last_names = resources.get_lastnames()
cities = resources.get_cities()
adjectives = resources.get_adjectives()
nouns = resources.get_nouns()
photos = resources.get_photos()


def provide_user_data(cities_ids) -> tuple:
    """
    Generates data for a random user.
    Creates tuple of values for every column of the database table users
    as well as number of bands that this user is involved in.
    :return: tuple consisting of db record values
    """

    first_name = random.choice(names)
    last_name = random.choice(last_names)
    nickname = f"{first_name[:3]}{last_name[:3]}{random.randint(1000, 9999)}"
    password = provide_random_text_value(min_len=10, max_len=40)
    email = generate_email()
    city_id = random.choice(cities_ids)
    desc = resources.get_description(random.randint(50, 200))
    date_joined = datetime.datetime.now()
    pic = random.choice(photos)

    return first_name, last_name, nickname, email, password, city_id, desc, date_joined, 1, pic


def provide_band_data(cities_ids) -> tuple:
    name = f"{random.choice(adjectives)} {random.choice(nouns)}"
    city_id = random.choice(cities_ids)
    year_founded = datetime.date(random.randint(1990, 2019), random.randint(1, 12), random.randint(1, 28))
    city_name = get_city_name_by_id(city_id)
    homepage = f"http://{''.join(name.split(' ')).lower()}.{''.join(city_name.split(' ')).lower()}.pl"
    description = resources.get_description(random.randint(20, 150))
    created = datetime.datetime.now()

    return name, city_id, year_founded, homepage, description, created


def provide_band_advert_data(prof_ids, user_ids):
    user_posting = random.choice(user_ids)
    band_id, band_name = get_band_by_user_id(user_posting)
    while not band_id:
        user_posting = random.choice(user_ids)
        band_id, band_name = get_band_by_user_id(user_posting)
    genre_id, genre_name = get_genre_by_band_id(band_id)
    profession_searched = random.choice(prof_ids)
    prof_name = get_profession_name_by_id(profession_searched)
    title = f"{band_name} ({genre_name}) looking for {prof_name}"
    description = resources.get_description(100)
    return title, description, datetime.datetime.now(), band_id, genre_id, profession_searched, user_posting


def provide_musician_advert_data(user_ids):
    user_posting = random.choice(user_ids)
    username = get_username_by_id(user_posting)
    genre_id, genre_name = get_genre_by_user_id(user_posting)
    prof_id, prof_name = get_profession_by_user_id(user_posting)
    title = f"{username} ({prof_name}) looking for band playing in {genre_name}"
    description = resources.get_description(60)
    return title, description, datetime.datetime.now(), None, genre_id, prof_id, user_posting
