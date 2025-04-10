from pydantic import BaseModel, Field
from typing import Optional, List, Set, ClassVar
from bson import ObjectId
from datetime import datetime


"""
Model classes for the menu items and ingredients.
These classes are used to define the structure of the data that will be stored in the database.
"""

class Ingredient(BaseModel):
    sku: str = Field(..., alias="_id")
    name: str
    stock: int
    price: Optional[float] = None
    expiry_date: datetime
    monthIncrease: Optional[str] = None
    yearIncrease: Optional[str] = None 
    orders: int
    stock_measurement: str
    warningStockAmount: int

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

    def __str__(self):
        return f"sku: {self.sku}, name: {self.name}, stock: {self.stock}, price: {self.price}, expiry_date: {self.expiry_date}, monthIncrease: {self.monthIncrease}, yearIncrease: {self.yearIncrease}, orders: {self.orders}, stock_measurement: {self.stock_measurement}, warningStockAmount: {self.warningStockAmount}"


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


class IngredientCreate(BaseModel):
    sku: str
    name: str
    stock: int
    price: float
    expiry_date: str
    customUnit: str
    threshold: int
    unit: str

    def __str__(self):
        return f"sku: {self.sku}, name: {self.name}, stock: {self.stock}, price: {self.price}, expiry_date: {self.expiry_date}, customUnit: {self.customUnit}, threshold: {self.threshold}, unit: {self.unit}"
    

class ResupplyIngredientCreate(BaseModel):
    sku: str
    id: int
    isNewIngredient: bool
    supplier: str
    name: str
    stock: int
    price: float
    expiryDate: str
    customUnit: str
    threshold: int
    unit: str

    def __str__(self):
        return f"sku: {self.sku}, name: {self.name}, stock: {self.stock}, price: {self.price}, expiry_date: {self.expiryDate}, customUnit: {self.customUnit}, threshold: {self.threshold}, unit: {self.unit}"