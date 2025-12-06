# Essência Artesanal - Contracts & Integration Plan

## API Contracts

### Base URL
- Backend: `process.env.REACT_APP_BACKEND_URL/api`

### Endpoints

#### 1. Categories
**GET** `/api/categories`
- Response: Array of Category objects
```json
[{
  "id": "uuid",
  "name": "string",
  "slug": "string",
  "image": "url"
}]
```

#### 2. Products
**GET** `/api/products?category={slug}&featured={bool}`
- Query params: optional `category` and `featured`
- Response: Array of Product objects
```json
[{
  "id": "uuid",
  "name": "string",
  "slug": "string",
  "category": "string",
  "price": float,
  "images": ["url"],
  "description": "string",
  "inStock": boolean,
  "featured": boolean,
  "createdAt": "datetime",
  "updatedAt": "datetime"
}]
```

**GET** `/api/products/{slug}`
- Response: Single Product object

#### 3. Orders
**POST** `/api/orders`
- Body:
```json
{
  "customerName": "string",
  "customerPhone": "string",
  "customerAddress": "string",
  "notes": "string (optional)",
  "items": [{
    "productId": "uuid",
    "quantity": number
  }],
  "total": float
}
```
- Response: Order object with id and status

**GET** `/api/orders`
- Response: Array of Order objects

#### 4. Seed (Development only)
**POST** `/api/seed`
- Seeds database with initial data

## Frontend Integration Plan

### Files to Update

1. **Remove mock data usage**:
   - Update all components to fetch from API instead of mockData.js
   
2. **Create API service** (`/frontend/src/services/api.js`):
   - Create axios instance with base URL
   - Create functions for each endpoint
   - Handle errors globally

3. **Update Components**:
   - **Home.js**: Fetch categories and featured products from API
   - **Products.js**: Fetch filtered products from API
   - **ProductDetail.js**: Fetch single product by slug from API
   - **Checkout.js**: Submit order to API after WhatsApp redirect

4. **Context Updates**:
   - CartContext remains local (localStorage)
   - No changes needed

### Data Migration
- Mock data in `mockData.js` → Already in database via seed
- 34 products across 10 categories
- Featured products flagged in database

### Testing Checklist
- [ ] Categories load on homepage
- [ ] Products load and filter by category
- [ ] Product detail page loads individual product
- [ ] Cart functionality remains working
- [ ] Order submission saves to database
- [ ] WhatsApp integration works
