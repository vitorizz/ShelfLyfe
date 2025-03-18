import motor.motor_asyncio
from pymongo import WriteConcern
from dotenv import load_dotenv, find_dotenv
import os
import datetime
from collections import defaultdict
from models import Ingredient
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
connection_string = os.environ.get("CONNECTION_STRING")

if not connection_string:
    raise ValueError("No MongoDB connection string provided in the .env file under 'CONNECTION_STRING'.")


client = motor.motor_asyncio.AsyncIOMotorClient(connection_string) 
db = client.shelflyfe
ingredients_collection = db.ingredients.with_options(write_concern=WriteConcern("majority"))

async def shutdown_db_client():
    await ingredients_collection.drop()
    client.close()

async def startup_db_client():
    try:
        await client.admin.command("ping")
        print("Connected to MongoDB")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")

async def add_ingredient_db(ingredient: Ingredient):
    data = ingredient.dict(by_alias=True)
    data["sku"] = ingredient.sku
    await ingredients_collection.insert_one(data)