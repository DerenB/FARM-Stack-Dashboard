from models.todo_model import ToDo
from dotenv import load_dotenv
import os

# Load Secret Items
load_dotenv()
connection_string = os.getenv("ConnectionString")

# MongoDB Driver
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)

# Create Database & Collection
database = client.DashboardFARM
collection = database.ToDoItems

# Model Format
# title: str
# desc: str

# Create a new ToDo Item
async def create_todo(todo):
    document = todo
    result = await collection.insert_one(document)
    return document

# Read / Fetch 1 ToDo
async def read_one_todo(title):
    document = await collection.find_one({"title":title})
    return document

# Read / Fetch All ToDos
async def read_all_todos():
    todos = []
    cursor = collection.find({})
    async for document in cursor:
        todos.append(ToDo(**document))
    return todos

# Update a ToDo Item
async def update_todo(title, desc):
    await collection.update_one({"title":title}, {"$set": {"desc": desc}})
    document = await collection.find_one({"title": title})
    return document

# Delete a ToDo Item
async def remove_todo(title):
    await collection.delete_one({"title": title})
    return True