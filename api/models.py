from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Product Variant Model
class ProductVariant(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str  # "Brinco Normal", "Base Antialérgica", etc
    price: float  # Price for this variant
    
    class Config:
        from_attributes = True

# Product Detail/Specification Model  
class ProductDetail(BaseModel):
    label: str  # "Materiais", "Localização", "Comprimento"
    value: str  # "Prata de lei, 14k banhado a ouro"
    icon: Optional[str] = None  # Icon name (optional)
    
    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    slug: str
    store: Optional[str] = None
    category: str
    price: float
    images: List[str]
    description: str
    inStock: bool = True
    featured: bool = False
    isNew: bool = False
    variants: List[ProductVariant] = []  # Product variants with different prices
    details: List[ProductDetail] = []  # Product details/specifications

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    name: str
    slug: str
    image: str
    store: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))

    class Config:
        from_attributes = True

class BlogPostBase(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    image: Optional[str] = None
    author: str = "Admin"
    category: str
    published: bool = True

class BlogPostCreate(BlogPostBase):
    pass

class BlogPost(BlogPostBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: datetime = Field(default_factory=datetime.utcnow)
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

class ReviewBase(BaseModel):
    productId: str
    rating: int  # 1-5 stars
    comment: str
    userName: str = "Anônimo"

class ReviewCreate(ReviewBase):
    pass

class Review(ReviewBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    userId: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

class CartItem(BaseModel):
    productId: str
    quantity: int

class OrderBase(BaseModel):
    channel: str = "web"
    store: Optional[str] = None
    customerName: str
    customerPhone: str
    customerAddress: str
    notes: Optional[str] = None
    items: List[CartItem]
    total: float
    userId: Optional[str] = None

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "pending"  # pending, confirmed, completed, cancelled
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

# ========== USER MODELS ==========

class UserBase(BaseModel):
    email: EmailStr
    name: str
    phone: Optional[str] = None
    isAdmin: bool = False

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    passwordHash: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

class UserResponse(UserBase):
    id: str
    createdAt: datetime
    isAdmin: bool

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# ========== ADDRESS MODELS ==========

class AddressBase(BaseModel):
    contactName: str
    phone: str
    province: str
    city: str
    neighborhood: str
    street: str
    isDefault: bool = False

class AddressCreate(AddressBase):
    pass

class Address(AddressBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    userId: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

# ========== FAVORITE MODELS ==========

class FavoriteCreate(BaseModel):
    productId: str

class Favorite(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    userId: str
    productId: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

# ========== CART MODELS ==========

class CartItemWithProduct(CartItem):
    product: Optional[Product] = None

class Cart(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    userId: str
    items: List[CartItem] = []
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

# ========== DELIVERY ZONE MODELS ==========

class DeliveryZoneBase(BaseModel):
    province: str
    city: str
    fee: float
    estimatedDays: str = "1-3 dias"
    isActive: bool = True

class DeliveryZoneCreate(DeliveryZoneBase):
    pass

class DeliveryZone(DeliveryZoneBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True
