# models/booking.py

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base


class BookingRequest(Base):
    __tablename__ = "booking_requests"

    booking_id = Column(Integer, primary_key=True, index=True)
    house_id = Column(Integer, ForeignKey("houses.house_id"))
    initiator_type = Column(String(50))  # "group" or "user"
    initiator_id = Column(Integer)  # group_id or user_id
    status = Column(String(50), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

    # House relationship (optional)
    # house = relationship("House", back_populates="booking_requests")
