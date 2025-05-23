from pydantic import BaseModel, Field
from typing import Literal, List, Optional, Dict, Any


class FilterProductsParameters(BaseModel):
    category: str = Field(..., description="Product category, e.g. shoes, shirts")
    color: Optional[str] = Field(None, description="Color of the product")
    max_price: Optional[float] = Field(None, description="Maximum price in USD")


class FilterProductsTool(BaseModel):
    type: Literal["function"] = "function"
    name: str = "filter_products"
    description: str = "Filters products in an online store."
    parameters: Dict[str, Any] = FilterProductsParameters.schema()
    # required: List[str] = Field(["category"], description="Required parameters for the function")