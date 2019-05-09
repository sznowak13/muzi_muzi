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
