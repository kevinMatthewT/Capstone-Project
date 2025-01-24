# Capstone-Project
Dependencies:

Client side:

Firebase || 
Axios || 
@mui
@emotion ||
@nivo ||
@testing-library ||
Date-fns ||
React ||
React-dom ||
React-router-dom ||
React-firebase-hooks ||
React-toastify ||
React-scripts ||
Bootstrap ||
Boxicons

Server side:

Dotenv ||
Mongoose ||
Cors ||
express ||

Pip modules:

requests ||
json ||
pandas ||
Prophet ||
matplotlib

Things to note:

-Both the application and the database is localhost and not published 

-Authentication uses firebase which the key is not available in the repository and can be placed in the client directory using a .env file

-Access to the people able to access the database is only allowed by giving access directly through firebase

-Pip modules may not be downloaded when running the app, if not in the terminal run the command ”pip install -r pip_requirements.txt”

How to run:
Create a docker container that has the port to mongo db install it
Go to the server using “cd server” and use “npm i” to install dependencies
Then use “npm run dev” to start the server 
In another terminal Go to the client using “cd client” and use “npm i” to install dependencies
Then use “npm start” to start the client

User interface and user manual:

