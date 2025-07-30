{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "2de45e3f",
   "metadata": {
    "vscode": {
     "languageId": "plaintext"
    }
   },
   "outputs": [],
   "source": [
    "import google.generativeai as genai\n",
    "import os\n",
    "from dotenv import load_dotenv\n",
    "\n",
    "load_dotenv()\n",
    "\n",
    "API_KEY = os.getenv(\"GOOGLE_API_KEY\")\n",
    "if not API_KEY:\n",
    "    raise ValueError(\"API key not found. Please set GOOGLE_API_KEY in your .env file.\")\n",
    "\n",
    "genai.configure(api_key=API_KEY)\n",
    "\n",
    "model = genai.GenerativeModel('gemini-1.5-flash-latest')\n",
    "chat = model.start_chat(history=[])\n",
    "\n",
    "print(\"Hi, Im dvn fbv\")\n",
    "print(\"Type 'exit' or 'quit' to end the conversation.\")\n",
    "\n",
    "while True:\n",
    "    user_input = input(\"You: \")\n",
    "\n",
    "    if user_input.lower() in [\"exit\", \"quit\"]:\n",
    "        print(\"Goodbye! 👋\")\n",
    "        break\n",
    "\n",
    "    try:\n",
    "        response = chat.send_message(user_input)\n",
    "        print(f\"Yung Money Ai: {response.text}\")\n",
    "    except Exception as e:\n",
    "        print(f\"An error occurred: {e}\")\n"
   ]
  }
 ],
 "metadata": {
  "language_info": {
   "name": "python"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
