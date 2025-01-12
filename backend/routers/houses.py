# routers/houses.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models import SessionLocal, House
from schemas.house import HouseCreate, HouseOut

router = APIRouter(prefix="/houses", tags=["houses"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=HouseOut)
def create_house(house_data: HouseCreate, db: Session = Depends(get_db)):
    new_house = House(**house_data.dict())
    db.add(new_house)
    db.commit()
    db.refresh(new_house)
    return new_house


@router.get("/", response_model=List[HouseOut])
def list_houses(db: Session = Depends(get_db)):
    return db.query(House).all()
