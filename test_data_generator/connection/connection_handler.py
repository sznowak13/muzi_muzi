from functools import wraps

import psycopg2

try:
    from connection.dburi import DBURI
except ImportError as e:
    print("No database credentials found! Be sure to create your own DBURI class in connection module.")
    raise e


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
