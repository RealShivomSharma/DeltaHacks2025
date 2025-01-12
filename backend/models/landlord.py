# models/landlord.py

from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from .database import Base


class Landlord(Base):
    __tablename__ = "landlords"

    landlord_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100))
    phone = Column(String(50), nullable=True)
    auto_approve = Column(Boolean, default=False)

    # Relationship to Houses (one-to-many)
    houses = relationship("House", back_populates="landlord")
