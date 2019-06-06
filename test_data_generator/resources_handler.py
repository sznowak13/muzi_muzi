def get_names():
    with open("resources/names.txt") as f:
        names = f.readlines()
    names = [s.strip() for s in names]

    return names


def get_lastnames():
    with open("resources/surnames.txt") as f:
        surnames = [surname.strip().capitalize() for surname in f.readlines()]

    return surnames


def get_nouns():
    with open("resources/nouns.txt") as f:
        nouns = [noun.strip().capitalize() for noun in f.readlines()]

    return nouns


def get_adjectives():
    with open("resources/adjectives.txt") as f:
        adjectives = [adjective.strip().capitalize() for adjective in f.readlines()]

    return adjectives


def get_cities():
    with open("resources/cities.txt") as f:
        cities = [city.strip() for city in f.readlines()]

    return cities


def get_photos():
    with open("resources/photos.txt") as f:
        photos = [photo.strip() for photo in f.readlines()]

    return photos


def get_description(length: int):
    with open("resources/lorem.txt") as f:
        desc = f.read(length)

    return desc
