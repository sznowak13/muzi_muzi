import pytest
from record_generators import BaseGenerator, RecordGenerator


def test_base_generator_cannot_be_instantiated():
    with pytest.raises(TypeError):
        BaseGenerator()


def test_record_generator_cannot_be_instantiated():
    with pytest.raises(TypeError):
        RecordGenerator()


def test_base_generator_cannot_be_subclassed_without_setting_class_fields():
    class TestGenerator(BaseGenerator):
        def generate(self):
            yield 1

    with pytest.raises(NotImplementedError):
        TestGenerator()


def test_record_generator_cannot_be_subclassed_without_setting_class_fields():
    class TestGenerator(RecordGenerator):
        base_statement = "INSERT INTO"
        values_statement = "(%S)"

        def generate(self):
            yield 1

    with pytest.raises(NotImplementedError):
        TestGenerator()
