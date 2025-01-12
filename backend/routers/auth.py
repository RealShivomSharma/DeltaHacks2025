# routers/auth.py

from fastapi import APIRouter, Depends

# from passlib.hash import bcrypt  # if you want password hashing
# from sqlalchemy.orm import Session
# from models.database import SessionLocal
# from schemas.user import UserCreate, UserOut
# from models.user import User

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
def register():
    # Example stub - implement actual logic
    return {"message": "Register endpoint stub"}


@router.post("/login")
def login():
    # Example stub - implement actual logic
    return {"message": "Login endpoint stub"}
