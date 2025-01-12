# routers/bookings.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from models.database import SessionLocal
from models.booking import BookingRequest
from schemas.booking import BookingCreate, BookingOut

router = APIRouter(prefix="/bookings", tags=["bookings"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=BookingOut)
def create_booking(booking_data: BookingCreate, db: Session = Depends(get_db)):
    booking = BookingRequest(**booking_data.dict())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


@router.get("/", response_model=List[BookingOut])
def list_bookings(db: Session = Depends(get_db)):
    bookings = db.query(BookingRequest).all()
    return bookings
