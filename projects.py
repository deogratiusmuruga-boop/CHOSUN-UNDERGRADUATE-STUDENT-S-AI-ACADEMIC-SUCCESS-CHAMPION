"""
==========================================
Student Project Recommendation Module
학생 프로젝트 추천
==========================================
"""

projects = [

    {
        "title": "AI Chatbot",
        "category": "Artificial Intelligence",
        "difficulty": "Intermediate"
    },

    {
        "title": "Library Management System",
        "category": "Software Engineering",
        "difficulty": "Beginner"
    },

    {
        "title": "Hospital Management System",
        "category": "Web Development",
        "difficulty": "Intermediate"
    },

    {
        "title": "Face Recognition Attendance",
        "category": "Machine Learning",
        "difficulty": "Advanced"
    },

    {
        "title": "Student Result System",
        "category": "Database",
        "difficulty": "Beginner"
    },

    {
        "title": "Smart Agriculture IoT",
        "category": "Internet of Things",
        "difficulty": "Advanced"
    }

]


def recommend_projects(level):

    """
    English:
        Return projects according to difficulty.

    한국어:
        난이도에 맞는 프로젝트를 추천합니다.
    """

    return [
        project
        for project in projects
        if project["difficulty"].lower() == level.lower()
    ]


if __name__ == "__main__":

    data = recommend_projects("Beginner")

    for project in data:
        print(project)