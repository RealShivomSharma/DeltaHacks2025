from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    # Additional user attributes (for roommate profiles)
    age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)
    # Could add city preference, budget, etc.

    # Relationship to swipes (see swipe.py for back_populates)
