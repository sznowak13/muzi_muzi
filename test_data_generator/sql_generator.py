def generate_sql_with_params(row_amount: int, statement: str, param_generator):
    sql = []
    query_params = ()
    for param in param_generator(row_amount):
        sql.append(statement)
        query_params += param
    return "".join(sql), query_params
