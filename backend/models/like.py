# models/like.py

from sqlalchemy import Column, Integer, ForeignKey, DateTime
from datetime import datetime
from .database import Base


class UserLikesHouse(Base):
    __tablename__ = "user_likes_house"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    house_id = Column(Integer, ForeignKey("houses.house_id"))
    liked_at = Column(DateTime, default=datetime.utcnow)


class GroupLikesHouse(Base):
    __tablename__ = "group_likes_house"

    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("groups.group_id"))
    house_id = Column(Integer, ForeignKey("houses.house_id"))
    liked_at = Column(DateTime, default=datetime.utcnow)
