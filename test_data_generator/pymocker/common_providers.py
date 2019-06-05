import random
from string import ascii_lowercase, ascii_uppercase, ascii_letters


casing_map = {
    "mixed": ascii_letters,
    "upper": ascii_uppercase,
    "lower": ascii_lowercase
}


def generate_email():
    prefix = provide_random_text_value(6, 10, "lower")
    domain = provide_random_text_value(6, 10, "lower")
    postfix = provide_random_text_value(3, 3, "lower")

    return f"{prefix}@{domain}.{postfix}"


def provide_random_text_value(min_len: int, max_len: int, casing: str = "mixed"):
    letter_pool = casing_map.get(casing)
    if letter_pool is None:
        raise ValueError("No such casing")
    length = random.randint(min_len, max_len)
    letters = [random.choice(letter_pool) for _ in range(length)]
    return "".join(letters)


def provide_random_ids(ids, min_num=1, max_num=4):
    return [random.choice(ids) for _ in range(random.randint(min_num, max_num))]

