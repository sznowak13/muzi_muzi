from .db_connection import db_execute


@db_execute
def clear_table(cursor, table_name: str):
    cursor.execute(f"TRUNCATE TABLE {table_name} RESTART IDENTITY CASCADE;")


@db_execute
def execute_with_params(cursor, sql: str, parameters: tuple):
    cursor.execute(sql, parameters)
    #  Checking if cursor has something to fetch
    res = cursor.fetchall() if cursor.description else None
    return res
