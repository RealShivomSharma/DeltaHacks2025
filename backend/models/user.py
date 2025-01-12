# models/user.py

from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=True)
    gender = Column(String(50), nullable=True)
    program = Column(String(100), nullable=True)
    school = Column(String(100), nullable=True)
    bio = Column(Text, nullable=True)

    # A user can have a single "primary_group_id"
    primary_group_id = Column(Integer, ForeignKey("groups.group_id"), nullable=True)

    # Relationship to the group where the user is a member
    primary_group = relationship(
        "Group", foreign_keys=[primary_group_id], back_populates="members"
    )

    # If this user is admin of a group
    # Must specify the foreign key in Group.admin_user_id
    admin_of_group = relationship(
        "Group",
        back_populates="admin_user",
        foreign_keys="Group.admin_user_id",
        uselist=False,
    )
