from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from routers import projects, scholarships

app = FastAPI(title="Chosun Undergraduate Portal API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure uploads directory exists and mount it for direct file access
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(projects.router, prefix="/projects", tags=["projects"])
app.include_router(scholarships.router, prefix="/scholarships", tags=["scholarships"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Chosun Undergraduate Portal API"}
