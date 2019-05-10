import datetime
import random
from string import ascii_lowercase, ascii_uppercase, ascii_letters

import resources_handler as resources
from db_manager import (
    get_city_name_by_id, get_genre_by_band_id,
    get_band_by_user_id, get_profession_name_by_id,
    get_genre_by_user_id, get_profession_by_user_id,
    get_username_by_id
)
casing_map = {
    "mixed": ascii_letters,
    "upper": ascii_uppercase,
    "lower": ascii_lowercase
}

names = resources.get_names()
last_names = resources.get_lastnames()
cities = resources.get_cities()
adjectives = resources.get_adjectives()
nouns = resources.get_nouns()


def generate_user_data(cities_ids) -> tuple:
    """
    Generates data for a random user.
    Creates tuple of values for every column of the database table users
    as well as number of bands that this user is involved in.
    :return: tuple consisting of db record values
    """

    first_name = random.choice(names)
    last_name = random.choice(last_names)
    nickname = f"{first_name[:3]}{last_name[:3]}{random.randint(1000, 9999)}"
    password = generate_random_text_value(min_len=10, max_len=40)
    email = generate_email()
    city_id = random.choice(cities_ids)
    desc = resources.get_description(random.randint(50, 200))
    date_joined = datetime.datetime.now()

    return first_name, last_name, nickname, email, password, city_id, desc, date_joined


def user_data_generator(amount, cities_ids):
    for _ in range(amount):
        yield generate_user_data(cities_ids)


def generate_band_data(cities_ids) -> tuple:
    name = f"{random.choice(adjectives)} {random.choice(nouns)}"
    city_id = random.choice(cities_ids)
    year_founded = datetime.date(random.randint(1990, 2019), random.randint(1, 12), random.randint(1, 28))
    city_name = get_city_name_by_id(city_id)
    homepage = f"http://{''.join(name.split(' ')).lower()}.{''.join(city_name.split(' ')).lower()}.pl"
    description = resources.get_description(random.randint(20, 150))

    return name, city_id, year_founded, homepage, description


def generate_email():
    prefix = generate_random_text_value(6, 10, "lower")
    domain = generate_random_text_value(6, 10, "lower")
    postfix = generate_random_text_value(3, 3, "lower")

    return f"{prefix}@{domain}.{postfix}"


def generate_random_text_value(min_len: int, max_len: int, casing: str = "mixed"):
    letter_pool = casing_map.get(casing)
    if letter_pool is None:
        raise ValueError("No such casing")
    length = random.randint(min_len, max_len)
    letters = [random.choice(letter_pool) for _ in range(length)]
    return "".join(letters)


def generate_random_ids(ids, min_num=1, max_num=4):
    return [random.choice(ids) for _ in range(random.randint(min_num, max_num))]


def band_user_tuple_generator(bands_ids, users_ids):
    for band_id in bands_ids:
        for member in generate_random_ids(users_ids):
            yield band_id, member


def band_data_generator(amount, cities_ids):
    for _ in range(amount):
        yield generate_band_data(cities_ids)


def city_data_generator():
    for i in range(len(cities)):
        yield (cities[i],)


def user_genre_data_generator(users_ids, genres_ids):
    for user_id in users_ids:
        for genre_id in generate_random_ids(genres_ids, max_num=3):
            yield user_id, genre_id


def band_genre_data_generator(bands_ids, genre_ids):
    for band_id in bands_ids:
        for genre_id in generate_random_ids(genre_ids, max_num=1):
            yield band_id, genre_id


def user_prof_data_generator(user_ids, prof_ids):
    for user_id in user_ids:
        for prof_id in generate_random_ids(prof_ids, max_num=3):
            yield user_id, prof_id


def advert_data_generator(amount, prof_ids, user_ids):
    for _ in range(amount):
        if random.random() < 0.5:
            yield generate_band_advert_data(prof_ids, user_ids)
        else:
            yield generate_musician_advert_data(user_ids)


def generate_band_advert_data(prof_ids, user_ids):
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


def generate_musician_advert_data(user_ids):
    user_posting = random.choice(user_ids)
    username = get_username_by_id(user_posting)
    genre_id, genre_name = get_genre_by_user_id(user_posting)
    prof_id, prof_name = get_profession_by_user_id(user_posting)
    title = f"{username} ({prof_name}) looking for band playing in {genre_name}"
    description = resources.get_description(60)
    return title, description, datetime.datetime.now(), None, genre_id, prof_id, user_posting
