from record_generators import BaseGenerator


def generate_sql_with_params(statement: str, param_generator, gnrt_sources: list):
    if gnrt_sources is None:
        gnrt_sources = []
    lost_count = 0
    sql = []
    query_params = ()
    params_list = []
    for param in param_generator(*gnrt_sources):
        sql.append(statement)
        if params_list.count(param) < 1:
            params_list.append(param)
        else:
            lost_count += 1
            sql.remove(statement)
    for param in params_list:
        query_params += param
    print(f"Lost {lost_count} records")
    return "".join(sql), query_params


def generate_sql_from_generator(generator: BaseGenerator):
    lost_count = 0
    sql = []
    query_params = ()
    params_list = []
    sql.append(generator.base_statement)
    values_params = []
    for param in generator.generate():
        values_params.append(generator.values_statement)
        if params_list.count(param) < 1:
            params_list.append(param)
        else:
            lost_count += 1
            values_params.remove(generator.values_statement)
    sql.append(", ".join(values_params))
    for param in params_list:
        query_params += param
    sql_tail = f" RETURNING {generator.returning_column};" if generator.returning else ";"
    sql.append(sql_tail)
    print(f"Lost {lost_count} records")
    return "".join(sql), query_params
