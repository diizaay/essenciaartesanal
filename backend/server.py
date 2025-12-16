from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from routes import router

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Mount uploads directory
uploads_dir = ROOT_DIR / "uploads"
uploads_dir.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")

# Include API router (all /api/* routes)
app.include_router(router)

# Include delivery routes separately
try:
    from delivery_routes import router as delivery_router
    app.include_router(delivery_router)
    logger.info("Delivery routes loaded successfully")
except Exception as e:
    logger.error(f"Failed to load delivery routes: {e}")

# API root endpoint
@app.get("/api/")
async def root():
    return {"message": "Essência Artesanal API - Welcome!"}

# Serve React frontend static files
frontend_build_dir = ROOT_DIR.parent / "frontend" / "build"
if frontend_build_dir.exists():
    logger.info(f"Serving React frontend from {frontend_build_dir}")
    
    # Mount static files (CSS, JS, images from build/static)
    static_dir = frontend_build_dir / "static"
    if static_dir.exists():
        app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")
    
    # Serve other static files from build root
    @app.get("/favicon.ico")
    async def favicon():
        favicon_path = frontend_build_dir / "favicon.ico"
        if favicon_path.exists():
            return FileResponse(favicon_path)
        return {"error": "Not found"}
    
    @app.get("/manifest.json")
    async def manifest():
        manifest_path = frontend_build_dir / "manifest.json"
        if manifest_path.exists():
            return FileResponse(manifest_path)
        return {"error": "Not found"}
    
    @app.get("/logo192.png")
    async def logo192():
        logo_path = frontend_build_dir / "logo192.png"
        if logo_path.exists():
            return FileResponse(logo_path)
        return {"error": "Not found"}
    
    @app.get("/logo512.png")
    async def logo512():
        logo_path = frontend_build_dir / "logo512.png"
        if logo_path.exists():
            return FileResponse(logo_path)
        return {"error": "Not found"}
    
    # Catch-all: serve index.html for all other routes (React Router)
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        index_file = frontend_build_dir / "index.html"
        if index_file.exists():
            return FileResponse(index_file)
        return {"error": "Frontend not built"}
else:
    logger.warning("Frontend build directory not found. Run 'npm run build' in frontend folder.")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()