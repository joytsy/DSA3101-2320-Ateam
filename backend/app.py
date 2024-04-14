from flask import Flask, request, send_from_directory, jsonify
import pandas as pd
from pymongo import MongoClient, ReturnDocument
import atexit
from bson import ObjectId
import joblib
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
import numpy as np

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

# Deleting record (check if it works)
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
    result = collection.delete_one({'customer_id': id_to_delete})
    # Check if a document was deleted
    if result.deleted_count > 0:
        return jsonify({'message': 'Row successfully deleted'}), 200
    else:
        return jsonify({'error': 'Row not found'}), 404

@app.route('/create-client', methods=['POST'])
def add_client():
    try:
        client_data = request.json

        # Check if the customer_id already exists in the database
        if 'customer_id' in client_data:
            existing_client = collection.find_one({"customer_id": client_data['customer_id']})
            if existing_client:
                return jsonify({'error': 'A client with the given customer_id already exists'}), 400

        # If _id is specified for some reason, ensure it's an ObjectId
        if client_data.get('_id'):
            client_data['_id'] = ObjectId(client_data['_id'])

        result = collection.insert_one(client_data)
        return jsonify({'message': 'Client added successfully', 'id': str(result.inserted_id)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/update-client/<customer_id>', methods=['POST'])
def update_client(customer_id):
    try:
        update_data = request.json
        # Ensure _id and customer_id retains the original values
        update_data.pop('_id', None) 
        update_data.pop('customer_id', None)

        # Find one client matching the customer_id and update it
        result = collection.find_one_and_update(
            {"customer_id": int(customer_id)}, 
            {"$set": update_data},
            return_document=ReturnDocument.AFTER
        )
        if result:
            return jsonify({'message': 'Client updated successfully', 'id': str(result['_id'])}), 200
        else:
            return jsonify({'message': 'Client not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/read-client/<customer_id>', methods=['GET'])
def read_client(customer_id):
    try:
        customer_id = int(customer_id)
    except ValueError:
        return jsonify({'error': 'customer_id must be an integer'}), 400

    # Find the client by customer_id
    client_data = collection.find_one({"customer_id": customer_id}, {"_id": 0}) 

    if client_data:
        return jsonify(client_data), 200
    else:
        return jsonify({'message': 'Client not found'}), 404


model = joblib.load('Gradient Boosting_best_model.pkl')    
preprocessor = joblib.load('preprocessor.pkl')

@app.route('/predict', methods=['POST'])
# Define the features as expected based on your preprocessing code
def predict():   
    try:
        data = request.get_json(force=True)

        required_features = ['Age', 'EmploymentStatus', 'HousingStatus', 'ActiveMember', 'Country',
                             'EstimatedSalary', 'Balance', 'Gender', 'ProductsNumber', 'DebitCard',
                             'SavingsAccount', 'FlexiLoan', 'Tenure', 'DaysSinceLastTransaction',
                             'CustomerEngagementScore', 'TechSupportTicketCount', 'NumberOfAppCrashes',
                             'NavigationDifficulty', 'UserFrustration', 'CustomerSatisfactionSurvey',
                             'CustomerServiceCalls', 'NPS']

        # Check for the existence of all required features
        if not all(feature in data for feature in required_features):
            return jsonify({'error': 'Missing one or more of the required features'}), 400
        
        df = pd.DataFrame([data])
        # Check that all columns are present after creating the DataFrame
        if not all(column in df.columns for column in required_features):
            return jsonify({'error': 'Missing one or more of the required features in DataFrame'}), 400

        # Apply preprocessing
        preprocessed_features = preprocessor.transform(df)
        
        # Predict using the preprocessed features
        prediction = model.predict(preprocessed_features)[0]
        return jsonify({'prediction': prediction})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# for inidividual testing
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)