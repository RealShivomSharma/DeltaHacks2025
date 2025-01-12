# schemas/group.py

from pydantic import BaseModel
from typing import Optional


class GroupCreate(BaseModel):
    group_name: Optional[str] = None
    admin_user_id: Optional[int] = None


class GroupOut(BaseModel):
    group_id: int
    group_name: Optional[str]
    admin_user_id: Optional[int]

    class Config:
        orm_mode = True
