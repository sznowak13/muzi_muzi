import pytest
from record_generators import BaseGenerator


def test_base_generator_cannot_be_instantiated():
    with pytest.raises(TypeError):
        BaseGenerator()
