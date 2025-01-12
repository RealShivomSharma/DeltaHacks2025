# models/group.py

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class Group(Base):
    __tablename__ = "groups"

    group_id = Column(Integer, primary_key=True, index=True)
    group_name = Column(String(100), nullable=True)

    # The user who is admin
    admin_user_id = Column(Integer, ForeignKey("users.user_id"), nullable=True)

    admin_user = relationship(
        "User", back_populates="admin_of_group", foreign_keys=[admin_user_id]
    )

    # Relationship to all users who consider this group their "primary_group"
    members = relationship(
        "User", back_populates="primary_group", foreign_keys="[User.primary_group_id]"
    )
