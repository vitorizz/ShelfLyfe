from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from database import (
    shutdown_db_client,
    startup_db_client,
    add_ingredient_db,
)
from models import (
    Ingredient
)

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
    ingredient = Ingredient(sku=sku, name=name, quantity=quantity)
    await add_ingredient_db(ingredient)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)