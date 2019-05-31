from connection.connection_handler import db_execute


@db_execute
def get_role_ids(cursor):
    cursor.execute("SELECT role_id FROM role;")
    return cursor.fetchall()


@db_execute
def clear_table(cursor, table_name: str):
    cursor.execute(f"TRUNCATE TABLE {table_name} RESTART IDENTITY CASCADE;")


@db_execute
def execute_with_params(cursor, sql: str, parameters: tuple):
    cursor.execute(sql, parameters)
    #  Checking if cursor has something to fetch
    res = cursor.fetchall() if cursor.description else None
    return res


@db_execute
def get_all_bands_ids(cursor):
    cursor.execute("SELECT band_id from band;")
    return cursor.fetchall()


@db_execute
def get_all_users_ids(cursor):
    cursor.execute("SELECT user_id from users;")
    return cursor.fetchall()


@db_execute
def get_city_name_by_id(cursor, city_id):
    cursor.execute("SELECT name FROM city where city_id = %s", (city_id,))
    return cursor.fetchone()[0]


@db_execute
def get_all_cities_ids(cursor):
    cursor.execute("SELECT city_id from city;")
    return cursor.fetchall()


@db_execute
def get_all_genres_ids(cursor):
    cursor.execute("SELECT genre_id from genre;")
    return cursor.fetchall()


@db_execute
def get_all_professions_ids(cursor):
    cursor.execute("SELECT prof_id FROM profession;")
    return cursor.fetchall()


@db_execute
def get_genre_by_band_id(cursor, band_id):
    cursor.execute(("select g.genre_id, g.name "
                    "from band b "
                    "join band_genre bg on b.band_id = bg.band_id "
                    "join genre g on bg.genre_id = g.genre_id "
                    "where b.band_id = %s;"), (band_id,))
    return cursor.fetchone()


@db_execute
def get_genre_by_user_id(cursor, user_id):
    cursor.execute(("select g.genre_id, g.name "
                    "from users u "
                    "join users_genres ug on u.user_id = ug.users_id "
                    "join genre g on ug.genre_id = g.genre_id "
                    "where u.user_id = %s;"), (user_id,))
    return cursor.fetchone()


@db_execute
def get_band_by_user_id(cursor, user_id):
    cursor.execute(("select b.band_id, b.name "
                    "from users u "
                    "join user_band ub on ub.users_id = u.user_id "
                    "join band b on ub.band_id = b.band_id "
                    "where u.user_id = %s;"), (user_id,))
    result = cursor.fetchone()
    return result if result else (None, None)


@db_execute
def get_profession_name_by_id(cursor, prof_id):
    cursor.execute("SELECT name from profession where prof_id = %s;", (prof_id,))
    return cursor.fetchone()[0]


@db_execute
def get_profession_by_user_id(cursor, user_id):
    cursor.execute("SELECT p.prof_id, p.name from profession p "
                   "join users_professions up on p.prof_id = up.profession_id "
                   "join users u on up.users_id = u.user_id "
                   "where u.user_id = %s;", (user_id,))
    return cursor.fetchone()


@db_execute
def get_username_by_id(cursor, user_id):
    cursor.execute("select u.username from users u where user_id = %s", (user_id,))
    return cursor.fetchone()[0]


if __name__ == '__main__':
    print(get_band_by_user_id(2))
