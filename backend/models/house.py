# models/house.py

from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime
from .database import Base


class House(Base):
    __tablename__ = "houses"

    house_id = Column(Integer, primary_key=True, index=True)
    address = Column(String(200), nullable=True)

    num_rooms = Column(Integer, nullable=False)
    num_bathrooms = Column(Integer, nullable=True)
    utilities_included = Column(Boolean, default=False)
    price = Column(Float, nullable=False)
    internet_included = Column(Boolean, default=False)
    parking_available = Column(Boolean, default=False)
    laundry = Column(Boolean, default=False)
    licensed = Column(Boolean, default=False)
    available = Column(Boolean, default=True)

    lease_start = Column(DateTime, nullable=True)
    lease_end = Column(DateTime, nullable=True)
