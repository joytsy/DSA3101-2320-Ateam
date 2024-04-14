import pandas as pd
from pymongo import MongoClient

client = MongoClient("mongodb://mongo:27017/")
db = client["AteamBank"]
collection = db["customer_details"]

if collection.count_documents({}) == 0:
    df = pd.read_excel("data.xlsx")
    records = df.to_dict(orient='records')
    collection.insert_many(records)