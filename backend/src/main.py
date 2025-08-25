import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnableWithMessageHistory
from langchain_mongodb import MongoDBChatMessageHistory, MongoDBAtlasVectorSearch
from langchain.agents import create_openai_tools_agent, AgentExecutor
from langchain_core.tools import tool
from langchain_core.output_parsers import PydanticOutputParser
from tools.budget import create_budget_tool
from utils.db import embeddings as embeddings_collection

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatOpenAI(model="gpt-4o")

embeddings = OpenAIEmbeddings()

vector_store = MongoDBAtlasVectorSearch(
    embedding=embeddings,
    collection=embeddings_collection,
    index_name="vector_index",
)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
            You are BucksBunny, a specialized AI Financial Education Coach for teenagers in St. Kitts and Nevis created by a group of ECCU Gen AI and Python Summer camp in 4 weeks.

            CORE IDENTITY & PERSONA
            - Your Name: BucksBunny.
            - Your Role: A friendly, cool, and hyper-knowledgeable financial guide. You're like a smart older cousin who knows the ins and outs of money in SKN.
            - Your Audience: Teenagers (13-18) and young adults in St. Kitts and Nevis.
            - Your Mission: Make money topics—budgeting, saving, local banking, innovative career paths—easy to understand, fun, relevant, and stress-free. You must ground all advice in the local context of St. Kitts & Nevis.

            TONE & STYLE
            - Language: Speak like a local. Use natural Caribbean English, and specifically Kittitian/Nevisian dialect and slang
            - Vibe: Always be positive, supportive, and encouraging. Never shame a user for what they don't know.
            - Clarity & Brevity: Your #1 rule is to be CLEAR and QUICK.
                - NO LONG PARAGRAPHS. Break everything down.
                - Use simple words and short sentences.
                - Use Markdown heavily: bullet points (`*`), bold text (`**text**`), and tables are your best friends for making information scannable and easy to digest.
            - Response Structure: Your responses MUST follow a specific two-part structure:
                1.   A concise, scannable answer. Get straight to the point.
                2.  After the answer, ALWAYS ask a question inviting the user to learn more. Use phrases like: "Wanna break that down more?", "Ask me to dive deeper on that!", or "Want me to expand on any of these points?"

            TOOLS
            - Use the retrieve tool to answer a user's query.

            RULES   
            - If the answer is not in the context provided below, explain to the user that you don't know the answer.
            - Never make up information.
            """,
        ),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{query}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ]
)


@tool
def retrieve(query: str) -> str:
    """Retrieve information related to a query."""
    retrieved_docs = vector_store.similarity_search(query, k=2)
    return retrieved_docs


tools = [retrieve, create_budget_tool]

agent = create_openai_tools_agent(
    llm=llm,
    tools=tools,
    prompt=prompt,
)

agent_executor = AgentExecutor.from_agent_and_tools(
    agent=agent,
    tools=tools,
    verbose=True,
)

agent_with_history = RunnableWithMessageHistory(
    agent_executor,
    lambda session_id: MongoDBChatMessageHistory(
        session_id=session_id,
        connection_string=os.getenv("DATABASE_URL"),
        database_name="bucksbunny",
        collection_name="history",
        session_id_key="session_id",
        history_key="history",
    ),
    input_messages_key="query",
    history_messages_key="history",
)


class ChatRequest(BaseModel):
    query: str
    session_id: str | None = None


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/chat")
async def chat(req: ChatRequest):
    session_id = req.session_id or "testing"

    response = agent_with_history.invoke(
        {"query": req.query},
        config={"configurable": {"session_id": session_id}},
    )

    if isinstance(response, dict) and "output" in response:
        return {"output": response["output"], "session_id": session_id}
    if isinstance(response, str):
        return {"output": response, "session_id": session_id}
    return response


@app.get("/history")
async def history(session_id: str):
    history_store = MongoDBChatMessageHistory(
        session_id=session_id,
        connection_string=os.getenv("DATABASE_URL"),
        database_name="bucksbunny",
        collection_name="history",
        session_id_key="session_id",
        history_key="history",
    )
    messages = []
    for idx, m in enumerate(history_store.messages):
        message_type = getattr(m, "type", "human")
        role = "assistant" if message_type in ("ai", "assistant") else "user"
        content = getattr(m, "content", "")
        messages.append({"id": f"{session_id}-{idx}", "role": role, "content": content})
    return {"messages": messages}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=6000)

    while True:
        query = input("Query: ")
        response = agent_with_history.invoke(
            {"query": query},
            config={"configurable": {"session_id": "testing"}},
        )
        print(response["output"])
