"""
Pydantic schemas for request/response validation
"""

from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


# Contact Form Schemas
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    company: str = Field(..., min_length=2, max_length=255)
    message: str = Field(..., min_length=10)


class ContactResponse(BaseModel):
    success: bool
    message: str
    contact_id: Optional[int] = None

    class Config:
        from_attributes = True


# Newsletter Schemas
class NewsletterSubscribe(BaseModel):
    email: EmailStr


class NewsletterResponse(BaseModel):
    success: bool
    message: str

    class Config:
        from_attributes = True


# Health Check Schema
class HealthResponse(BaseModel):
    status: str
    message: str
    version: str = "1.0.0"

