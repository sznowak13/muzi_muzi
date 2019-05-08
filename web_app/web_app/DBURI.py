from os import environ


class DBURI:
    username = environ.get("PSQL_USER_NAME")
    password = environ.get("PSQL_PASSWORD")
    host = environ.get("PSQL_HOST")
    db_name = environ.get("MUZI_MUZI_DB")
