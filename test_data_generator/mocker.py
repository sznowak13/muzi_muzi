import data_generator as generator
import db_manager
import sql_generator as sql_gen


def main():
    print("Welcome to test data mocker for muzi_muzi database!")

    users_to_generate = int(input("Input number of users to generate: "))
    bands_to_generate = int(input("Input number of bands to generate (Approx. half the users is best): "))

    populate_cities(50)
    profession_ids = db_manager.get_all_professions_ids()
    cities_ids = db_manager.get_all_cities_ids()
    populate_users(users_to_generate, cities_ids)
    users_ids = db_manager.get_all_users_ids()
    genres_ids = db_manager.get_all_genres_ids()
    assign_genres_to_users(users_ids, genres_ids)
    assign_profession_to_users(users_ids, profession_ids)
    populate_bands(bands_to_generate, cities_ids)
    bands_ids = db_manager.get_all_bands_ids()
    assign_genres_to_bands(bands_ids, genres_ids)
    assign_users_to_bands(bands_ids, users_ids)


def populate_users(row_number, cities_ids):
    statement = ("INSERT INTO users (first_name, last_name, username, email, password, city_id, description, is_superuser, is_staff, is_active, date_joined) "
                 "VALUES (%s, %s, %s, %s, %s, %s, %s, FALSE, FALSE, TRUE, %s);")
    populate_table("users", statement, generator.user_data_generator, gnrt_sources=[row_number, cities_ids])


def populate_bands(row_number, cities_ids):
    statement = ("INSERT INTO band (name, city_id, year_founded, homepage, description) "
                 "VALUES (%s, %s, %s, %s, %s);")
    
    populate_table("band", statement, generator.band_data_generator, gnrt_sources=[row_number, cities_ids])


def populate_cities(row_number):
    statement = ("INSERT INTO city (name) "
                 "VALUES (%s);")
    populate_table("city", statement, generator.city_data_generator, gnrt_sources=[row_number])


def assign_users_to_bands(bands_ids, users_ids):
    statement = "INSERT INTO user_band VALUES (%s, %s);"
    populate_table("user_band", statement, generator.band_user_tuple_generator, gnrt_sources=[bands_ids, users_ids])


def assign_genres_to_users(users_ids, genres_ids):
    statement = "INSERT INTO user_genre VALUES (%s, %s);"
    populate_table("user_genre", statement, generator.user_genre_data_generator, gnrt_sources=[users_ids, genres_ids])


def assign_genres_to_bands(bands_ids, genres_ids):
    statement = "INSERT INTO band_genre VALUES (%s, %s);"
    populate_table("band_genre", statement, generator.band_genre_data_generator, gnrt_sources=[bands_ids, genres_ids])


def assign_profession_to_users(users_ids, prof_ids):
    statement = "INSERT INTO user_profession VALUES (%s, %s);"
    populate_table("user_profession", statement, generator.user_prof_data_generator, gnrt_sources=[users_ids, prof_ids])


def populate_table(table_name, statement: str, param_gnrt, clear: bool = True, gnrt_sources: list = None):
    print(f"-- Populating {table_name} --")
    if clear:
        print(f"Clearing the data from {table_name}...")
        db_manager.clear_table(table_name)

    print("Preparing sql...")
    sql, params = sql_gen.generate_sql_with_params(statement, param_gnrt, gnrt_sources)
    print("Executing inserts...")
    db_manager.execute_with_params(sql, params)


if __name__ == '__main__':
    main()
