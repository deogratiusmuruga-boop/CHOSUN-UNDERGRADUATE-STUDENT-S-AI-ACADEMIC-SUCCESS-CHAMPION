dummy_scholarships = [
    {"id": 1, "title": "Tech Future Scholarship", "organization": "Tech Corp", "amount": 2500.0, "deadline": "2026-12-01", "category": "STEM", "eligibility": "GPA > 3.0"},
    {"id": 2, "title": "Global Innovators Grant", "organization": "Innovate Inc", "amount": 5000.0, "deadline": "2026-11-15", "category": "AI", "eligibility": "Undergraduate"}
]

def list_scholarships(db, category=None):
    return dummy_scholarships

def recommend_scholarships(db, user):
    return dummy_scholarships[:1]

def create_scholarship(db, scholarship_data):
    new_s = {"id": len(dummy_scholarships) + 1, **scholarship_data.dict()}
    dummy_scholarships.append(new_s)
    return new_s
