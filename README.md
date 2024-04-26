# Churnguard - DSA3101-2320-Ateam Predictive Analysis for Customer Churn
## Start up
To get started,

1. Ensure that you have docker installed and have opened up docker

2. Clone the repository from our GitHub page to your local machine. Use the following command in your terminal or command prompt:
```
git clone "https://github.com/joytsy/DSA3101-2320-Ateam.git"
```
3. Create a .env file under the backend folder, and paste the following into the file.
```
API_KEY='sk-NZWJ6aO0D2CAjVkTD9Izib0oPb1CRboWgqe79RX4YVdbwGNg'
GXS_COLLECTION_ID = '2c71d7eb-76ac-46b5-bce3-8ac9a2a5d72a'
GXS_CHAT_ID='92d32aef-4e32-4c50-97d7-a05ac48f6fdd'
RECOMMENDATION_COLLECTION_ID='2e607eaa-ff4d-4af5-be88-db0deb97ddb3'
RECOMMENDATION_CHAT_ID='3259795a-5fb2-4d4b-b080-b07801ae95c7'
CRM_PLAYBOOK_COLLECTION_ID='9bccb439-a618-436e-9957-8ed69da7d689'
CRM_PLAYBOOK_CHAT_ID='973dbc5a-12c8-4b5c-8ec3-1a38382066cf'
````

4. Build the application Docker Image
```
docker-compose build 
```

5. Run the application
```
docker compose up -d
```

6. You should have 3 containers up and running:

    1. web - This will contain the flask api that connects the database and the react website. (Served on port 5001)
    2. mongo - This will contain the database with the necessary information about the customers. (Served on port 27017)
    3. app - This will be hosting our react frontend website. (Served on port 3000)


7. Access our web application on a web browser
```
http://localhost:3000
```
8. Sign up for an account with a unique username and password, then login to Churnguard


<!-- 3. Try Endpoints
### 1. /test (GET)
Calling this should return you 200 to check if the Flask endpoint is running

### 2. /data (GET)
Calling this should return you the data of the customers -->


