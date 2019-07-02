from .utils import time_it
from . import db_handlers
from . import sql_generator as sql_gen
from .abstract_mockers import RecordMocker


@time_it
def populate_table(table_name, statement: str, param_gnrt, clear: bool = True, gnrt_sources: list = None):
    print(f"-- Populating {table_name} --")
    if clear:
        print(f"Clearing the data from {table_name}...")
        db_handlers.clear_table(table_name)

    print("Preparing sql...")
    sql, params = sql_gen.generate_sql_with_params(statement, param_gnrt, gnrt_sources)
    print("Executing inserts...")
    returning_values = db_handlers.execute_with_params(sql, params)
    return [value[0] for value in returning_values] if returning_values else None


@time_it
def populate_table_with_generator(record_generator: RecordMocker, clear=False):
    print(f"-- Populating {record_generator.table_name} --")
    if clear:
        print(f"Clearing the data from {record_generator.table_name}...")
        db_handlers.clear_table(record_generator.table_name)

    print("Preparing sql...")
    sql, params, added = sql_gen.generate_sql_from_generator(record_generator)
    print("Executing inserts...")
    returning_values = db_handlers.execute_with_params(sql, params)
    print(f"Added {added} records")
    return [value[0] for value in returning_values] if returning_values else None
