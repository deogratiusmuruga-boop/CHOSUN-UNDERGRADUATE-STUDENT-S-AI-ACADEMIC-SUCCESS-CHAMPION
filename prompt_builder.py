# MEMBER 1 - AI & Chatbot
# This file builds the actual text prompt sent to the LLM for each
# feature. Keeping prompt-writing separate from the API/DB logic
# makes it easy to tune prompts without touching other files.


def build_chat_prompt(message: str) -> str:
    return f"You are a helpful academic assistant. Student says: {message}"


def build_study_plan_prompt(subject: str, goal: str, time_available: str) -> str:
    return (
        f"Create a study plan for the subject '{subject}'. "
        f"The student's goal is: {goal}. "
        f"They have {time_available} available. "
        f"Give a clear, structured plan."
    )


def build_gpa_tips_prompt(current_gpa: float, target_gpa: float, subjects: list) -> str:
    subjects_str = ", ".join(subjects)
    return (
        f"A student has a current GPA of {current_gpa} and wants to reach "
        f"{target_gpa}. Their subjects are: {subjects_str}. "
        f"Give specific, actionable tips to improve their GPA."
    )


def build_quiz_prompt(topic: str, num_questions: int) -> str:
    return (
        f"Generate {num_questions} quiz questions about '{topic}' "
        f"suitable for an undergraduate student."
    )


def build_explanation_prompt(topic: str) -> str:
    return f"Explain the concept of '{topic}' clearly, as if to a university student."