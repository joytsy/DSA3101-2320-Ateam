from flask import Flask, request, send_from_directory, jsonify
import pandas as pd
from pymongo import MongoClient
import atexit

app = Flask(__name__, static_folder='frontend')

# MongoDB client setup
client = MongoClient("mongodb://mongo:27017/")
db = client["AteamBank"]
collection = db["customer_details"]

def cleanup():
    collection.delete_many({})

atexit.register(cleanup)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# initialize the database
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400
    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400
    if file and file.filename.endswith('.xlsx'):
        df = pd.read_excel(file)
        # Convert DataFrame to dict and insert into MongoDB
        records = df.to_dict(orient='records')
        collection.insert_many(records)
        return "File successfully uploaded and data inserted into MongoDB", 200
    else:
        return "Invalid file format. Only CSV files are allowed.", 400

# Get all data from MongoDB
@app.route('/data', methods=['GET'])
def get_data():
    records = collection.find({})
    data_list = list(records)
    for record in data_list:
        record['_id'] = str(record['_id'])
    return jsonify(data_list)

# Test if api is working 
@app.route('/test', methods=['GET'])
def test():
    return "Good", 200

if __name__ == '__main__':
    app.run(debug=True)
