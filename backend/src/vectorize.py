import os
from dotenv import load_dotenv
from langchain_community.document_loaders import CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import MongoDBAtlasVectorSearch
from utils.db import embeddings as embeddings_collection

load_dotenv()

data_folder = "./data"
documents = []

for filename in os.listdir(data_folder):
    if filename.endswith(".csv"):
        loader = CSVLoader(
            file_path=os.path.join(data_folder, filename), encoding="utf-8"
        )
        documents.extend(loader.load())
        print(f"Loaded {filename}")

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
docs = text_splitter.split_documents(documents)

embeddings = OpenAIEmbeddings()

embeddings_collection.delete_many({})

vector_store = MongoDBAtlasVectorSearch.from_documents(
    documents=docs,
    collection=embeddings_collection,
    embedding=embeddings,
    index_name="vector_index",
)

print("Vectorization completed")
