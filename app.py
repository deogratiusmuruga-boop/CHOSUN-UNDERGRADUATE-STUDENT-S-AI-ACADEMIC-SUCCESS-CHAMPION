from fastapi import FastAPI

from database import engine
from models import Base

from routers import (
    users,
    chatbot,
    resources,
    materials,
    pastpapers,
    scholarships,
    projects,
    upload,
)

# --------------------------------------------------
# Create Database Tables
# --------------------------------------------------
Base.metadata.create_all(bind=engine)

# --------------------------------------------------
# Create FastAPI App
# --------------------------------------------------
app = FastAPI(
    title="Academic Success Companion API",
    description="Backend API for the AI Academic Success Companion System",
    version="1.0.0"
)

# --------------------------------------------------
# Register Routers
# --------------------------------------------------
app.include_router(users.router)
app.include_router(chatbot.router)
app.include_router(resources.router)
app.include_router(materials.router)
app.include_router(pastpapers.router)
app.include_router(scholarships.router)
app.include_router(projects.router)
app.include_router(upload.router)

# --------------------------------------------------
# Root Endpoint
# --------------------------------------------------
@app.get("/", tags=["Home"])
def home():
    return {
        "status": "running",
        "project": "AI Academic Success Companion",
        "version": "1.0.0",
        "message": "Welcome to the Academic Success Companion Backend API"
    }