import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise ValueError("API key not found. Please set GOOGLE_API_KEY in your .env file.")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash-latest')
chat = model.start_chat(history=[])

print("🤖 Chatbot Initialized with Gemini 1.5! I'm ready to talk.")
print("Type 'exit' or 'quit' to end the conversation.")

while True:
    user_input = input("You: ")

    if user_input.lower() in ["exit", "quit"]:
        print("Goodbye! 👋")
        break

    try:
        response = chat.send_message(user_input)
        print(f"Yung Money Ai: {response.text}")
    except Exception as e:
        print(f"An error occurred: {e}")
