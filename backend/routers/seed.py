from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from models.house import House
from passlib.context import CryptContext

pwd_context = PassLibContext = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()


@router.post("/")
def seed_data(db: Session = Depends(get_db)):
    existing_users = db.query(User).count()
    existing_houses = db.query(House).count()

    if existing_users > 0 or existing_houses > 0:
        return {"message": "Data already seeded. (Or DB not empty.)"}

    # Create some sample users
    user1 = User(
        username="alice",
        hashed_password=pwd_context.hash("alicepass"),
        age=25,
        gender="Female",
        profile_image_url="https://via.placeholder.com/300/FF0000/FFFFFF?text=Alice",
    )
    user2 = User(
        username="bob",
        hashed_password=pwd_context.hash("bobpass"),
        age=29,
        gender="Male",
        profile_image_url="https://via.placeholder.com/300/00FF00/FFFFFF?text=Bob",
    )
    user3 = User(
        username="charlie",
        hashed_password=pwd_context.hash("charliepass"),
        age=31,
        gender="Male",
        profile_image_url="https://via.placeholder.com/300/0000FF/FFFFFF?text=Charlie",
    )
    db.add_all([user1, user2, user3])
    db.flush()

    # Create some sample houses
    house1 = House(
        address="123 Maple St",
        city="Springfield",
        price=1200.0,
        bedrooms=2,
        bathrooms=1,
        image_url="https://via.placeholder.com/300/FFFF00/000000?text=House+1",
    )
    house2 = House(
        address="456 Elm St",
        city="Shelbyville",
        price=900.0,
        bedrooms=1,
        bathrooms=1,
        image_url="https://via.placeholder.com/300/FF00FF/000000?text=House+2",
    )
    house3 = House(
        address="789 Oak Rd",
        city="Ogdenville",
        price=1500.0,
        bedrooms=3,
        bathrooms=2,
        image_url="https://via.placeholder.com/300/00FFFF/000000?text=House+3",
    )
    db.add_all([house1, house2, house3])
    db.commit()

    return {"message": "Seed data created successfully."}
