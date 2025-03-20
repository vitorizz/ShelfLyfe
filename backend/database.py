import motor.motor_asyncio
from pymongo import WriteConcern
from dotenv import load_dotenv, find_dotenv
import os
import datetime
import json
from collections import defaultdict
from models import Ingredient, MenuItem
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
connection_string = os.environ.get("CONNECTION_STRING")

if not connection_string:
    raise ValueError("No MongoDB connection string provided in the .env file under 'CONNECTION_STRING'.")


client = motor.motor_asyncio.AsyncIOMotorClient(connection_string) 
db = client.shelflyfe
ingredients_collection = db.ingredients.with_options(write_concern=WriteConcern("majority"))
menu_items_collection = db.menu_items.with_options(write_concern=WriteConcern("majority"))

async def shutdown_db_client():
    try:
        await ingredients_collection.drop()
        client.close()
    except Exception as e:
        raise e
    
async def startup_db_client():
    try:
        await client.admin.command("ping")
        print("Connected to MongoDB")

        try:
            with open('data.json', 'r') as file:
                data = json.load(file)

            ingredients_count = await ingredients_collection.count_documents({})
            menu_items_count = await menu_items_collection.count_documents({})
            
            if ingredients_count == 0 and menu_items_count == 0:

                await ingredients_collection.insert_many(data["ingredients"])
                print(f"Data successfully loaded into MongoDB collection '{ingredients_collection.name}'")

            else:
                print(f"Collection '{ingredients_collection.name}' already contains data. Skipping import.")
                
        except Exception as e:
            print(f"Error loading data into MongoDB: {str(e)}")
        
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")

async def create_ingredient_db(ingredient: Ingredient):
    try:
        data = ingredient.dict(by_alias=True)
        data["sku"] = ingredient.sku
        await ingredients_collection.insert_one(data)
    except Exception as e:
        raise e
    
async def get_ingredient_db(sku: str):
    try:
        ingredient = await ingredients_collection.find_one({"_id": sku})
        return ingredient
    except Exception as e:
        raise e
    
async def delete_ingredient_db(sku: str):
    try:
        await ingredients_collection.delete_one({"_id": sku})
    except Exception as e:
        raise e
    
async def update_ingredient_db(sku: str, ingredient: Ingredient):
    try:
        await ingredients_collection.replace_one({"_id":sku}, ingredient.dict(by_alias=True))
    except Exception as e:
        raise e
    
async def create_menu_item_db(menu_item: MenuItem):
    try:
        data = menu_item.dict(by_alias=True)
        await menu_items_collection.insert_one(data)
    except Exception as e:
        raise e
    
async def get_menu_item_db(id: str):
    try:
        menu_item = await menu_items_collection.find_one({"_id": id})
        return menu_item
    except Exception as e:
        raise e

async def delete_menu_item_db(id: str):
    try:
        await menu_items_collection.delete_one({"_id": id})
    except Exception as e:
        raise e

async def update_menu_item_db(id: str, menu_item: MenuItem):
    try:
        await menu_items_collection.replace_one({"_id":id}, menu_item.dict(by_alias=True))
    except Exception as e:
        raise e
    
async def get_all_ingredients_db():
    try:
        ingredients = []
        async for ingredient in ingredients_collection.find():
            ingredients.append(ingredient)
        return ingredients
    except Exception as e:
        raise e
    