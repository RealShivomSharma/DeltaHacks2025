# routers/swipes.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import SessionLocal, User, Group, House, UserLikesHouse, GroupLikesHouse
from schemas.like import UserSwipeHouseInput, GroupSwipeHouseInput

router = APIRouter(prefix="/swipes", tags=["swipes"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/user")
def user_swipe_house(data: UserSwipeHouseInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    house = db.query(House).filter(House.house_id == data.house_id).first()
    if not house:
        raise HTTPException(status_code=404, detail="House not found")

    existing = (
        db.query(UserLikesHouse)
        .filter_by(user_id=data.user_id, house_id=data.house_id)
        .first()
    )
    if existing:
        raise HTTPException(status_code=400, detail="User already liked this house")

    new_like = UserLikesHouse(user_id=data.user_id, house_id=data.house_id)
    db.add(new_like)
    db.commit()
    return {"message": f"User {data.user_id} liked House {data.house_id}"}


@router.post("/group")
def group_swipe_house(data: GroupSwipeHouseInput, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.group_id == data.group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    house = db.query(House).filter(House.house_id == data.house_id).first()
    if not house:
        raise HTTPException(status_code=404, detail="House not found")

    existing = (
        db.query(GroupLikesHouse)
        .filter_by(group_id=data.group_id, house_id=data.house_id)
        .first()
    )
    if existing:
        raise HTTPException(status_code=400, detail="Group already liked this house")

    new_like = GroupLikesHouse(group_id=data.group_id, house_id=data.house_id)
    db.add(new_like)
    db.commit()
    return {"message": f"Group {data.group_id} liked House {data.house_id}"}
