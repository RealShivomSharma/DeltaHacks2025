# routers/groups.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models import SessionLocal, Group, User
from schemas.group import GroupCreate, GroupOut

router = APIRouter(prefix="/groups", tags=["groups"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=GroupOut)
def create_group(group_data: GroupCreate, db: Session = Depends(get_db)):
    if group_data.admin_user_id:
        admin_user = (
            db.query(User).filter(User.user_id == group_data.admin_user_id).first()
        )
        if not admin_user:
            raise HTTPException(status_code=404, detail="Admin user does not exist")

    new_group = Group(
        group_name=group_data.group_name, admin_user_id=group_data.admin_user_id
    )
    db.add(new_group)
    db.commit()
    db.refresh(new_group)
    return new_group


@router.get("/", response_model=List[GroupOut])
def list_groups(db: Session = Depends(get_db)):
    return db.query(Group).all()


@router.post("/{group_id}/add_user/{user_id}")
def add_user_to_group(group_id: int, user_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.group_id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.primary_group_id and user.primary_group_id != group_id:
        raise HTTPException(status_code=400, detail="User is already in another group")

    user.primary_group_id = group_id
    db.commit()
    return {"message": f"User {user_id} is now in group {group_id}"}


@router.post("/{group_id}/remove_user/{user_id}")
def remove_user_from_group(group_id: int, user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.primary_group_id != group_id:
        raise HTTPException(status_code=400, detail="User not in this group")

    user.primary_group_id = None
    db.commit()
    return {"message": f"User {user_id} removed from group {group_id}"}
