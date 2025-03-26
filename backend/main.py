from bson import ObjectId
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from database import *
from datetime import datetime
from models import (
    Ingredient, IngredientCreate
)
from typing import List

def convert_object_ids(data):
    if isinstance(data, list):
        return [convert_object_ids(item) for item in data]
    elif isinstance(data, dict):
        return {key: convert_object_ids(value) for key, value in data.items()}
    elif isinstance(data, ObjectId):
        return str(data)
    else:
        return data

app = FastAPI()
origins = ['http://localhost:3000', 'http://localhost:8000']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.on_event("startup")
async def startup():
    await startup_db_client()


@app.on_event("shutdown")
async def shutdown():
    await shutdown_db_client()

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
    
@app.get("/get-ingredient")
async def get_ingredient(sku: str):
    try:
        ingredient = await get_ingredient_db(sku)
        return ingredient
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get ingredient: {e}")

@app.get("/get-all-ingredients")
async def get_all_ingredients():
    try:
        ingredients = await get_all_ingredients_db()
        return ingredients
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get all ingredients: {e}")

@app.delete("/delete-ingredient")
async def delete_ingredient(sku: str):
    try:
        await delete_ingredient_db(sku)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to delete ingredient: {e}")

@app.put("/update-ingredient")
async def update_ingredient(ingredient: IngredientCreate):
    try:
        await update_ingredient_db(ingredient.sku, ingredient)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to update ingredient: {e}")
    
@app.post("/add-menu-item")
async def add_menu_item(name: str, ingredients: List[Ingredient], price: float, category: str, description: str, season: str):
    try:
        menu_item = MenuItem(name=name, ingredients=ingredients, price=price, category=category, description=description, season=season)
        await create_menu_item_db(menu_item)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to create menu item: {e}")

@app.get("/get-menu-item")
async def get_menu_item(id: str):
    try:
        menu_item = await get_menu_item_db(id)
        return menu_item
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get menu item: {e}")
    
@ app.get("/get-all-menu-items")
async def get_all_menu_items():
    try:
        menu_items = await menu_items_collection.find().to_list(1000)
        return convert_object_ids(menu_items)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get menu items: {e}")
    
@app.delete("/delete-menu-item")
async def delete_menu_item(id: str):
    try:
        await delete_menu_item_db(id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to delete menu item: {e}")

@app.put("/update-menu-item")
async def update_menu_item(id: str, name: str, ingredients: List[Ingredient], price: float, category: str, description: str, season: str):
    try:
        menu_item = MenuItem(id=id, name=name, ingredients=ingredients, price=price, category=category, description=description, season=season)
        await update_menu_item_db(id, menu_item)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to update menu item: {e}")

@app.get("/get-all-expired-ingredients")
async def get_all_expired_ingredients():
    try:
        ingredients = await get_all_expired_ingredients_db()
        return ingredients
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get all expired ingredients: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)