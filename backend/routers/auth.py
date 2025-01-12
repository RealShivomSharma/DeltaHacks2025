from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt, JWTError
from pydantic import BaseModel
from database import get_db
from models.user import User

SECRET_KEY = "SOME_LONG_RANDOM_SECRET"
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()


class UserCreate(BaseModel):
    username: str
    password: str
    age: int | None = None
    gender: str | None = None
    profile_image_url: str | None = None


def get_password_hash(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


@router.post("/register")
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user_data.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken.")

    new_user = User(
        username=user_data.username,
        hashed_password=get_password_hash(user_data.password),
        age=user_data.age,
        gender=user_data.gender,
        profile_image_url=user_data.profile_image_url,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully", "user_id": new_user.id}


class UserLogin(BaseModel):
    username: str
    password: str


@router.post("/login")
def login_user(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == login_data.username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials.")

    token_data = {"sub": user.username, "user_id": user.id}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer", "user_id": user.id}


def get_current_user(token: str, db: Session):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        user_id: int = payload.get("user_id")
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user


@router.get("/me")
def read_current_user(token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    return {
        "user_id": user.id,
        "username": user.username,
        "age": user.age,
        "gender": user.gender,
        "profile_image_url": user.profile_image_url,
    }
