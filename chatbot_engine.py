"""
============================================================
AI Academic Success Companion - Chatbot Module
============================================================

Purpose
-------
This module is the main controller for the AI chatbot.

Responsibilities
----------------
1. Detect the user's intent.
2. Build the appropriate prompt using prompt_builder.py.
3. Send the prompt to the LLM (Llama 3.2 via Ollama).
4. Return a structured, state-aware response.

This module is stateless. User profiles, authentication, databases,
and APIs are handled by other project members.

Author: Member 1 – AI & Chatbot
"""

import re
from typing import Optional, List, Dict

import llm
import prompt_builder


# Intent Detection


INTENT_PATTERNS = {
    "gpa": [
        r"\bgpa\b",
        r"grade point",
        r"improve.*grade",
        r"raise my grade",
        r"academic performance"
    ],

    "study_plan": [
        r"study plan",
        r"revision plan",
        r"study schedule",
        r"prepare for",
        r"plan.*exam",
        r"how should i study"
    ],

    "quiz": [
        r"\bquiz\b",
        r"practice question",
        r"mock exam",
        r"mock test",
        r"test me",
        r"give me questions"
    ],

    "explanation": [
        r"^explain",
        r"define",
        r"what is",
        r"what are",
        r"how does",
        r"can you explain"
    ]
}


def detect_intent(message: str) -> str:
    """
    Detect the user's intent using lightweight rule-based matching.

    Returns:
        gpa
        study_plan
        quiz
        explanation
        general
    """
    text = message.lower()

    for intent, patterns in INTENT_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, text):
                return intent

    return "general"



MAX_TOKENS_BY_INTENT = {
    "general": 180,
    "gpa": 160,
    "explanation": 200,
    "study_plan": 300,
    "quiz": 380,
}


PROMPT_BUILDERS = {
    "gpa": prompt_builder.build_gpa_prompt,
    "study_plan": prompt_builder.build_study_plan_prompt,
    "quiz": prompt_builder.build_quiz_prompt,
    "explanation": prompt_builder.build_explanation_prompt,
}

# Main Chatbot Entry Point

def handle_message(
    user_message: str,
    history: Optional[List[Dict]] = None
) -> Dict:
    """
    Main chatbot entry point.

    Parameters
    ----------
    user_message : str
        Student's question.

    history : list
        Previous conversation turns. Only actually used for the
        "general" intent — specialized prompts (GPA, quiz, etc.) stay
        single-turn and focused for reliability.

    Returns
    -------
    dict
        {
            "intent": "...",
            "response": "...",
            "error": None
        }
    """
    if not user_message.strip():
        return {
            "intent": None,
            "response": "",
            "error": "Message cannot be empty."
        }

    intent = detect_intent(user_message)

    if intent == "general":
        messages = prompt_builder.build_messages(user_message, history)
    else:
        messages = PROMPT_BUILDERS[intent](user_message, history)

    try:
        token_cap = MAX_TOKENS_BY_INTENT.get(intent, 200)
        response = llm.generate_response(messages, max_tokens=token_cap)

        return {
            "intent": intent,
            "response": response,
            "error": None
        }

    except llm.LLMConnectionError as e:
        return {
            "intent": intent,
            "response": "",
            "error": str(e)
        }


# Streaming variant (for web UIs — shows text as it's generated
# instead of waiting for the full reply)


def stream_message(user_message: str, history: Optional[List[Dict]] = None):
    """
    Same behavior as handle_message, but yields events instead of
    returning one dict. Used by app.py's /chat streaming endpoint.

    Yields dicts of one of these shapes:
        {"type": "intent", "intent": "gpa"}
        {"type": "chunk", "text": "..."}          (repeated, in order)
        {"type": "error", "error": "..."}
    """
    if not user_message.strip():
        yield {"type": "error", "error": "Message cannot be empty."}
        return

    intent = detect_intent(user_message)

    yield {"type": "intent", "intent": intent}

    if intent == "general":
        messages = prompt_builder.build_messages(user_message, history)
    else:
        messages = PROMPT_BUILDERS[intent](user_message, history)

    token_cap = MAX_TOKENS_BY_INTENT.get(intent, 200)

    try:
        for chunk in llm.stream_response(messages, max_tokens=token_cap):
            yield {"type": "chunk", "text": chunk}
    except llm.LLMConnectionError as e:
        yield {"type": "error", "error": str(e)}



# CLI Test Loop


if __name__ == "__main__":
    print("=" * 60)
    print("AI Academic Success Companion (Nova)")
    print("Type 'exit' to quit.")
    print("=" * 60)

    history = []

    while True:
        question = input("\nYou: ").strip()

        if question.lower() in ("exit", "quit"):
            print("\nGoodbye!")
            break

        print("\n(thinking... this can take up to a minute on a laptop CPU)")

        result = handle_message(question, history)

        if result["error"]:
            print(f"\nError: {result['error']}")
            continue

        print(f"\nIntent : {result['intent']}")
        print(f"\nAssistant:\n{result['response']}")

        # Append to CLI history so subsequent calls retain context
        history.append({
            "role": "user",
            "content": question
        })
        history.append({
            "role": "assistant",
            "content": result["response"]
        })