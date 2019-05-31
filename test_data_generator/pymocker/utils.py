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

