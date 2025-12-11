"""
FastAPI Serverless Handler for Vercel
"""
import sys
import os
from pathlib import Path

# Add current directory to Python path for Vercel serverless
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from routes import router

load_dotenv()

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url) if mongo_url else None
db = client[os.environ.get('DB_NAME', 'essencia_artesanal')] if client else None

# Create FastAPI app
app = FastAPI(title="Essência Artesanal API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router (all /api/* routes)
app.include_router(router)

# Health check endpoint (helps prevent cold starts)
@app.get("/")
@app.get("/api")
async def root():
    return {
        "message": "Essência Artesanal API",
        "status": "online",
        "version": "1.0.0"
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint for monitoring and preventing cold starts"""
    db_status = "connected" if client else "disconnected"
    return {
        "status": "healthy",
        "database": db_status,
        "message": "API is running smoothly"
    }

# Shutdown event
@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()

# Mangum handler for Vercel serverless
# Use a callable handler function instead of direct Mangum instance
def handler(event, context):
    asgi_handler = Mangum(app, lifespan="auto")
    return asgi_handler(event, context)
