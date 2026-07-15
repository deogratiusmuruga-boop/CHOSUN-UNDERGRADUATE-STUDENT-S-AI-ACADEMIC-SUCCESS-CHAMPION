import os
import uuid
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure uploads folder exists and serve static files
UPLOAD_DIR = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# In-memory storage for projects
projects_db = [
    {
        "id": 1,
        "title": "SILVER COMPANION",
        "description": "AI-powered companion platform designed to assist and take care of the elderly using speech text.",
        "category": "AI",
        "github_url": "https://github.com/Patiencewantae123/SILVER-COMPANION.git",
        "live_url": "https://senior-care-companion-1053049311878.asia-east1.run.app/",
        "file_path": None
    }
]

# Get all projects (with optional category filter)
@app.get("/projects/")
@app.get("/projects")
def get_projects(category: Optional[str] = None):
    if category:
        return [p for p in projects_db if category.lower() in p["category"].lower()]
    return projects_db

# Get recommended projects
@app.get("/projects/recommend")
def get_recommended_projects():
    return projects_db[:1]

# Upload / Submit new project
@app.post("/projects/upload")
@app.post("/projects/")
async def upload_project(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    github_url: Optional[str] = Form(None),
    live_url: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    saved_file_path = None
    if file and file.filename:
        file_ext = os.path.splitext(file.filename)[1]
        unique_name = f"{uuid.uuid4().hex}{file_ext}"
        saved_file_path = os.path.join(UPLOAD_DIR, unique_name)
        
        with open(saved_file_path, "wb") as f:
            content = await file.read()
            f.write(content)
            
        saved_file_path = f"http://localhost:8000/uploads/{unique_name}"

    new_project = {
        "id": len(projects_db) + 1,
        "title": title,
        "description": description,
        "category": category,
        "github_url": github_url,
        "live_url": live_url,
        "file_path": saved_file_path
    }
    
    # Prepend to display latest submitted work on top
    projects_db.insert(0, new_project)
    return new_project
