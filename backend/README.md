# BucksBunny**AI Financial Coach**- Backend

This directory contains the backend server for the project "BucksBunny AI Financial Education Coach, a Python-based application built with FastAPI. It powers "BucksBunny," an AI-powered financial education chatbot designed for teenagers in St. Kitts and Nevis.

## Overview

The backend serves a conversational AI agent that answers questions, creates budgets, and provides financial guidance. It uses a Retrieval-Augmented Generation (RAG) pipeline to deliver contextually relevant information sourced from local documents and financial institution websites.

## Features

- **Modern API Framework**: Built with FastAPI for high performance and automatic API documentation.
- **Conversational AI Agent**: Leverages LangChain for a sophisticated agent capable of reasoning and using tools.
- **LLM Integration**: Powered by OpenAI's GPT-4o model for natural and intelligent conversation.
- **Retrieval-Augmented Generation (RAG)**: Ingests data from CSV files and scraped websites, vectorizes it, and stores it in a MongoDB Atlas Vector Store for fast, relevant context retrieval.
- **Custom Tools**: Equipped with tools for actions like budget creation.
- **Persistent Chat History**: Uses MongoDB to store and retrieve conversation history for stateful user sessions.
- **Scalable Database**: Employs MongoDB for storing user data, budgets, goals, and vector embeddings.

## Tech Stack

- **Framework**: FastAPI
- **Server**: Uvicorn
- **AI/LLM**: LangChain, OpenAI
- **Database**: MongoDB (with Pymongo driver)
- **Vector Store**: MongoDB Atlas Vector Search
- **Data Validation**: Pydantic
- **Environment Management**: python-dotenv

## Setup and Installation

### Prerequisites

- Python 3.9+
- MongoDB Atlas account (free tier with Vector Search enabled is sufficient)
- OpenAI API Key
- ScrapingAnt API Key (for web scraping during data vectorization)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/abigailh123/Yung-money-ai.git
   cd Yung-money-ai/backend
   ```

2. **Create a Virtual Environment**

   It is recommended to use a virtual environment to manage dependencies.

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**

   Copy the example environment file and add your credentials:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your credentials:

   ```
   # .env
   OPENAI_API_KEY="your-openai-api-key"
   MONGO_URI="your-mongodb-atlas-connection-string"
   DB_NAME="your-database-name"  # e.g., "yung_money_ai"
   SCRAPINGANT_API_KEY="your-scrapingant-api-key"
   ```

5. **Populate the Vector Database**

   Run the vectorization script to populate the MongoDB Atlas Vector Store with data from the `/data` directory and scraped websites:

   ```bash
   python src/vectorize.py
   ```

   **Note**: Run this script once to set up the database or when updating the knowledge base.

6. **Run the Server**

   Start the FastAPI application using Uvicorn:

   ```bash
   uvicorn src.main:app --reload
   ```

   The server will be available at `http://127.0.0.1:8000`. Access the interactive API documentation at `http://127.0.0.1:8000/docs`.

## API Endpoints

### POST /chat

Main endpoint to interact with the chatbot.

**Request Body**:

```json
{
  "query": "How can I save money?",
  "session_id": "unique-session-identifier-123"
}
```

**Response**:

```json
{
  "response": "Here are a few tips on how you can save money...",
  "session_id": "unique-session-identifier-123"
}
```

### GET /history

Retrieves conversation history for a given session.

**Query Parameters**:

- `session_id` (string, required): Unique identifier for the session.

**URL**: `http://127.0.0.1:8000/history?session_id=unique-session-identifier-123`

**Response**:

```json
{
  "history": [
    {
      "type": "human",
      "content": "How can I save money?"
    },
    {
      "type": "ai",
      "content": "Here are a few tips on how you can save money..."
    }
  ]
}
```

## Project Structure

```
backend/
├── data/                 # Local CSV files for the knowledge base
├── src/
│   ├── tools/
│   │   ├── budget.py     # Logic for budget creation tool
│   │   └── goals.py      # Placeholder for goal management tools
│   ├── utils/
│   │   ├── csv.py        # CSV loading utilities
│   │   └── db.py         # Database connection and setup
│   ├── main.py           # FastAPI application, API endpoints, and main agent logic
│   └── vectorize.py      # Script to populate the vector database
├── .gitignore
├── requirements.txt      # Python dependencies
└── .env.example          # Template for environment variables
```