# DSA3101-2320-Ateam 
## Start up
To get started,

1. Ensure that you have docker installed and have opened up docker

2. Clone this repository

git clone "https://github.com/joytsy/DSA3101-2320-Ateam.git"

3. Build the application Docker Image
```
docker-compose build 
```

4. Run the application
```
docker compose up -d
```

5. You should have 3 containers up and running:

web - This will contain the flask api that connects the database and the react website. (Served on port 5001)
mongo - This will contain the database with the necessary information about the customers. (Served on port 27017)
app - This will be hosting our react frontend website. (Served on port 3000)


Go to http://localhost:3000 and you should be able to see the website



<!-- 3. Try Endpoints
### 1. /test (GET)
Calling this should return you 200 to check if the Flask endpoint is running

### 2. /data (GET)
Calling this should return you the data of the customers -->


