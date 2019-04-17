def generate_sql_with_params(row_amount: int, statement: str, param_generator, gnrt_sources):
    sql = []
    query_params = ()
    generator = param_generator(row_amount, gnrt_sources) if gnrt_sources else param_generator(row_amount)
    for param in generator:
        sql.append(statement)
        query_params += param
    return "".join(sql), query_params
