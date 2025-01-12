# main.py

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Base, engine
from routers import users, groups, houses, swipes

app = FastAPI(title="Housing Tinder Backend (Full Fields)")

# Create tables on startup
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(users.router)
app.include_router(groups.router)
app.include_router(houses.router)
app.include_router(swipes.router)


@app.get("/")
def root():
    return {"message": "Hello from the Housing Tinder (Full Fields)!"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
