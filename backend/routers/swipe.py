from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from models.swipe import Swipe
from models.user import User
from models.house import House
from .auth import get_current_user

router = APIRouter()


class SwipeRequest(BaseModel):
    target_type: str  # "house" or "user"
    target_id: int
    direction: str  # "left" or "right"


@router.post("/")
def create_swipe(swipe_data: SwipeRequest, token: str, db: Session = Depends(get_db)):
    swiper = get_current_user(token, db)
    # Validate target existence
    if swipe_data.target_type == "user":
        target_user = db.query(User).filter(User.id == swipe_data.target_id).first()
        if not target_user:
            raise HTTPException(status_code=404, detail="Target user not found.")
    elif swipe_data.target_type == "house":
        target_house = db.query(House).filter(House.id == swipe_data.target_id).first()
        if not target_house:
            raise HTTPException(status_code=404, detail="Target house not found.")
    else:
        raise HTTPException(status_code=400, detail="Invalid target_type.")

    new_swipe = Swipe(
        swiper_id=swiper.id,
        target_type=swipe_data.target_type,
        target_id=swipe_data.target_id,
        direction=swipe_data.direction,
    )
    db.add(new_swipe)
    db.commit()
    db.refresh(new_swipe)


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from models.swipe import Swipe
from models.user import User
from models.house import House
from .auth import get_current_user

router = APIRouter()


class SwipeRequest(BaseModel):
    target_type: str  # "house" or "user"
    target_id: int
    direction: str  # "left" or "right"


@router.post("/")
def create_swipe(swipe_data: SwipeRequest, token: str, db: Session = Depends(get_db)):
    swiper = get_current_user(token, db)

    if swipe_data.target_type == "user":
        target_user = db.query(User).filter(User.id == swipe_data.target_id).first()
        if not target_user:
            raise HTTPException(status_code=404, detail="Target user not found.")
    elif swipe_data.target_type == "house":
        target_house = db.query(House).filter(House.id == swipe_data.target_id).first()
        if not target_house:
            raise HTTPException(status_code=404, detail="Target house not found.")
    else:
        raise HTTPException(status_code=400, detail="Invalid target_type.")

    new_swipe = Swipe(
        swiper_id=swiper.id,
        target_type=swipe_data.target_type,
        target_id=swipe_data.target_id,
        direction=swipe_data.direction,
    )
    db.add(new_swipe)
    db.commit()
    db.refresh(new_swipe)

    return {"message": "Swipe recorded", "swipe_id": new_swipe.id}
