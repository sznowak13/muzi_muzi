import test_data_generator.data_generator as generator
import test_data_generator.db_manager as db_manager
import test_data_generator.sql_generator as sql_gen


tables = ["users", "band", "band_user"]


def main():
    print("Welcome to test data mocker for muzi_muzi database!")

    users_to_generate = int(input("Input number of users to generate: "))
    bands_to_generate = int(input("Input number of bands to generate (Approx. half the users is best): "))

    populate_cities(50)
    populate_users(users_to_generate)
    populate_bands(bands_to_generate)
    assign_users_to_bands()


def populate_users(row_number):
    statement = ("INSERT INTO users (first_name, last_name, nickname, email, password, city_id, description) "
                 "VALUES (%s, %s, %s, %s, %s, %s, %s);")
    populate_table("users", row_number, statement, generator.user_data_generator)


def populate_bands(row_number):
    statement = ("INSERT INTO band (name, city_id, year_founded, homepage, description) "
                 "VALUES (%s, %s, %s, %s, %s);")
    populate_table("band", row_number, statement, generator.band_data_generator)


def populate_cities(row_number):
    statement = ("INSERT INTO city (name) "
                 "VALUES (%s);")
    populate_table("city", row_number, statement, generator.city_data_generator)


def assign_users_to_bands():
    statement = "INSERT INTO user_band VALUES (%s, %s);"
    bands_ids = db_manager.get_all_bands_ids()
    users_ids = db_manager.get_all_users_ids()
    populate_table("user_band", bands_ids, statement, generator.band_user_tuple_generator, gnrt_sources=[users_ids])


def populate_table(table_name, row_number, statement: str, param_gnrt, to_clear: bool = True, gnrt_sources: list = None):
    print(f"-- Populating {table_name} --")
    if to_clear:
        print(f"Clearing the data from {table_name}...")
        db_manager.clear_table(table_name)

    print("Preparing sql...")
    sql, params = sql_gen.generate_sql_with_params(row_number, statement, param_gnrt, gnrt_sources)
    print("Executing inserts...")
    db_manager.execute_with_params(sql, params)


if __name__ == '__main__':
    table_function_map = {
        tables[0]: populate_users,
        tables[1]: populate_bands,
        tables[2]: assign_users_to_bands
    }
    main()
