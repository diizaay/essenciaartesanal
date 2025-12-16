from fastapi import APIRouter, HTTPException, Depends, Header
from typing import List, Optional
from datetime import datetime
import uuid
from models import DeliveryZone, DeliveryZoneCreate, User
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from auth import decode_access_token

load_dotenv()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Auth dependencies (copied from routes.py to avoid circular import)
async def get_current_user_id(authorization: Optional[str] = Header(None)) -> str:
    """Get current user ID from JWT token"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace("Bearer ", "")
    payload = decode_access_token(token)
    
    if not payload or 'user_id' not in payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    return payload['user_id']

async def require_admin(user_id: str = Depends(get_current_user_id)) -> bool:
    """Require user to be admin"""
    user = await db.users.find_one({"id": user_id})
    if not user or not user.get("isAdmin", False):
        raise HTTPException(status_code=403, detail="Admin access required")
    return True

router = APIRouter(prefix="/api", tags=["delivery"])

# Public endpoint - Get delivery fee for province/city
@router.get("/delivery-fee")
async def get_delivery_fee(province: str, city: str):
    """Get delivery fee for a specific province and city"""
    try:
        zone = await db.delivery_zones.find_one({
            "province": province,
            "city": city,
            "isActive": True
        })
        
        if zone:
            return {
                "fee": zone.get("fee", 0),
                "estimatedDays": zone.get("estimatedDays", "1-3 dias")
            }
        
        # Default fallback if zone not found
        return {"fee": 0, "estimatedDays": "A calcular"}
    except Exception as e:
        print(f"Error fetching delivery fee: {e}")
        return {"fee": 0, "estimatedDays": "A calcular"}

# Admin - Get all delivery zones
@router.get("/admin/delivery-zones")
async def get_delivery_zones(user_id: str = Depends(get_current_user_id), is_admin: bool = Depends(require_admin)):
    """Get all delivery zones (admin only)"""
    try:
        zones = []
        cursor = db.delivery_zones.find({})
        async for zone in cursor:
            zone['_id'] = str(zone['_id'])
            zones.append(zone)
        return zones
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Admin - Create delivery zone
@router.post("/admin/delivery-zones")
async def create_delivery_zone(
    zone: DeliveryZoneCreate,
    user_id: str = Depends(get_current_user_id),
    is_admin: bool = Depends(require_admin)
):
    """Create a new delivery zone (admin only)"""
    try:
        # Check if zone already exists
        existing = await db.delivery_zones.find_one({
            "province": zone.province,
            "city": zone.city
        })
        
        if existing:
            raise HTTPException(status_code=400, detail="Delivery zone already exists for this province/city")
        
        zone_dict = zone.model_dump()
        zone_dict['id'] = str(uuid.uuid4())
        zone_dict['createdAt'] = datetime.utcnow()
        
        result = await db.delivery_zones.insert_one(zone_dict)
        zone_dict['_id'] = str(result.inserted_id)
        return zone_dict
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Admin - Update delivery zone
@router.put("/admin/delivery-zones/{zone_id}")
async def update_delivery_zone(
    zone_id: str,
    zone: DeliveryZoneCreate,
    user_id: str = Depends(get_current_user_id),
    is_admin: bool = Depends(require_admin)
):
    """Update a delivery zone (admin only)"""
    try:
        zone_dict = zone.model_dump()
        result = await db.delivery_zones.update_one(
            {"id": zone_id},
            {"$set": zone_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Delivery zone not found")
        
        updated_zone = await db.delivery_zones.find_one({"id": zone_id})
        if updated_zone:
            updated_zone['_id'] = str(updated_zone['_id'])
        return updated_zone
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Admin - Delete delivery zone
@router.delete("/admin/delivery-zones/{zone_id}")
async def delete_delivery_zone(
    zone_id: str,
    user_id: str = Depends(get_current_user_id),
    is_admin: bool = Depends(require_admin)
):
    """Delete a delivery zone (admin only)"""
    try:
        result = await db.delivery_zones.delete_one({"id": zone_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Delivery zone not found")
        
        return {"message": "Delivery zone deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
