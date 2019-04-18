def generate_sql_with_params(statement: str, param_generator, gnrt_sources: list):
    if gnrt_sources is None:
        gnrt_sources = []
    sql = []
    query_params = ()
    for param in param_generator(*gnrt_sources):
        sql.append(statement)
        query_params += param
    return "".join(sql), query_params
