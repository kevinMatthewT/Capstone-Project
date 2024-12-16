import requests
import json

#using terminal, type in "python DummyInsert.py" to run this file

POST_GATEWAY="http://localhost:8080/api/post/investment"
JSON_DATA="./DummyData.json"

with open(JSON_DATA, "r") as file:
    data = json.load(file)

try:
    response = requests.post(POST_GATEWAY, json=data, headers={"Content-Type": "application/json"})
    if response.status_code == 201:
        print("Data successfully sent to the API!")
        print(response.json())  
    else:
        print(f"Failed to send data. Status code: {response.status_code}")
        print(response.json())  
except Exception as e:
    print(f"An error occurred: {e}")
