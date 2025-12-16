from fastapi import APIRouter, HTTPException, Depends, Header, UploadFile, File
from typing import List, Optional
from datetime import datetime
import uuid
import shutil
import os
from pathlib import Path
from models import (
    Product, ProductCreate, Category, CategoryCreate, Order, OrderCreate,
    User, UserCreate, UserLogin, UserResponse, Token,
    Address, AddressCreate,
    Favorite, FavoriteCreate,
    Cart, CartItem,
    BlogPost, BlogPostCreate,
    Review, ReviewCreate,
    DeliveryZone, DeliveryZoneCreate
)
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from auth import get_password_hash, verify_password, create_access_token, decode_access_token

load_dotenv()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

router = APIRouter(prefix="/api", tags=["api"])

# ========== AUTH DEPENDENCY ==========

async def get_current_user(authorization: Optional[str] = Header(None)) -> Optional[User]:
    """Get current authenticated user from JWT token"""
    if not authorization or not authorization.startswith("Bearer "):
        return None
    
    token = authorization.replace("Bearer ", "")
    payload = decode_access_token(token)
    
    if not payload:
        return None
    
    user_id = payload.get("sub")
    if not user_id:
        return None
    
    user_data = await db.users.find_one({"id": user_id})
    if not user_data:
        return None
    
    return User(**user_data)

async def require_auth(user: Optional[User] = Depends(get_current_user)) -> User:
    """Require authentication"""
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user

async def require_admin(user: User = Depends(require_auth)) -> User:
    """Require admin authentication"""
    if not user.isAdmin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

# ========== AUTHENTICATION ==========

@router.post("/auth/register", response_model=Token)
async def register(user_data: UserCreate):
    """Register a new user"""
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user_dict = user_data.dict(exclude={"password"})
    user_dict["passwordHash"] = get_password_hash(user_data.password)
    user = User(**user_dict)
    
    await db.users.insert_one(user.dict())
    
    # Create access token
    access_token = create_access_token(data={"sub": user.id})
    
    user_response = UserResponse(
        id=user.id,
        email=user.email,
        name=user.name,
        phone=user.phone,
        isAdmin=user.isAdmin,
        createdAt=user.createdAt
    )
    
    return Token(access_token=access_token, user=user_response)

@router.post("/auth/login", response_model=Token)
async def login(credentials: UserLogin):
    """Login a user"""
    # Find user
    user_data = await db.users.find_one({"email": credentials.email})
    if not user_data:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user = User(**user_data)
    
    # Verify password
    if not verify_password(credentials.password, user.passwordHash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create access token
    access_token = create_access_token(data={"sub": user.id})
    
    user_response = UserResponse(
        id=user.id,
        email=user.email,
        name=user.name,
        phone=user.phone,
        isAdmin=user.isAdmin,
        createdAt=user.createdAt
    )
    
    return Token(access_token=access_token, user=user_response)

@router.get("/auth/me", response_model=UserResponse)
async def get_me(user: User = Depends(require_auth)):
    """Get current user"""
    return UserResponse(
        id=user.id,
        email=user.email,
        name=user.name,
        phone=user.phone,
        isAdmin=user.isAdmin,
        createdAt=user.createdAt
    )

# ========== ADDRESSES ==========

@router.get("/addresses", response_model=List[Address])
async def get_addresses(user: User = Depends(require_auth)):
    """Get all addresses for current user"""
    addresses = await db.addresses.find({"userId": user.id}).to_list(100)
    return [Address(**addr) for addr in addresses]

@router.post("/addresses", response_model=Address)
async def create_address(address_data: AddressCreate, user: User = Depends(require_auth)):
    """Create a new address"""
    address_dict = address_data.dict()
    address_dict["userId"] = user.id
    
    # If this is set as default, unset other defaults
    if address_dict.get("isDefault"):
        await db.addresses.update_many(
            {"userId": user.id},
            {"$set": {"isDefault": False}}
        )
    
    address = Address(**address_dict)
    await db.addresses.insert_one(address.dict())
    return address

@router.put("/addresses/{address_id}", response_model=Address)
async def update_address(address_id: str, address_data: AddressCreate, user: User = Depends(require_auth)):
    """Update an address"""
    # Check if address belongs to user
    existing = await db.addresses.find_one({"id": address_id, "userId": user.id})
    if not existing:
        raise HTTPException(status_code=404, detail="Address not found")
    
    address_dict = address_data.dict()
    
    # If this is set as default, unset other defaults
    if address_dict.get("isDefault"):
        await db.addresses.update_many(
            {"userId": user.id, "id": {"$ne": address_id}},
            {"$set": {"isDefault": False}}
        )
    
    await db.addresses.update_one(
        {"id": address_id},
        {"$set": address_dict}
    )
    
    updated = await db.addresses.find_one({"id": address_id})
    return Address(**updated)

@router.delete("/addresses/{address_id}")
async def delete_address(address_id: str, user: User = Depends(require_auth)):
    """Delete an address"""
    result = await db.addresses.delete_one({"id": address_id, "userId": user.id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Address not found")
    return {"message": "Address deleted successfully"}

# ========== FAVORITES ==========

@router.get("/favorites", response_model=List[Product])
async def get_favorites(user: User = Depends(require_auth)):
    """Get all favorite products for current user"""
    favorites = await db.favorites.find({"userId": user.id}).to_list(1000)
    product_ids = [fav["productId"] for fav in favorites]
    
    if not product_ids:
        return []
    
    products = await db.products.find({"id": {"$in": product_ids}}).to_list(1000)
    return [Product(**prod) for prod in products]

@router.post("/favorites", response_model=Favorite)
async def add_favorite(favorite_data: FavoriteCreate, user: User = Depends(require_auth)):
    """Add a product to favorites"""
    # Check if already favorited
    existing = await db.favorites.find_one({"userId": user.id, "productId": favorite_data.productId})
    if existing:
        return Favorite(**existing)
    
    # Check if product exists
    product = await db.products.find_one({"id": favorite_data.productId})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    favorite = Favorite(userId=user.id, productId=favorite_data.productId)
    await db.favorites.insert_one(favorite.dict())
    return favorite

@router.delete("/favorites/{product_id}")
async def remove_favorite(product_id: str, user: User = Depends(require_auth)):
    """Remove a product from favorites"""
    result = await db.favorites.delete_one({"userId": user.id, "productId": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Favorite not found")
    return {"message": "Favorite removed successfully"}

@router.get("/favorites/check/{product_id}")
async def check_favorite(product_id: str, user: User = Depends(require_auth)):
    """Check if a product is favorited"""
    favorite = await db.favorites.find_one({"userId": user.id, "productId": product_id})
    return {"isFavorite": favorite is not None}

# ========== CART ==========

@router.get("/cart", response_model=Cart)
async def get_cart(user: User = Depends(require_auth)):
    """Get current user's cart"""
    cart = await db.carts.find_one({"userId": user.id})
    if not cart:
        # Create empty cart
        cart = Cart(userId=user.id, items=[])
        await db.carts.insert_one(cart.dict())
    return Cart(**cart)

@router.post("/cart/items")
async def add_to_cart(item: CartItem, user: User = Depends(require_auth)):
    """Add an item to cart"""
    # Check if product exists
    product = await db.products.find_one({"id": item.productId})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Get or create cart
    cart = await db.carts.find_one({"userId": user.id})
    if not cart:
        cart = Cart(userId=user.id, items=[])
        await db.carts.insert_one(cart.dict())
        cart = await db.carts.find_one({"userId": user.id})
    
    # Check if item already in cart
    items = cart.get("items", [])
    item_exists = False
    
    for i, cart_item in enumerate(items):
        if cart_item["productId"] == item.productId:
            items[i]["quantity"] += item.quantity
            item_exists = True
            break
    
    if not item_exists:
        items.append(item.dict())
    
    # Update cart
    from datetime import datetime
    await db.carts.update_one(
        {"userId": user.id},
        {"$set": {"items": items, "updatedAt": datetime.utcnow()}}
    )
    
    updated_cart = await db.carts.find_one({"userId": user.id})
    return Cart(**updated_cart)

@router.put("/cart/items/{product_id}")
async def update_cart_item(product_id: str, quantity: int, user: User = Depends(require_auth)):
    """Update item quantity in cart"""
    cart = await db.carts.find_one({"userId": user.id})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    items = cart.get("items", [])
    item_found = False
    
    for i, item in enumerate(items):
        if item["productId"] == product_id:
            if quantity <= 0:
                items.pop(i)
            else:
                items[i]["quantity"] = quantity
            item_found = True
            break
    
    if not item_found:
        raise HTTPException(status_code=404, detail="Item not in cart")
    
    from datetime import datetime
    await db.carts.update_one(
        {"userId": user.id},
        {"$set": {"items": items, "updatedAt": datetime.utcnow()}}
    )
    
    updated_cart = await db.carts.find_one({"userId": user.id})
    return Cart(**updated_cart)

@router.delete("/cart/items/{product_id}")
async def remove_from_cart(product_id: str, user: User = Depends(require_auth)):
    """Remove an item from cart"""
    cart = await db.carts.find_one({"userId": user.id})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    items = cart.get("items", [])
    items = [item for item in items if item["productId"] != product_id]
    
    from datetime import datetime
    await db.carts.update_one(
        {"userId": user.id},
        {"$set": {"items": items, "updatedAt": datetime.utcnow()}}
    )
    
    return {"message": "Item removed from cart"}

@router.delete("/cart")
async def clear_cart(user: User = Depends(require_auth)):
    """Clear all items from cart"""
    await db.carts.update_one(
        {"userId": user.id},
        {"$set": {"items": []}}
    )
    return {"message": "Cart cleared successfully"}

# ========== PRODUCTS ==========

@router.get("/products/{product_id}", response_model=Product)
async def get_product_by_id(product_id: str):
    """Get a single product by ID"""
    product = await db.products.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)

# ========== CATEGORIES ==========

@router.get("/categories", response_model=List[Category])
async def get_categories(store: Optional[str] = None):
    """Get all categories"""
    query: dict = {}
    if store:
        query["$or"] = [{"store": store}, {"store": {"$exists": False}}, {"store": None}]
    categories = await db.categories.find(query).to_list(100)
    return [Category(**cat) for cat in categories]

@router.post("/categories", response_model=Category)
async def create_category(category: CategoryCreate, admin: User = Depends(require_admin)):
    """Create a new category (admin only)"""
    category_dict = category.dict()
    cat_obj = Category(**category_dict)
    await db.categories.insert_one(cat_obj.dict())
    return cat_obj

@router.put("/categories/{category_id}", response_model=Category)
async def update_category(category_id: str, category: CategoryCreate, admin: User = Depends(require_admin)):
    """Update a category (admin only)"""
    category_dict = category.dict()
    
    result = await db.categories.update_one(
        {"id": category_id},
        {"$set": category_dict}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    
    updated_category = await db.categories.find_one({"id": category_id})
    return Category(**updated_category)

@router.delete("/categories/{category_id}")
async def delete_category(category_id: str, admin: User = Depends(require_admin)):
    """Delete a category (admin only)"""
    result = await db.categories.delete_one({"id": category_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category deleted successfully"}

# ========== PRODUCTS ==========

@router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None, featured: Optional[bool] = None, store: Optional[str] = None):
    """Get all products with optional filters"""
    query = {}
    if category:
        query['category'] = category
    if featured is not None:
        query['featured'] = featured
    if store:
        query['$or'] = [{"store": store}, {"store": {"$exists": False}}, {"store": None}]
    
    products = await db.products.find(query).to_list(1000)
    return [Product(**product) for product in products]

@router.get("/products/{slug}", response_model=Product)
async def get_product(slug: str):
    """Get a single product by slug"""
    product = await db.products.find_one({"slug": slug})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)

@router.post("/products", response_model=Product)
async def create_product(product: ProductCreate, admin: User = Depends(require_admin)):
    """Create a new product (admin only)"""
    product_dict = product.dict()
    product_obj = Product(**product_dict)
    await db.products.insert_one(product_obj.dict())
    return product_obj

@router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product: ProductCreate, admin: User = Depends(require_admin)):
    """Update a product (admin only)"""
    from datetime import datetime
    product_dict = product.dict()
    product_dict['updatedAt'] = datetime.utcnow()
    
    result = await db.products.update_one(
        {"id": product_id},
        {"$set": product_dict}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    updated_product = await db.products.find_one({"id": product_id})
    return Product(**updated_product)

@router.delete("/products/{product_id}")
async def delete_product(product_id: str, admin: User = Depends(require_admin)):
    """Delete a product (admin only)"""
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

# ========== ORDERS ==========

@router.get("/orders", response_model=List[Order])
async def get_orders(user: Optional[User] = Depends(get_current_user)):
    """Get all orders (filtered by user if authenticated)"""
    query = {}
    if user:
        query["userId"] = user.id
    
    orders = await db.orders.find(query).sort("createdAt", -1).to_list(1000)
    return [Order(**order) for order in orders]

@router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str, user: Optional[User] = Depends(get_current_user)):
    """Get a single order by ID"""
    query = {"id": order_id}
    if user:
        query["userId"] = user.id
    
    order = await db.orders.find_one(query)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order(**order)

@router.post("/orders", response_model=Order)
async def create_order(order: OrderCreate, user: Optional[User] = Depends(get_current_user)):
    """Create a new order"""
    order_dict = order.dict()
    if user:
        order_dict["userId"] = user.id
    
    order_obj = Order(**order_dict)
    await db.orders.insert_one(order_obj.dict())
    
    # Clear cart if user is authenticated
    if user:
        await db.carts.update_one(
            {"userId": user.id},
            {"$set": {"items": []}}
        )
    
    return order_obj

@router.post("/orders/whatsapp", response_model=Order)
async def create_whatsapp_order(order: OrderCreate, user: Optional[User] = Depends(get_current_user)):
    """Create an order that will be finalized via WhatsApp"""
    order_dict = order.dict()
    order_dict["channel"] = "whatsapp"
    if user:
        order_dict["userId"] = user.id
    
    order_obj = Order(**order_dict)
    await db.orders.insert_one(order_obj.dict())
    
    # Clear cart if user is authenticated
    if user:
        await db.carts.update_one(
            {"userId": user.id},
            {"$set": {"items": []}}
        )
    
    return order_obj

@router.put("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: str):
    """Update order status"""
    valid_statuses = ["pending", "confirmed", "completed", "cancelled"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    result = await db.orders.update_one(
        {"id": order_id},
        {"$set": {"status": status}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return {"message": "Order status updated successfully"}

# ========== SEED DATA ==========

@router.post("/seed")
async def seed_database():
    """Seed the database with initial data"""
    # Check if data already exists
    existing_products = await db.products.count_documents({})
    if existing_products > 0:
        return {"message": "Database already seeded", "products": existing_products}
    
    # Import mock data
    from seed_data import categories_data, products_data, admin_user_data
    
    # Insert categories
    categories_to_insert = [Category(**cat).dict() for cat in categories_data]
    await db.categories.insert_many(categories_to_insert)
    
    # Insert products
    products_to_insert = [Product(**prod).dict() for prod in products_data]
    await db.products.insert_many(products_to_insert)
    
    # Create admin user if it doesn't exist
    existing_admin = await db.users.find_one({"email": admin_user_data["email"]})
    if not existing_admin:
        user_dict = {k: v for k, v in admin_user_data.items() if k != "password"}
        user_dict["passwordHash"] = get_password_hash(admin_user_data["password"])
        admin_user = User(**user_dict)
        await db.users.insert_one(admin_user.dict())
    
    return {
        "message": "Database seeded successfully",
        "categories": len(categories_to_insert),
        "products": len(products_to_insert),
        "admin_created": not existing_admin
    }

@router.post("/seed-admin")
async def seed_admin():
    """Create admin user (can be called independently)"""
    from seed_data import admin_user_data
    
    # Check if admin already exists
    existing_admin = await db.users.find_one({"email": admin_user_data["email"]})
    
    if existing_admin:
        return {
            "message": "Admin user already exists",
            "email": admin_user_data["email"]
        }
    
    # Create admin user
    user_dict = {k: v for k, v in admin_user_data.items() if k != "password"}
    user_dict["passwordHash"] = get_password_hash(admin_user_data["password"])
    admin_user = User(**user_dict)
    await db.users.insert_one(admin_user.dict())
    
    return {
        "message": "Admin user created successfully",
        "email": admin_user_data["email"],
        "note": "Please change the password after first login"
    }

# ========== ADMIN ROUTES ==========

@router.get("/admin/stats")
async def get_admin_stats(admin: User = Depends(require_admin)):
    """Get dashboard statistics for admin panel"""
    # Count products
    total_products = await db.products.count_documents({})
    
    # Count orders
    total_orders = await db.orders.count_documents({})
    pending_orders = await db.orders.count_documents({"status": "pending"})
    completed_orders = await db.orders.count_documents({"status": "completed"})
    
    # Count users
    total_users = await db.users.count_documents({})
    
    # Calculate total revenue from completed orders
    completed_orders_list = await db.orders.find({"status": "completed"}).to_list(10000)
    total_revenue = sum(order.get("total", 0) for order in completed_orders_list)
    
    return {
        "products": {
            "total": total_products
        },
        "orders": {
            "total": total_orders,
            "pending": pending_orders,
            "completed": completed_orders
        },
        "users": {
            "total": total_users
        },
        "revenue": {
            "total": total_revenue
        }
    }

@router.get("/admin/users")
async def get_all_users(admin: User = Depends(require_admin)):
    """Get all users (admin only)"""
    users = await db.users.find({}).sort("createdAt", -1).to_list(1000)
    return [
        {
            "id": user["id"],
            "email": user["email"],
            "name": user["name"],
            "phone": user.get("phone"),
            "isAdmin": user.get("isAdmin", False),
            "createdAt": user["createdAt"]
        }
        for user in users
    ]

@router.get("/admin/orders")
async def get_all_orders_admin(status: Optional[str] = None, admin: User = Depends(require_admin)):
    """Get all orders with optional status filter (admin only)"""
    query = {}
    if status:
        query["status"] = status
    
    orders = await db.orders.find(query).sort("createdAt", -1).to_list(1000)
    return [Order(**order) for order in orders]

@router.post("/admin/upload-image")
async def upload_image(file: UploadFile = File(...), admin: User = Depends(require_admin)):
    """Upload an image file (admin only)"""
    # Validate file type
    allowed_extensions = {".jpg", ".jpeg", ".png", ".webp"}
    file_ext = Path(file.filename).suffix.lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed types: {', '.join(allowed_extensions)}"
        )
    
    # Create uploads directory if it doesn't exist
    # Save to backend/uploads directory
    upload_dir = Path(__file__).parent / "uploads"
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    # Generate unique filename
    from datetime import datetime
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    unique_filename = f"{timestamp}_{file.filename}"
    file_path = upload_dir / unique_filename
    
    # Save file
    try:
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    # Return the URL path (relative to public folder)
    return {
        "filename": unique_filename,
        "url": f"/uploads/{unique_filename}"
    }


# ========== BLOG POSTS ==========

@router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(published: Optional[bool] = None):
    """Get all blog posts, optionally filter by published status"""
    query = {}
    if published is not None:
        query["published"] = published
    
    posts = await db.blog_posts.find(query).sort("date", -1).to_list(1000)
    return [BlogPost(**post) for post in posts]

@router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    """Get a single blog post by ID"""
    post = await db.blog_posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return BlogPost(**post)

@router.post("/blog", response_model=BlogPost)
async def create_blog_post(post_data: BlogPostCreate, user: User = Depends(require_admin)):
    """Create a new blog post (admin only)"""
    existing = await db.blog_posts.find_one({"slug": post_data.slug})
    if existing:
        raise HTTPException(status_code=400, detail="A post with this slug already exists")
    
    post = BlogPost(**post_data.dict())
    await db.blog_posts.insert_one(post.dict())
    return post

@router.put("/blog/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, post_data: BlogPostCreate, user: User = Depends(require_admin)):
    """Update a blog post (admin only)"""
    existing = await db.blog_posts.find_one({"id": post_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    from datetime import datetime
    updated_post = BlogPost(**{**post_data.dict(), "id": post_id, "updatedAt": datetime.utcnow()})
    await db.blog_posts.replace_one({"id": post_id}, updated_post.dict())
    return updated_post

@router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str, user: User = Depends(require_admin)):
    """Delete a blog post (admin only)"""
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted successfully"}

@router.patch("/blog/{post_id}/publish")
async def toggle_blog_post_published(post_id: str, user: User = Depends(require_admin)):
    """Toggle published status of a blog post (admin only)"""
    post = await db.blog_posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    new_status = not post.get("published", True)
    await db.blog_posts.update_one({"id": post_id}, {"$set": {"published": new_status}})
    return {"published": new_status}
# ========== PRODUCT REVIEWS ==========

@router.get("/products/{product_id}/reviews", response_model=List[Review])
async def get_product_reviews(product_id: str):
    """Get all reviews for a product"""
    reviews = await db.reviews.find({"productId": product_id}).sort("createdAt", -1).to_list(1000)
    return [Review(**review) for review in reviews]

@router.post("/products/{product_id}/reviews", response_model=Review)
async def create_product_review(product_id: str, review_data: ReviewCreate, user: User = Depends(require_auth)):
    """Create a review for a product (authenticated users only)"""
    # Check if product exists
    product = await db.products.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Create review with user info
    review_dict = review_data.dict()
    review_dict["userId"] = user.id
    review_dict["userName"] = user.name
    
    review = Review(**review_dict)
    await db.reviews.insert_one(review.dict())
    return review

@router.delete("/reviews/{review_id}")
async def delete_review(review_id: str, user: User = Depends(require_auth)):
    """Delete a review (own review or admin only)"""
    review = await db.reviews.find_one({"id": review_id})
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    # Check if user is owner or admin
    if review["userId"] != user.id and not user.isAdmin:
        raise HTTPException(status_code=403, detail="Not authorized to delete this review")
    
    await db.reviews.delete_one({"id": review_id})
    return {"message": "Review deleted successfully"}

@router.get("/products/{product_id}/rating")
async def get_product_rating(product_id: str):
    """Get average rating for a product"""
    reviews = await db.reviews.find({"productId": product_id}).to_list(1000)
    
    if not reviews:
        return {"averageRating": 0, "totalReviews": 0}
    
    total_rating = sum(review["rating"] for review in reviews)
    average_rating = total_rating / len(reviews)
    
    return {
        "averageRating": round(average_rating, 1),
        "totalReviews": len(reviews)
    }

# ========== DELIVERY ZONES ENDPOINTS ==========

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
                "fee": zone["fee"],
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
        
        zone_dict['id'] = zone_id
        return zone_dict
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

