# schemas/like.py

from pydantic import BaseModel


class UserSwipeHouseInput(BaseModel):
    user_id: int
    house_id: int


class GroupSwipeHouseInput(BaseModel):
    group_id: int
    house_id: int
