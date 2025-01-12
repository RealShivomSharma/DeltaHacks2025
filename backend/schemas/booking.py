# schemas/booking.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class BookingBase(BaseModel):
    house_id: int
    initiator_type: str
    initiator_id: int
    status: Optional[str] = "pending"


class BookingCreate(BookingBase):
    pass


class BookingOut(BookingBase):
    booking_id: int
    created_at: datetime

    class Config:
        orm_mode = True
