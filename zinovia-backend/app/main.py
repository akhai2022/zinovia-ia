"""
Zinovia Backend API
FastAPI application for handling contact forms, newsletter subscriptions, and customer data
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.routers import chatbot, contact, newsletter, health

# Load environment variables
load_dotenv()

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

# Initialize FastAPI app
app = FastAPI(
    title="Zinovia API",
    description="Backend API for Zinovia AI Services",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS configuration
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api/v1", tags=["Health"])
app.include_router(contact.router, prefix="/api/v1", tags=["Contact"])
app.include_router(newsletter.router, prefix="/api/v1", tags=["Newsletter"])
app.include_router(chatbot.router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Zinovia API",
        "version": "1.0.0",
        "docs": "/docs"
    }

