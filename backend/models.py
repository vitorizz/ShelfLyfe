from pydantic import BaseModel, Field
from typing import Optional, List, Set, ClassVar
from bson import ObjectId

class Ingredient(BaseModel):
    sku: str = Field(..., alias="_id")
    name: str
    quantity: int

    class Config:
        populate_by_name = True