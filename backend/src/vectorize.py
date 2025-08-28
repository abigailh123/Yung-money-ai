import os
from dotenv import load_dotenv
from langchain_community.document_loaders import CSVLoader, ScrapingAntLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import MongoDBAtlasVectorSearch
from utils.db import embeddings as embeddings_collection

load_dotenv()

data_folder = "./data"
documents = []

# Load CSV files
for filename in os.listdir(data_folder):
    if filename.endswith(".csv"):
        csv_loader = CSVLoader(
            file_path=os.path.join(data_folder, filename), encoding="utf-8"
        )
        documents.extend(csv_loader.load())
        print(f"Loaded {filename}")

# Scrape the websites
scrapingant_loader = ScrapingAntLoader(
    [
        "https://www.eccb-centralbank.org/",
        "https://www.sknanb.com/",
        "https://www.thebankofnevis.com/",
        "https://www.republicbankstkitts.com/",
        "https://skccu.com/",
        "https://firstfederalcreditunion.com/",
        "https://aspire.gov.kn/",
        "https://www.cibccaribbean.com/"
    ],
    api_key=os.getenv("SCRAPINGANT_API_KEY"),
    continue_on_failure=True,
)

documents.extend(scrapingant_loader.load())

print(f"Loaded scraped websites")

# Split the text into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
docs = text_splitter.split_documents(documents)

# Create OpenAI embedding
embeddings = OpenAIEmbeddings()

# Delete the current data in the database to prevent duplicates
embeddings_collection.delete_many({})

# Store the data to MongoDB
vector_store = MongoDBAtlasVectorSearch.from_documents(
    documents=docs,
    collection=embeddings_collection,
    embedding=embeddings,
    index_name="vector_index",
)

print("Vectorization completed")
