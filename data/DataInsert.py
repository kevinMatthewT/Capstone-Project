import requests
import json

#using terminal, type in "python DummyInsert.py" to run this file

POST_GATEWAY="http://localhost:8080/api/post/investment/many"
JSON_DATA="./DummyData.json"

with open(JSON_DATA, "r") as file:
    data = json.load(file)

chunk_size = 100  # Adjust as needed
for i in range(0, len(data), chunk_size):
    chunk = data[i:i + chunk_size]
    response = requests.post(POST_GATEWAY, json=chunk)
    if response.status_code != 200:
        print(f"Failed to send chunk {i // chunk_size + 1}")

# try:
#     response = requests.post(POST_GATEWAY, json=data, headers={"Content-Type": "application/json"})
#     if response.status_code == 201 or response.status_code==200:
#         print("Data successfully sent to the API!")
#         print(response.json())  
#     else:
#         print(f"Failed to send data. Status code: {response.status_code}")
#         print(response.json())  
# except Exception as e:
#     print(f"An error occurred: {e}")
