from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from database import Base, engine
from routers import auth, swipe, match, seed

app = FastAPI(title="Housing Tinder")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],  # e.g. ["GET", "POST"] to restrict
    allow_headers=["*"],  # e.g. ["Content-Type", "Authorization"] to restrict
)

# Create tables at startup
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(swipe.router, prefix="/swipe", tags=["swipe"])
app.include_router(match.router, prefix="/match", tags=["match"])
app.include_router(seed.router, prefix="/seed", tags=["seed"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
