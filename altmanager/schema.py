from datetime import datetime
from typing import Optional

from ninja import Schema


class Message(Schema):
    message: str


class Character(Schema):
    character_name: str
    character_id: Optional[int] = None
    corporation_id: Optional[int] = None
    corporation_name: str
    alliance_id: Optional[int] = None
    alliance_name: Optional[str] = None
    main_character_name: Optional[str] = ""
    main_character_id: Optional[int] = None
    main_corporation_id: Optional[int] = None
    main_corporation_name: Optional[str] = ""
    main_alliance_id: Optional[int] = None
    main_alliance_name: Optional[str] = None


class Corporation(Schema):
    corporation_id: Optional[int] = None
    corporation_name: str
    alliance_id: Optional[int] = None
    alliance_name: Optional[str] = None
    member_count: Optional[int] = None
    known_member_count: Optional[int] = None


class Alliance(Schema):
    alliance_id: Optional[int] = None
    alliance_name: Optional[str] = None


class Sanction(Corporation):
    date: Optional[datetime] = None
    approver: Optional[Character] = None
    sanctioner: Optional[Character] = None
    approved: Optional[bool] = False
    sanctioned: Optional[bool] = False
    revoked: Optional[bool] = False
    revoked_text: Optional[str] = None
    revoked_pending: Optional[datetime] = None
