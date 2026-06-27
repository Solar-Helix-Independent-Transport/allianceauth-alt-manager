from django.core.exceptions import ValidationError
from django.test import TestCase

from altmanager.validators import valid_json


class ValidJsonTest(TestCase):
    def test_valid_object_passes(self):
        valid_json('{"key": "value"}')

    def test_valid_array_passes(self):
        valid_json('[1, 2, 3]')

    def test_empty_object_passes(self):
        valid_json('{}')

    def test_invalid_string_raises(self):
        with self.assertRaises(ValidationError):
            valid_json('not json')

    def test_incomplete_json_raises(self):
        with self.assertRaises(ValidationError):
            valid_json('{"key": }')
