from pydantic import BaseModel, Field
from typing import Optional, List, Set, ClassVar
from bson import ObjectId
from datetime import datetime

class Ingredient(BaseModel):
    sku: str = Field(..., alias="_id")
    name: str
    quantity: int
    price: Optional[float] = None
    expiry_date: datetime
    monthIncrease: Optional[int] = None
    yearIncrease: Optional[int] = None 
    orders: int = 0

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class MenuItem(BaseModel):
    id: Optional[ObjectId] = Field(default_factory=ObjectId, alias="_id")
    name: str
    ingredients: List[Ingredient]
    price: float
    category: str #Appetizer, Entree, Dessert, Drink
    description: Optional[str] = None
    season: Optional[str] = None #Fall, Winter, Summer, All
    orders: int = 0

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True