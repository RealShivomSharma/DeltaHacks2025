from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from database import Base


class Swipe(Base):
    __tablename__ = "swipes"

    id = Column(Integer, primary_key=True, index=True)
    swiper_id = Column(Integer, ForeignKey("users.id"))
    target_type = Column(String)  # "house" or "user"
    target_id = Column(Integer)  # references house.id or user.id
    direction = Column(String)  # "left" or "right"

    swiper = relationship("User", backref="swipes")
