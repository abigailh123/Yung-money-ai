import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["bucksbunny"]

users = db["users"]
budgets = db["budgets"]
goals = db["goals"]
embeddings = db["embeddings"]