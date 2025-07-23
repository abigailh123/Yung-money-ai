import google.generativeai as genai
import os

# --- Configuration ---
# IMPORTANT: Store your API key as an environment variable for security.
# Do not hardcode it directly in the script.
API_KEY = "AIzaSyCvTqsMsYEQvGQQ3kXisk7dsfIWIsyz72Qho"

# Configure the generative AI model
genai.configure(api_key=API_KEY)

# --- Model and Chat Initialization ---
# Select the model
model = genai.GenerativeModel('gemini-1.5-flash-latest')

# Start a chat session (this allows the bot to remember conversation history)
chat = model.start_chat(history=[])

# --- Main Chat Loop ---
print("🤖 Chatbot Initialized with Gemini 1.5! I'm ready to talk.")
print("Type 'exit' or 'quit' to end the conversation.")

while True:
    # Get user input from the command line
    user_input = input("You: ")

    # Check if the user wants to exit
    if user_input.lower() in ["exit", "quit"]:
        print("Goodbye! 👋")
        break

    # Send the user's message to the model and get the response
    try:
        response = chat.send_message(user_input, stream=True)
        print("Yung Money Ai: ", end="")
        for chunk in response:
            print(chunk.text, end="", flush=True)
        print() # Newline after the full response
    except Exception as e:
        print(f"An error occurred: {e}")
