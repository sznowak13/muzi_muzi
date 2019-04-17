from test_data_generator.connection.connection_handler import db_execute


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


@db_execute
def get_all_bands_ids(cursor):
    cursor.execute("SELECT band_id from band;")
    return cursor.fetchall()


@db_execute
def get_all_users_ids(cursor):
    cursor.execute("SELECT user_id from users;")
    return cursor.fetchall()
