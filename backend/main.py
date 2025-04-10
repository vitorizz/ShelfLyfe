from bson import ObjectId
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from database import *
from datetime import datetime, timedelta
from models import Ingredient, IngredientCreate, ResupplyIngredientCreate, MenuItem
from typing import List


"""
Function to convert ObjectId to string
This is necessary for JSON serialization
"""
def convert_object_ids(data):
    if isinstance(data, list):
        return [convert_object_ids(item) for item in data]
    elif isinstance(data, dict):
        return {key: convert_object_ids(value) for key, value in data.items()}
    elif isinstance(data, ObjectId):
        return str(data)
    else:
        return data


"""
FastAPI app setup
"""
app = FastAPI()
origins = ['http://localhost:3000', 'http://localhost:8000']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


"""
Trigger the database client to start and shutdown
This is necessary to connect to the database and insert the data from the data.json file
"""
@app.on_event("startup")
async def startup():
    await startup_db_client()


"""
Shutdown the database client and close the connection
"""
@app.on_event("shutdown")
async def shutdown():
    await shutdown_db_client()


"""
Endpoint to add an ingredient
This endpoint expects a JSON payload with the following structure:
{
    "sku": "string",
    "name": "string",
    "stock": 0,
    "price": 0.0,
    "expiry_date": "YYYY-MM-DD",
    "customUnit": "string",
    "threshold": 0,
    "unit": "string"
}
"""
@app.post("/add-ingredient")
async def add_ingredient(ingredient: IngredientCreate):
    try:
        if await get_ingredient_db(ingredient.sku):
            raise HTTPException(status_code=400, detail="Ingredient already exists")

        ingredientCreate = Ingredient(
            _id=ingredient.sku,
            name=ingredient.name,
            stock=ingredient.stock,
            price=ingredient.price,
            expiry_date=datetime.strptime(ingredient.expiry_date, "%Y-%m-%d"),
            monthIncrease="0%",
            yearIncrease="0%",
            orders=1,
            stock_measurement=ingredient.customUnit if ingredient.customUnit else ingredient.unit,
            warningStockAmount=ingredient.threshold
        )
        await create_ingredient_db(ingredientCreate)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to create ingredient: {e}")


"""
Endpoint to get an ingredient by SKU
This endpoint expects a query parameter "sku" with the SKU of the ingredient
"""
@app.get("/get-ingredient")
async def get_ingredient(sku: str):
    try:
        ingredient = await get_ingredient_db(sku)
        return ingredient
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get ingredient: {e}")


"""
Endpoint to get all ingredients
This endpoint returns all ingredients in the database by calling the get_all_ingredients_db function in database.py
"""
@app.get("/get-all-ingredients")
async def get_all_ingredients():
    try:
        ingredients = await get_all_ingredients_db()
        return ingredients
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get all ingredients: {e}")


"""
Endpoint to delete an ingredient by SKU
This endpoint expects a query parameter "sku" with the SKU of the ingredient
Calls the delete_ingredient_db function in database.py
"""
@app.delete("/delete-ingredient")
async def delete_ingredient(sku: str):
    try:
        await delete_ingredient_db(sku)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to delete ingredient: {e}")


"""
Endpoint to update an ingredient
This endpoint expects a JSON payload with the following structure:
{
    "sku": "string",
    "name": "string",
    "stock": 0,
    "price": 0.0,
    "expiry_date": "YYYY-MM-DD",
    "customUnit": "string",
    "threshold": 0,
    "unit": "string"
}
"""
@app.put("/update-ingredient")
async def update_ingredient(ingredient: IngredientCreate):
    try:
        await update_ingredient_db(ingredient.sku, ingredient)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to update ingredient: {e}")


"""
Endpoint to add a menu item
This endpoint expects a JSON payload with the following structure:
{
    "name": "string",
    "ingredients": [
        {
            "sku": "string",
            "name": "string",
            "stock": 0,
            "price": 0.0,
            "expiry_date": "YYYY-MM-DD",
            "monthIncrease": "0%",
            "yearIncrease": "0%",
            "orders": 1,
            "stock_measurement": "string",
            "warningStockAmount": 0
        }
    ],
    "price": 0.0,
    "category": "string",
    "description": "string",
    "season": "string"
}
"""
@app.post("/add-menu-item")
async def add_menu_item(name: str, ingredients: List[Ingredient], price: float, category: str, description: str, season: str):
    try:
        menu_item = MenuItem(name=name, ingredients=ingredients, price=price, category=category, description=description, season=season)
        await create_menu_item_db(menu_item)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to create menu item: {e}")


"""
Endpoint to get a menu item by ID
This endpoint expects a query parameter "id" with the ID of the menu item
Calls the get_menu_item_db function in database.py
"""
@app.get("/get-menu-item")
async def get_menu_item(id: str):
    try:
        menu_item = await get_menu_item_db(id)
        return menu_item
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get menu item: {e}")


"""
Endpoint to get all menu items
This endpoint returns all menu items in the database by calling the get_all_menu_items_db function in database.py
This endpoint is used to display all menu items in the frontend
"""
@app.get("/get-all-menu-items")
async def get_all_menu_items():
    try:
        menu_items = await menu_items_collection.find().to_list(1000)
        return convert_object_ids(menu_items)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get menu items: {e}")


"""
Endpoint to delete a menu item by ID
This endpoint expects a query parameter "id" with the ID of the menu item
Calls the delete_menu_item_db function in database.py
"""
@app.delete("/delete-menu-item")
async def delete_menu_item(id: str):
    try:
        await delete_menu_item_db(id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to delete menu item: {e}")


"""
Endpoint to update a menu item
This endpoint expects a JSON payload with the following structure:
{
    "name": "string",
    "ingredients": [
        {
            "sku": "string",
            "name": "string",
            "stock": 0,
            "price": 0.0,
            "expiry_date": "YYYY-MM-DD",
            "monthIncrease": "0%",
            "yearIncrease": "0%",
            "orders": 1,
            "stock_measurement": "string",
            "warningStockAmount": 0
        }
    ],
    "price": 0.0,
    "category": "string",
    "description": "string",
    "season": "string"
}
"""
@app.put("/update-menu-item")
async def update_menu_item(id: str, name: str, ingredients: List[Ingredient], price: float, category: str, description: str, season: str):
    try:
        menu_item = MenuItem(id=id, name=name, ingredients=ingredients, price=price, category=category, description=description, season=season)
        await update_menu_item_db(id, menu_item)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to update menu item: {e}")


"""
Endpoint to get all expired ingredients
This endpoint returns all expired ingredients in the database by calling the get_all_expired_ingredients_db function in database.py
This endpoint is used to display all expired ingredients in the frontend
"""
@app.get("/get-all-expired-ingredients")
async def get_all_expired_ingredients():
    try:
        ingredients = await get_all_expired_ingredients_db()
        return ingredients
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get all expired ingredients: {e}")


"""
Endpoint to get all low stock ingredients
This endpoint returns all low stock ingredients in the database by calling the get_low_stock_ingredients_db function in database.py
This endpoint is used to display all low stock ingredients in the frontend
"""
@app.get("/get-expiring-ingredients")
async def get_expiring_ingredients():
    try:
        now = datetime.now()
        three_months_later = now + timedelta(days=90)  # set to 90 for testing
        ingredients = []
        async for ingredient in ingredients_collection.find({
            "expiry_date": {"$gt": now, "$lte": three_months_later}
        }):
            ingredients.append(ingredient)
        return ingredients
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get expiring ingredients: {e}")


"""
Endpoint to get all low stock ingredients
This endpoint returns all low stock ingredients in the database by calling the get_low_stock_ingredients_db function in database.py
This endpoint is used to display all low stock ingredients in the frontend
"""
@app.get("/get-low-stock-ingredients")
async def get_low_stock_ingredients():
    try:
        ingredients = await get_low_stock_ingredients_db()
        return ingredients
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get low stock ingredients: {e}")


"""
Endpoint to get all ingredients from a specific supplier
This endpoint returns all ingredients from a specific supplier in the database by calling the get_ingredients_by_supplier_db function in database.py
"""
@app.post("/resupply-ingredient-add")
async def resupply_ingredient_add(ingredient_list: List[ResupplyIngredientCreate]):
    try:
        for resupply in ingredient_list:
            if resupply.isNewIngredient and not await get_ingredient_db(resupply.sku):
                ingredientCreate = Ingredient(
                    _id=resupply.sku,
                    name=resupply.name,
                    stock=resupply.stock,
                    price=resupply.price,
                    expiry_date=datetime.strptime(resupply.expiryDate, "%Y-%m-%d"),
                    monthIncrease="0%",
                    yearIncrease="0%",
                    orders=1,
                    stock_measurement=resupply.customUnit if resupply.customUnit else resupply.unit,
                    warningStockAmount=resupply.threshold
                )
                await create_ingredient_db(ingredientCreate)
            else:
                ingredient = await get_ingredient_db(resupply.sku)
                if not ingredient:
                    raise HTTPException(status_code=400, detail="Ingredient not found")
                updated_stock = ingredient["stock"] + resupply.stock
                await update_ingredient_db(
                    resupply.sku,
                    IngredientCreate(
                        sku=ingredient["_id"],
                        name=ingredient["name"],
                        stock=updated_stock,
                        price=resupply.price,
                        expiry_date=resupply.expiryDate,
                        customUnit=resupply.customUnit,
                        unit=resupply.unit,
                        threshold=ingredient["warningStockAmount"]
                    )
                )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to resupply ingredient: {e}")


"""
Endpoint to submit orders
Expects a payload with the following structure:
{
    "recipe_id_1": { "name": "Bruschetta", "count": 4 },
    "recipe_id_2": { "name": "Pasta", "count": 2 },
    ...
}
For each ordered recipe, this endpoint retrieves the recipe details from the menu_items_collection,
multiplies each ingredient's "amount" (units needed per order) by the order count, then subtracts that
total from the corresponding ingredient's stock in the inventory.
"""
@app.post("/submit-orders")
async def submit_orders(order_counts: dict):
    try:
        total_usage = {}
        # For each ordered recipe, calculate total ingredient usage
        for recipe_id, order in order_counts.items():
            count = order.get("count", 0)
            if count <= 0:
                continue
            # Retrieve the recipe details from the menu_items_collection
            recipe = await get_menu_item_db(recipe_id)
            if not recipe:
                continue
            # Assume recipe["ingredients"] is a list of dicts with at least "name" and "amount" keys
            for ingredient in recipe.get("ingredients", []):
                ing_name = ingredient.get("name")
                usage_per_order = ingredient.get("amount", 0)
                total = usage_per_order * count
                if ing_name in total_usage:
                    total_usage[ing_name] += total
                else:
                    total_usage[ing_name] = total

        # Update each ingredient's inventory stock
        for ing_name, used_amount in total_usage.items():
            inventory_ing = await ingredients_collection.find_one({"name": ing_name})
            if inventory_ing:
                new_stock = inventory_ing["stock"] - used_amount
                if new_stock < 0:
                    new_stock = 0
                await ingredients_collection.update_one(
                    {"_id": inventory_ing["_id"]},
                    {"$set": {"stock": new_stock}}
                )
        return {"status": "success", "updated": total_usage}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to submit orders: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
