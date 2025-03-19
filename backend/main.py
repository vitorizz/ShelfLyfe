from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from database import *
from models import (
    Ingredient
)
from typing import List

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
async def add_ingredient(sku: str, name: str, quantity:int):
    try:
        ingredient = Ingredient(sku=sku, name=name, quantity=quantity)
        await create_ingredient_db(ingredient)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to create ingredient: {e}")
    
@app.get("/get-ingredient")
async def get_ingredient(sku: str):
    try:
        ingredient = await get_ingredient_db(sku)
        return ingredient
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get ingredient: {e}")

@app.delete("/delete-ingredient")
async def delete_ingredient(sku: str):
    try:
        await delete_ingredient_db(sku)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to delete ingredient: {e}")

@app.put("/update-ingredient")
async def update_ingredient(sku: str, name: str, quantity:int):
    try:
        ingredient = Ingredient(sku=sku, name=name, quantity=quantity)
        await update_ingredient_db(sku, ingredient)
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)