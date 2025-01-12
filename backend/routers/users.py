# routers/users.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models import SessionLocal, User
from schemas.user import UserCreate, UserOut

router = APIRouter(prefix="/users", tags=["users"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=UserOut)
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    new_user = User(
        name=user_data.name,
        age=user_data.age,
        gender=user_data.gender,
        program=user_data.program,
        school=user_data.school,
        bio=user_data.bio,
        primary_group_id=user_data.primary_group_id,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.get("/", response_model=List[UserOut])
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()
