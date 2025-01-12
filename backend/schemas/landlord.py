# schemas/landlord.py

from pydantic import BaseModel
from typing import Optional


class LandlordBase(BaseModel):
    name: str
    email: str
    phone: Optional[str]
    auto_approve: bool


class LandlordCreate(LandlordBase):
    pass


class LandlordOut(LandlordBase):
    landlord_id: int

    class Config:
        orm_mode = True
