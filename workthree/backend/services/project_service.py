dummy_projects = [
    {"id": 1, "title": "AI Resume Parser", "description": "Extracts skills from PDF resumes.", "category": "AI", "github_url": "https://github.com", "owner_id": 1, "file_path": None},
    {"id": 2, "title": "Portfolio Web App", "description": "React & FastAPI portfolio template.", "category": "Web", "github_url": "https://github.com", "owner_id": 1, "file_path": None}
]

def list_projects(db, category=None):
    if category:
        return [p for p in dummy_projects if category.lower() in p["category"].lower()]
    return dummy_projects

def recommend_projects(db, user):
    return dummy_projects[:1]

def create_project_with_file(db, project_data, user_id):
    new_proj = {"id": len(dummy_projects) + 1, "owner_id": user_id, **project_data}
    dummy_projects.append(new_proj)
    return new_proj
