# schemas/house.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class HouseCreate(BaseModel):
    address: Optional[str] = None
    num_rooms: int
    num_bathrooms: Optional[int] = None
    utilities_included: bool = False
    price: float
    internet_included: bool = False
    parking_available: bool = False
    laundry: bool = False
    licensed: bool = False
    available: bool = True
    lease_start: Optional[datetime] = None
    lease_end: Optional[datetime] = None


class HouseOut(BaseModel):
    house_id: int
    address: Optional[str]
    num_rooms: int
    num_bathrooms: Optional[int]
    utilities_included: bool
    price: float
    internet_included: bool
    parking_available: bool
    laundry: bool
    licensed: bool
    available: bool
    lease_start: Optional[datetime]
    lease_end: Optional[datetime]

    class Config:
        orm_mode = True
