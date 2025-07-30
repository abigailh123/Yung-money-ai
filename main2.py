import openai
import os
import json 
import requests
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")

def ask_openai(prompt):
    if not openai.api_key:
        raise ValueError("API key not found. Please set OPENAI_API_KEY in your environment variables.")
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error communicating with OpenAI: {e}"         