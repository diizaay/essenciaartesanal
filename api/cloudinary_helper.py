"""
Cloudinary helper functions for image upload and management
"""
import cloudinary
import cloudinary.uploader
import os
from typing import Optional, Dict, Any

# Configure Cloudinary (uses environment variables)
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET'),
    secure=True
)

def upload_image(file_content: bytes, filename: str, folder: str = "essencia-artesanal") -> Dict[str, Any]:
    """
    Upload an image to Cloudinary
    
    Args:
        file_content: Image file content (bytes)
        filename: Original filename
        folder: Cloudinary folder name
        
    Returns:
        Dict with 'url' and 'public_id'
    """
    try:
        import io
        # Upload to Cloudinary
        result = cloudinary.uploader.upload(
            io.BytesIO(file_content),
            folder=folder,
            resource_type="image",
            format="auto",  # Auto-detect format
            quality="auto",  # Auto-optimize quality
            fetch_format="auto"  # Best format for browser
        )
        
        return {
            "url": result.get('secure_url'),
            "public_id": result.get('public_id'),
            "filename": filename
        }
    except Exception as e:
        raise Exception(f"Failed to upload image to Cloudinary: {str(e)}")

def delete_image(public_id: str) -> bool:
    """
    Delete an image from Cloudinary
    
    Args:
        public_id: Cloudinary public ID of the image
        
    Returns:
        True if deleted successfully
    """
    try:
        result = cloudinary.uploader.destroy(public_id)
        return result.get('result') == 'ok'
    except Exception as e:
        print(f"Failed to delete image from Cloudinary: {str(e)}")
        return False

def get_image_url(public_id: str, transformations: Optional[Dict] = None) -> str:
    """
    Get optimized image URL from Cloudinary
    
    Args:
        public_id: Cloudinary public ID
        transformations: Optional transformations (width, height, crop, etc.)
        
    Returns:
        Image URL
    """
    if transformations:
        return cloudinary.CloudinaryImage(public_id).build_url(**transformations)
    return cloudinary.CloudinaryImage(public_id).build_url()
