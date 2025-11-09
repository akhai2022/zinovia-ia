# Quick Setup Guide for Zinovia Backend

## 🚀 Quick Start (5 minutes)

### 1. Create Virtual Environment

```bash
cd zinovia-backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env if needed (defaults work for development)
```

### 4. Run Backend

```bash
# Option 1: Using the run script
./run.sh

# Option 2: Using uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Option 3: Using Python
python main.py
```

### 5. Verify It's Working

- API Documentation: http://localhost:8000/docs
- Health Check: http://localhost:8000/api/v1/health
- Root: http://localhost:8000/

## ✅ That's It!

Your backend is now running and ready to accept:
- Contact form submissions
- Newsletter subscriptions

The database (SQLite) will be created automatically as `zinovia.db` in the backend directory.

## 🔗 Connect Frontend

Update `zinovia-frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

Restart the frontend and forms will automatically connect to the backend!

## 📊 View Data

The database file `zinovia.db` contains all submissions. You can view it with:
- SQLite Browser
- Command line: `sqlite3 zinovia.db`
- Or add an admin panel later

