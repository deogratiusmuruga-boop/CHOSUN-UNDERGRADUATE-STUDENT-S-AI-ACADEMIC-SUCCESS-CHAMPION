# MEMBER 1 - AI & Chatbot
# This file is where the actual connection to Llama 3.1 lives.
# Everything else (chatbot_service.py) calls the function below —
# they don't need to know HOW the model is called, just that
# generate_response(prompt) returns a string.

def generate_response(prompt: str) -> str:
    """
    MEMBER 1: replace this with a real call to Llama 3.1
    (e.g. via Ollama, Hugging Face, Groq, or a hosted API).

    Example using a local Ollama server:

    import requests

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3.1",
            "prompt": prompt,
            "stream": False
        }
    )
    return response.json()["response"]
    """

    # Placeholder so the rest of the app keeps working until this is done
    return f"(placeholder LLM response) Based on: {prompt[:100]}..."