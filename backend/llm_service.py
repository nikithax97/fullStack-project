# backend/llm_service.py
import os
from openai import OpenAI
from dotenv import load_dotenv

# Load .env from the backend folder
load_dotenv()

def get_llm_response(user_message: str) -> str:
    """
    Calls the LLM and returns the assistant's reply as text.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        # This is the most common cause of "Internal Server Error"
        raise RuntimeError("OPENAI_API_KEY is not set in backend/.env")

    client = OpenAI(api_key=api_key)

    completion = client.chat.completions.create(
        model="gpt-4.1-mini",  # or any model you have access to
        messages=[
            {"role": "system", "content": "You are a helpful assistant for a task manager app."},
            {"role": "user", "content": user_message},
        ],
    )

    return completion.choices[0].message.content
