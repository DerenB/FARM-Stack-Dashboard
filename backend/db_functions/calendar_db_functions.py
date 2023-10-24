from models.calendar_model import CalendarItem
from dotenv import load_dotenv
import os

# id: int
# subject: str
# location: str
# starttime: str
# endtime: str
# categorycolor: str

# Load Secret Items
load_dotenv()
connection_string = os.getenv("ConnectionString")

# MongoDB Driver
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)

# Create Database & Collection
database = client.DashboardFARM
collection = database.CalendarItems

# Create a Calendar item
async def create_calendar_item(item):
    document = item
    result = await collection.insert_one(document)
    return document

# Read 1 Calendar item
async def read_one_calendar_item(id):
    document = await collection.find_one({"id":id})
    return document

# Read All Calendar items
async def read_all_calendar_items():
    calendar_items = []
    cursor = collection.find({})
    async for document in cursor:
        calendar_items.append(CalendarItem(**document))
    return calendar_items

# Update a Calendar item
async def update_calendar_item(id, subject, location, starttime, endtime, categorycolor):
    await collection.update_one(
        {"id":id},
        {"set": {"subject": subject}},
        {"set": {"location": location}},
        {"set": {"starttime": starttime}},
        {"set": {"endtime": endtime}},
        {"set": {"categorycolor": categorycolor}}
    )
    document = await collection.find_one({"id": id})
    return document

# Delete a Calendar item
async def remove_calendar_item(id):
    await collection.delete_one({"id": id})
    return True