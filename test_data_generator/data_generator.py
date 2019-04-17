import random
from string import ascii_lowercase, ascii_uppercase, ascii_letters
import datetime
import test_data_generator.resources_handler as resources

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


def generate_user_data() -> tuple:
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
    city = random.randint(1, len(cities))
    desc = resources.get_description(random.randint(50, 200))

    return first_name, last_name, nickname, email, password, city, desc


def user_data_generator(amount):
    for _ in range(amount):
        yield generate_user_data()


def generate_band_data() -> tuple:
    name = f"{random.choice(adjectives)} {random.choice(nouns)}"
    city = random.randint(1, len(cities))
    year_founded = datetime.date(random.randint(1990, 2019), random.randint(1,12), random.randint(1, 28))
    homepage = f"http://{''.join(name.split(' ')).lower()}.com.pl"
    description = resources.get_description(random.randint(20, 150))

    return name, city, year_founded, homepage, description


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


def generate_random_members(users_ids):
    return [random.choice(users_ids) for _ in range(random.randint(1, 4))]


def band_user_tuple_generator(bands_ids, users_ids):
    for band_id in bands_ids:
        for member in generate_random_members(users_ids):
            yield member, band_id


def band_data_generator(amount):
    for _ in range(amount):
        yield generate_band_data()


def city_data_generator(amount):
    for i in range(amount):
        yield (cities[i],)
