from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.swipe import Swipe
from .auth import get_current_user

router = APIRouter()


@router.get("/user-matches")
def get_user_matches(token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)

    # 1. Find all swipes where user swiped right on another user
    user_right_swipes = (
        db.query(Swipe)
        .filter(
            Swipe.swiper_id == user.id,
            Swipe.target_type == "user",
            Swipe.direction == "right",
        )
        .all()
    )

    matches = []
    for swipe in user_right_swipes:
        # check the reverse swipe
        reverse_swipe = (
            db.query(Swipe)
            .filter(
                Swipe.swiper_id == swipe.target_id,
                Swipe.target_type == "user",
                Swipe.target_id == user.id,
                Swipe.direction == "right",
            )
            .first()
        )
        if reverse_swipe:
            matches.append({"match_type": "user", "user_id": swipe.target_id})

    # 2. For user->house matches:
    #    If there's also a "house->user" right swipe from an "owner" or landlord,
    #    that can form a match. (Simplified logic here.)
    user_right_swipes_on_houses = (
        db.query(Swipe)
        .filter(
            Swipe.swiper_id == user.id,
            Swipe.target_type == "house",
            Swipe.direction == "right",
        )
        .all()
    )

    for swipe in user_right_swipes_on_houses:
        reverse_swipe = (
            db.query(Swipe)
            .filter(
                Swipe.target_type == "user",
                Swipe.direction == "right",
                Swipe.target_id == user.id,
            )
            .first()
        )
        if reverse_swipe:
            matches.append({"match_type": "house", "house_id": swipe.target_id})

    return {"matches": matches}
