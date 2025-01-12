# schemas/user.py

from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):
    name: str
    age: Optional[int] = None
    gender: Optional[str] = None
    program: Optional[str] = None
    school: Optional[str] = None
    bio: Optional[str] = None
    primary_group_id: Optional[int] = None


class UserOut(BaseModel):
    user_id: int
    name: str
    age: Optional[int]
    gender: Optional[str]
    program: Optional[str]
    school: Optional[str]
    bio: Optional[str]
    primary_group_id: Optional[int]

    class Config:
        orm_mode = True
