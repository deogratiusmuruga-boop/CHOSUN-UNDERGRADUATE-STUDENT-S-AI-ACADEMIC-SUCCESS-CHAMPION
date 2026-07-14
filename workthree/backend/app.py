from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import projects, scholarships

app = FastAPI(title="Academic Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(scholarships.router)

@app.get("/")
def root():
    return {"status": "Backend running successfully!"}
