from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    Enum,
    JSON,
    Boolean,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from pydantic import BaseModel
import enum

# Database setup
DATABASE_URL = "postgresql://user:password@localhost/housing_tinder"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Enum for swipe status
class SwipeStatus(enum.Enum):
    LIKED = "liked"
    DISLIKED = "disliked"


# Database models
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    preferences = Column(JSON, nullable=True)
    group_id = Column(Integer, ForeignKey("groups.id"))


class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    leader_id = Column(Integer, ForeignKey("users.id"))
    member_ids = Column(JSON, nullable=True)  # List of user IDs


class House(Base):
    __tablename__ = "houses"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, nullable=False)
    size = Column(Integer, nullable=False)  # Number of bedrooms
    price = Column(Float, nullable=False)
    features = Column(JSON, nullable=True)
    landlord_id = Column(Integer, ForeignKey("landlords.id"))


class Swipe(Base):
    __tablename__ = "swipes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    house_id = Column(Integer, ForeignKey("houses.id"))
    status = Column(Enum(SwipeStatus), nullable=False)


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    house_id = Column(Integer, ForeignKey("houses.id"))
    group_id = Column(Integer, ForeignKey("groups.id"))
    status = Column(String, nullable=False)  # Pending/Approved/Rejected


class Landlord(Base):
    __tablename__ = "landlords"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    auto_approval = Column(Boolean, default=False)


# Pydantic models
class UserCreate(BaseModel):
    name: str
    email: str
    preferences: dict


class GroupCreate(BaseModel):
    leader_id: int
    member_ids: list


class HouseCreate(BaseModel):
    location: str
    size: int
    price: float
    features: dict


class SwipeCreate(BaseModel):
    user_id: int
    house_id: int
    status: SwipeStatus


# FastAPI app
app = FastAPI()


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# API endpoints
@app.post("/users/", response_model=dict)
def create_user(user: UserCreate, db: SessionLocal = Depends(get_db)):
    db_user = User(name=user.name, email=user.email, preferences=user.preferences)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"id": db_user.id, "name": db_user.name}


@app.post("/groups/", response_model=dict)
def create_group(group: GroupCreate, db: SessionLocal = Depends(get_db)):
    db_group = Group(leader_id=group.leader_id, member_ids=group.member_ids)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return {"id": db_group.id, "leader_id": db_group.leader_id}


@app.post("/houses/", response_model=dict)
def create_house(house: HouseCreate, db: SessionLocal = Depends(get_db)):
    db_house = House(
        location=house.location,
        size=house.size,
        price=house.price,
        features=house.features,
    )
    db.add(db_house)
    db.commit()
    db.refresh(db_house)
    return {"id": db_house.id, "location": db_house.location}


@app.post("/swipes/", response_model=dict)
def swipe(swipe: SwipeCreate, db: SessionLocal = Depends(get_db)):
    db_swipe = Swipe(
        user_id=swipe.user_id, house_id=swipe.house_id, status=swipe.status
    )
    db.add(db_swipe)
    db.commit()
    db.refresh(db_swipe)
    return {"id": db_swipe.id, "status": db_swipe.status}


@app.post("/upload/user/", response_model=dict)
def upload_user_image(user_id: int, file: UploadFile = File(...)):
    # Simulate saving file (e.g., to S3 or local storage)
    file_location = f"/images/users/{user_id}/{file.filename}"
    return {"user_id": user_id, "file_location": file_location}


@app.post("/upload/house/", response_model=dict)
def upload_house_image(house_id: int, file: UploadFile = File(...)):
    # Simulate saving file
    file_location = f"/images/houses/{house_id}/{file.filename}"
    return {"house_id": house_id, "file_location": file_location}


# Initialize database
Base.metadata.create_all(bind=engine)
