from flask import Flask, request, send_from_directory, jsonify
import pandas as pd
from pymongo import MongoClient, ReturnDocument
import atexit
from bson import ObjectId
import bcrypt

app = Flask(__name__, static_folder='frontend')

# MongoDB client setup
client = MongoClient("mongodb://mongo:27017/")
db = client["AteamBank"]
collection = db["customer_details"]

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')


# initialize the database
@app.route('/upload-all', methods=['POST'])
def upload_file():
    file = request.files['file']
    print(file)
    if file.filename == '':
        return "No selected file", 400
    if file and file.filename.endswith('.xlsx'):
        df = pd.read_excel(file)
        # Convert DataFrame to dict and insert into MongoDB
        records = df.to_dict(orient='records')
        collection.insert_many(records)
        return "File successfully uploaded and data inserted into MongoDB", 200
    else:
        return "Invalid file format. Only .xlsx files are allowed.", 400

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

@app.route('/delete-all', methods=['DELETE'])
def delete_database():
    # Iterate through all collections in the database and drop each
    collection_names = db.list_collection_names()
    for collection_name in collection_names:
        db[collection_name].drop()
    return "Database successfully deleted", 200

# Deleting record
@app.route('/delete-client', methods=['DELETE'])
def delete_row():
    if not request.json or 'id' not in request.json:
        return jsonify({'error': 'Missing id in request'}), 400
    # Extract the ID from the request and convert it to ObjectId
    try:
        id_to_delete = (request.json['id'])
    except:
        return jsonify({'error': 'Invalid ID format'}), 400
    # Perform the deletion
    result = collection.delete_one({'CustomerID': id_to_delete})
    # Check if a document was deleted
    if result.deleted_count > 0:
        return jsonify({'message': 'Row successfully deleted'}), 200
    else:
        return jsonify({'error': 'Row not found'}), 404

@app.route('/create-client', methods=['POST'])
def add_client():
    try:
        client_data = request.json

        # Check if the CustomerID already exists in the database
        if 'CustomerID' in client_data:
            existing_client = collection.find_one({"CustomerID": client_data['CustomerID']})
            if existing_client:
                return jsonify({'error': 'A client with the given CustomerID already exists'}), 400

        # If _id is specified for some reason, ensure it's an ObjectId
        if client_data.get('_id'):
            client_data['_id'] = ObjectId(client_data['_id'])

        result = collection.insert_one(client_data)
        return jsonify({'message': 'Client added successfully', 'id': str(result.inserted_id)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/update-client/<CustomerID>', methods=['POST'])
def update_client(CustomerID):
    try:
        update_data = request.json
        # Ensure _id and customer_id retains the original values
        update_data.pop('_id', None) 
        update_data.pop('CustomerID', None)

        # Find one client matching the customer_id and update it
        result = collection.find_one_and_update(
            {"CustomerID": int(CustomerID)}, 
            {"$set": update_data},
            return_document=ReturnDocument.AFTER
        )
        if result:
            return jsonify({'message': 'Client updated successfully', 'id': str(result['_id'])}), 200
        else:
            return jsonify({'message': 'Client not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/read-client/<CustomerID>', methods=['GET'])
def read_client(CustomerID):
    try:
        CustomerID = int(CustomerID)
    except ValueError:
        return jsonify({'error': 'CustomerID must be an integer'}), 400

    # Find the client by CustomerID
    client_data = collection.find_one({"CustomerID": CustomerID}, {"_id": 0}) 

    if client_data:
        return jsonify(client_data), 200
    else:
        return jsonify({'message': 'Client not found'}), 404
    

@app.route('/login', methods=['POST'])
def login_user():
    try:
        user_data = request.json
        if not user_data or 'username' not in user_data or 'password' not in user_data:
            return jsonify({'error': 'Missing username or password'}), 400

        username = user_data['username']
        password = user_data['password'].encode('utf-8')

        # Retrieve user from database
        user = collection.find_one({"username": username})
        if not user:
            return jsonify({'error': 'Invalid username or password'}), 401
        
        # Verify the password
        if bcrypt.checkpw(password, user['password'].encode('utf-8')):
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401

    except Exception as e:
        return jsonify({'error': 'Server error'}), 500


# for inidividual testing
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)