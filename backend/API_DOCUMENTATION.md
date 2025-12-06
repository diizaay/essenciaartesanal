# Essência Artesanal - API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication

### Register
- **POST** `/auth/register`
- **Body**:
```json
{
  "email": "user@example.com",
  "name": "User Name",
  "phone": "+244 923 456 789",
  "password": "securepassword"
}
```
- **Response**: Token with user data

### Login
- **POST** `/auth/login`
- **Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
- **Response**: Token with user data

### Get Current User
- **GET** `/auth/me`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: User data

## Addresses

### Get All Addresses
- **GET** `/addresses`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Array of addresses

### Create Address
- **POST** `/addresses`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
```json
{
  "contactName": "John Doe",
  "phone": "+244 923 456 789",
  "province": "Luanda",
  "city": "Luanda",
  "neighborhood": "Viana",
  "street": "Rua 123",
  "isDefault": false
}
```

### Update Address
- **PUT** `/addresses/{address_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: Same as create

### Delete Address
- **DELETE** `/addresses/{address_id}`
- **Headers**: `Authorization: Bearer {token}`

## Favorites

### Get All Favorites
- **GET** `/favorites`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Array of products

### Add to Favorites
- **POST** `/favorites`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
```json
{
  "productId": "product-uuid"
}
```

### Remove from Favorites
- **DELETE** `/favorites/{product_id}`
- **Headers**: `Authorization: Bearer {token}`

### Check if Favorite
- **GET** `/favorites/check/{product_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{"isFavorite": true/false}`

## Cart

### Get Cart
- **GET** `/cart`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Cart with items

### Add to Cart
- **POST** `/cart/items`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
```json
{
  "productId": "product-uuid",
  "quantity": 1
}
```

### Update Cart Item
- **PUT** `/cart/items/{product_id}?quantity=2`
- **Headers**: `Authorization: Bearer {token}`

### Remove from Cart
- **DELETE** `/cart/items/{product_id}`
- **Headers**: `Authorization: Bearer {token}`

### Clear Cart
- **DELETE** `/cart`
- **Headers**: `Authorization: Bearer {token}`

## Products

### Get All Products
- **GET** `/products?category=brincos&featured=true`
- Optional query params: `category`, `featured`, `store`

### Get Product by Slug
- **GET** `/products/{slug}`

### Create Product
- **POST** `/products`
- **Body**:
```json
{
  "name": "Product Name",
  "slug": "product-slug",
  "category": "category-slug",
  "price": 5000,
  "images": ["url1", "url2"],
  "description": "Product description",
  "inStock": true,
  "featured": false
}
```

### Update Product
- **PUT** `/products/{product_id}`
- **Body**: Same as create

### Delete Product
- **DELETE** `/products/{product_id}`

## Categories

### Get All Categories
- **GET** `/categories?store=essencia-artesanal-studio`

### Create Category
- **POST** `/categories`
- **Body**:
```json
{
  "name": "Category Name",
  "slug": "category-slug",
  "image": "image-url"
}
```

## Orders

### Get All Orders
- **GET** `/orders`
- **Headers** (optional): `Authorization: Bearer {token}` - If authenticated, returns only user's orders

### Get Order by ID
- **GET** `/orders/{order_id}`
- **Headers** (optional): `Authorization: Bearer {token}`

### Create Order
- **POST** `/orders`
- **Headers** (optional): `Authorization: Bearer {token}` - Associates order with user if authenticated
- **Body**:
```json
{
  "customerName": "John Doe",
  "customerPhone": "+244 923 456 789",
  "customerAddress": "Full address",
  "items": [
    {"productId": "uuid", "quantity": 2}
  ],
  "total": 15000,
  "notes": "Optional notes"
}
```

### Create WhatsApp Order
- **POST** `/orders/whatsapp`
- Same as create order but sets channel to "whatsapp"

### Update Order Status
- **PUT** `/orders/{order_id}/status?status=confirmed`
- Valid statuses: `pending`, `confirmed`, `completed`, `cancelled`

## Seed Data

### Seed Database
- **POST** `/seed`
- Populates database with initial categories and products
