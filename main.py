import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = "AIzaSyCvTqsMsYEQvGQQ3kXisk7dsfIWIsyz72Q"

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
        response = chat.send_message(user_input, stream=True)
        print("Yung Money Ai: ", end="")
        for chunk in response:
            print(chunk.text, end="", flush=True)
        
    except Exception as e:
        print(f"An error occurred: {e}")
