import motor.motor_asyncio
from pymongo import WriteConcern
from dotenv import load_dotenv, find_dotenv
import os
from datetime import datetime, timedelta
import json
from collections import defaultdict
from models import Ingredient, MenuItem, IngredientCreate
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

"""
Connection string should be obtained from MongoDB Atlas.
It should have the following format: mongodb+srv://username:ztrqDH3qimHJx7mZ@shelflyfe.xg1k2.mongodb.net/?retryWrites=true&w=majority&appName=Shelflyfe
"""
connection_string = os.environ.get("CONNECTION_STRING")

if not connection_string:
    raise ValueError("No MongoDB connection string provided in the .env file under 'CONNECTION_STRING'.")


"""
Connect to MongoDb Atlas and create the ingredients and menu collections
"""
client = motor.motor_asyncio.AsyncIOMotorClient(connection_string) 
db = client.shelflyfe
ingredients_collection = db.ingredients.with_options(write_concern=WriteConcern("majority"))
menu_items_collection = db.menu_items.with_options(write_concern=WriteConcern("majority"))


"""
Function that gets called when the server/API shuts down.
It drops the ingredients and menu items collections and closes the MongoDB client connection.
"""
async def shutdown_db_client():
    try:
        await ingredients_collection.drop()
        await menu_items_collection.drop()
        client.close()
    except Exception as e:
        raise e
    

"""
Function that gets called when the server/API starts up.
Populates the collections with the data from the data.json file.
"""
async def startup_db_client():
    try:
        await client.admin.command("ping")
        print("Connected to MongoDB")

        try:
            with open('data.json', 'r') as file:
                data = json.load(file)

            #* Check if the collections are empty before inserting data
            ingredients_count = await ingredients_collection.count_documents({})
            menu_items_count = await menu_items_collection.count_documents({})
            
            if ingredients_count == 0 and menu_items_count == 0:
                ingredients_data = data["ingredients"]

                for ingredient in ingredients_data:
                    if "expiry_date" in ingredient and isinstance(ingredient["expiry_date"], str):
                        try:
                            ingredient["expiry_date"] = datetime.strptime(
                                ingredient["expiry_date"], "%Y-%m-%d"
                            )
                        except ValueError:
                            print(f"Warning: Invalid date format for ingredient {ingredient.get('name', 'unknown')}: {ingredient['expiry_date']}")
                            ingredient["expiry_date"] = datetime.now()

                await ingredients_collection.insert_many(ingredients_data)
                print(f"Data successfully loaded into MongoDB collection '{ingredients_collection.name}'")

            recipes_data = []
            for category, recipes in data.get("recipes", {}).items():
                for recipe in recipes:
                    recipe["category"] = category
                    recipes_data.append(recipe)
            
            if recipes_data:
                await menu_items_collection.insert_many(recipes_data)
                print(f"Data successfully loaded into MongoDB collection '{menu_items_collection.name}'")

            else:
                print(f"Collection '{ingredients_collection.name}' already contains data. Skipping import.")
                
        except Exception as e:
            print(f"Error loading data into MongoDB: {str(e)}")
        
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")


"""
Function to create a new ingredient in the database.
It takes an Ingredient Pydantic model object as input and inserts it into the ingredients collection.
"""
async def create_ingredient_db(ingredient: Ingredient):
    try:
        data = ingredient.dict(by_alias=True)
        data["sku"] = ingredient.sku
        await ingredients_collection.insert_one(data)
    except Exception as e:
        raise e


"""
Function to get an ingredient from the database by its SKU.
It takes the SKU as input and returns the ingredient python dictionary.
"""
async def get_ingredient_db(sku: str):
    try:
        ingredient = await ingredients_collection.find_one({"_id": sku})
        return ingredient
    except Exception as e:
        raise e


"""
Function to delete an ingredient from the database by its SKU.
It takes the SKU as input and deletes the ingredient from the ingredients collection.
"""
async def delete_ingredient_db(sku: str):
    try:
        await ingredients_collection.delete_one({"_id": sku})
    except Exception as e:
        raise e


"""
Function to update an ingredient in the database by its SKU.
It takes the SKU and an IngredientCreate Pydantic model object as input and updates the ingredient in the ingredients collection.
"""
async def update_ingredient_db(sku: str, ingredient: IngredientCreate):
    try:
        prevIngredient = await get_ingredient_db(sku)
        ingredientCreate = Ingredient(
            _id=sku,
            name=ingredient.name,
            stock=ingredient.stock,
            price=ingredient.price,
            expiry_date=datetime.strptime(ingredient.expiry_date, "%Y-%m-%d"),  
            monthIncrease=prevIngredient["monthIncrease"],
            yearIncrease=prevIngredient["yearIncrease"], 
            orders=prevIngredient["orders"] + 1,
            stock_measurement=ingredient.customUnit if ingredient.customUnit else ingredient.unit,
            warningStockAmount=ingredient.threshold
        )
        data = ingredientCreate.dict(by_alias=True)
        data["sku"] = ingredientCreate.sku
        await ingredients_collection.replace_one({"_id":sku}, data)
    except Exception as e:
        raise e


"""
Function to create a new menu item in the database given a MenuItem Pydantic model object.
It takes the MenuItem object as input and inserts it into the menu_items collection.
"""
async def create_menu_item_db(menu_item: MenuItem):
    try:
        data = menu_item.dict(by_alias=True)
        await menu_items_collection.insert_one(data)
    except Exception as e:
        raise e
    

"""
Function to get a menu item from the database by its ID.
It takes the ID as input and returns the menu item python dictionary.
"""
async def get_menu_item_db(id: str):
    try:
        menu_item = await menu_items_collection.find_one({"_id": id})
        return menu_item
    except Exception as e:
        raise e
    

"""
Function to get all menu items from the database.
It returns a list of all menu items in the menu_items collection.
"""    
async def get_all_menu_items_db():
    try:
        menu_items = []
        async for menu_item in menu_items_collection.find():
            menu_items.append(menu_item)
        return menu_items
    except Exception as e:
        raise e


"""
Function to delete a menu item from the database by its ID.
It takes the ID as input and deletes the menu item from the menu_items collection.
"""
async def delete_menu_item_db(id: str):
    try:
        await menu_items_collection.delete_one({"_id": id})
    except Exception as e:
        raise e


"""
Function to update a menu item in the database by its ID.
It takes the ID and a MenuItem Pydantic model object as input and updates the menu item in the menu_items collection.
It uses the replace_one method to replace the entire document with the new data.
"""
async def update_menu_item_db(id: str, menu_item: MenuItem):
    try:
        await menu_items_collection.replace_one({"_id":id}, menu_item.dict(by_alias=True))
    except Exception as e:
        raise e


"""
Function to get all ingredients from the database.
It returns a list of all ingredients in the ingredients collection.
"""
async def get_all_ingredients_db():
    try:
        ingredients = []
        async for ingredient in ingredients_collection.find():
            ingredients.append(ingredient)
        return ingredients
    except Exception as e:
        raise e


"""
Function to get all expired ingredients from the database.
It returns a list of all ingredients in the ingredients collection that have an expiry date less than the current date.
"""
async def get_all_expired_ingredients_db():
    try:
        ingredients = []
        async for ingredient in ingredients_collection.find({"expiry_date": {"$lt": datetime.datetime.now()}}):
            ingredients.append(ingredient)
        return ingredients
    except Exception as e:
        raise e


"""
Function to get all ingredients that are expiring soon from the database.
It returns a list of all ingredients in the ingredients collection that have an expiry date within the next 3 days.
It uses the datetime module to get the current date and time and adds 3 days to it.
It then queries the ingredients collection for ingredients with an expiry date between now and soon.
It returns a list of ingredients that are expiring soon.
"""
async def get_expiring_ingredients_db():
    try:
        ingredients = []
        now = datetime.now()
        soon = now + timedelta(days=3)  # Adjust the number of days as needed
        async for ingredient in ingredients_collection.find({
            "expiry_date": {"$gte": now, "$lte": soon}
        }):
            ingredients.append(ingredient)
        return ingredients
    except Exception as e:
        raise e


"""
Function to get all ingredients that are low in stock from the database.
It returns a list of all ingredients in the ingredients collection that have a stock amount less than the warningStockAmount.
"""
async def get_low_stock_ingredients_db():
    try:
        ingredients = []
        async for ingredient in ingredients_collection.find({
            "$expr": {"$lt": ["$stock", "$warningStockAmount"]}
        }):
            ingredients.append(ingredient)
        return ingredients
    except Exception as e:
        raise e