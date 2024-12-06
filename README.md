# CEN3031-G6
UF CEN3031 Group 6 Project (FA2024)

Before you run the project, create a .env file inside both the server and client directories and paste in the following code to both files. Make sure to get a database URI from MongoDB's Atlas and get a randomly generated JWT secret.

DATABASE_URI=<your_database_uri_here>

REACT_APP_DEV_API_URL=http://localhost:3500

JWT_SECRET=<your_jwt_secret_here>


To run on a local machine, first run *npm install* inside of the main directory as well as the server and client directories to install the necessary packages. Then, run *npm run dev* inside of the server directory to deploy a local server, and run *npm start* inside of the client directory in a separate terminal.


