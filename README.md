# Shelflife

## Installation and running the backend
1. Clone the repository
2. Cd into the **backend** directory
3. Install **pipenv** if not already installed 
```
pip install pipenv
```
4. Download all dependencies by executing the following command in the terminal
```
pipenv install
```
5. Activate the virtual environment with the following command
```
pipenv shell
```
6. Copy the .env file into the **backend** directory
7. Start the project by executing the following command
```
uvicorn main:app --reload
```
8. Visit the website and the backend methods by going to 
```
http://127.0.0.1:8000/docs
```
## Running the frontend
1. cd into the **frontend** directory
2. Download the frontend packages by executing the following command in the terminal
```
npm install
```
3. Start the frontend by executing the following command
```
npm start
```
4. Visit the website by going to 
```
http://localhost:3000/
```