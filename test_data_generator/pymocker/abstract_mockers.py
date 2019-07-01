from abc import ABC, abstractmethod
from .common_providers import provide_random_ids


class BaseMocker(ABC):
    base_statement = ""
    values_statement = ""
    _non_blank_fields = ('base_statement', 'values_statement')
    returning = False
    returning_column = ""

    def __init__(self, **sources):
        self._check_implementation()
        self.generator_sources = sources

    @abstractmethod
    def generate(self):
        pass

    def _check_implementation(self):
        fields = [getattr(self, name) for name in self._non_blank_fields]
        if not all(fields):
            raise NotImplementedError("Not all class variables are provided")


class RecordMocker(BaseMocker, ABC):
    table_name = ""
    fields = ()
    _non_blank_fields = BaseMocker._non_blank_fields + ('table_name',)

    def __init__(self, **sources):
        fields_repr = ", ".join([f'"{field}"' for field in self.fields])
        self.base_statement = self.base_statement or f"INSERT INTO {self.table_name} ({fields_repr}) VALUES "
        self.values_statement = self.values_statement or '(' + ','.join(['%s' for _ in self.fields]) + ')'
        super(RecordMocker, self).__init__(**sources)
        self.returning = False if not self.returning_column else True


class LinkRelationRecordMocker(RecordMocker):
    first_table = ''
    second_table = ''
    first_column = ''
    second_column = ''
    max_relations = 0
    _non_blank_fields = RecordMocker._non_blank_fields + ('first_table', 'second_table', 'max_relations')

    def __init__(self, **sources):
        self.first_column = self.first_column or self.first_table + '_id'
        self.second_column = self.second_column or self.second_table + '_id'
        self.table_name = self.table_name or self.first_table + '_' + self.second_table
        self.fields = (f'{self.first_column}', f'{self.second_column}')
        super(LinkRelationRecordMocker, self).__init__(**sources)

    def generate(self):
        first_fields = self.generator_sources[self.first_column + 's']
        second_fields = self.generator_sources[self.second_column + 's']
        for first_field in first_fields:
            for second_field in provide_random_ids(second_fields, max_num=self.max_relations):
                yield first_field, second_field

