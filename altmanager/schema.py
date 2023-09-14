from __future__ import division

from datetime import datetime
from typing import Dict, List, Optional
from xmlrpc.client import Boolean, boolean

from ninja import Schema


class Message(Schema):
    message: str


class Character(Schema):
    character_name: str
    character_id: int
    corporation_id: int
    corporation_name: str
    alliance_id: Optional[int]
    alliance_name: Optional[str]


class Corporation(Schema):
    corporation_id: int
    corporation_name: str
    alliance_id: Optional[int]
    alliance_name: Optional[str]
