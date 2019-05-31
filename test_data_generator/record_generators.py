from data_generator import generate_user_data


class BaseGenerator:
    table_name = ""
    base_statement = ""
    values_statement = ""
    returning_value = ""

    def __init__(self, **sources):
        self.generator_sources = sources
        self.returning = False if not self.returning_value else True

    def get_generator_sources(self):
        if not self.generator_sources:
            raise NotImplemented("You must assign generator sources")
        return self.generator_sources

    def generate(self):
        raise NotImplemented("Generate method not implemented")

    def _check_implementation(self):
        if not all([self.table_name, self.base_statement, self.values_statement]):
            raise NotImplemented("Class variables are not provided")


class UserGenerator(BaseGenerator):
    table_name = "users"
    base_statement = ("INSERT INTO users (first_name, last_name, username, "
                      "email, password, city_id, description, is_superuser, is_staff, is_active, date_joined) "
                      "VALUES ")
    values_statement = "(%s, %s, %s, %s, %s, %s, %s, FALSE, FALSE, TRUE, %s)"
    returning_value = "user_id"

    def generate(self):
        amount = self.generator_sources['amount']
        cities_ids = self.generator_sources['cities_ids']
        for _ in range(amount):
            yield generate_user_data(cities_ids)
