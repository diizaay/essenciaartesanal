# Essência Artesanal - Backend Setup Guide

## Prerequisites
- Python 3.10 or higher
- MongoDB (local or cloud instance)

## Installation

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Create virtual environment**:
```bash
python -m venv venv
```

3. **Activate virtual environment**:
- Windows:
```bash
venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

4. **Install dependencies**:
```bash
pip install -r requirements.txt
```

5. **Create .env file**:
```bash
# Copy .env.example to .env
copy .env.example .env  # Windows
cp .env.example .env    # Linux/Mac
```

6. **Configure .env**:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=essenciaartesanal
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
SECRET_KEY=your-super-secret-key-change-this
```

## Running the Server

**Development mode with auto-reload**:
```bash
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

## Seeding the Database

After starting the server, seed the database with initial data:

```bash
curl -X POST http://localhost:8000/api/seed
```

Or visit: `http://localhost:8000/api/seed` in your browser

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

Or check `API_DOCUMENTATION.md` for detailed endpoint descriptions.

## Testing API Endpoints

### Register a new user:
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "Test User",
    "phone": "+244 923 456 789",
    "password": "securepassword"
  }'
```

### Login:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'
```

Save the `access_token` from the response and use it for authenticated requests:

### Get user profile:
```bash
curl http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Project Structure

```
backend/
├── server.py          # FastAPI app initialization
├── routes.py          # All API endpoints
├── models.py          # Pydantic models
├── auth.py            # Authentication utilities
├── seed_data.py       # Initial data for database
├── requirements.txt   # Python dependencies
├── .env.example       # Environment variables template
└── API_DOCUMENTATION.md  # API documentation
```

## Features Implemented

✅ **Authentication**: JWT-based auth with register/login
✅ **User Management**: User profiles with email/password
✅ **Address Management**: CRUD operations for user addresses
✅ **Favorites**: Add/remove products to wishlist
✅ **Cart**: Persistent cart with CRUD operations
✅ **Products**: Full CRUD with filtering
✅ **Categories**: Manage product categories
✅ **Orders**: Create and manage orders (with user association)

## Next Steps

1. Configure your MongoDB connection
2. Set a secure SECRET_KEY in .env
3. Run the server and seed the database
4. Test endpoints using Swagger UI or your frontend
5. Integrate with the React frontend
