from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

mongo = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017/linkhub"))

db = mongo.get_database("linkhub")

