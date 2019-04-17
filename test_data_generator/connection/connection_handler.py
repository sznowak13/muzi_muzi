import psycopg2

from functools import wraps
from test_data_generator.connection.dburi import DBURI


def get_connection(db_uri: str):
    try:
        conn = psycopg2.connect(db_uri)
        conn.autocommit = True
        return conn
    except psycopg2.DatabaseError as e:
        print("Cannot connect to database: " + e)


def db_execute(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        conn = get_connection(DBURI.connection_string)
        cur = conn.cursor()
        res = func(cur, *args, **kwargs)
        cur.close()
        conn.close()

        return res

    return wrapper
