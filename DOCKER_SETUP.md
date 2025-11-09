# Docker Setup for Zinovia

## 🐳 Quick Start

### Option 1: Docker Compose (Recommended)

**Production Mode:**
```bash
docker-compose up -d
```

**Development Mode (with hot reload):**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

**View logs:**
```bash
docker-compose logs -f
```

**Stop services:**
```bash
docker-compose down
```

### Option 2: Native Development (Faster for development)

**Start both services:**
```bash
./start.sh
```

**Or use Makefile:**
```bash
make start      # Start services
make stop       # Stop services
make restart    # Restart services
make logs       # View logs (for Docker)
```

## 📍 Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │  Port 3000
│   (Next.js)     │
└────────┬────────┘
         │
         │ HTTP Requests
         │
┌────────▼────────┐
│   Backend       │  Port 8000
│   (FastAPI)     │
└────────┬────────┘
         │
         │ SQL
         │
┌────────▼────────┐
│   Database      │  SQLite (dev)
│   (PostgreSQL)  │  PostgreSQL (prod)
└─────────────────┘
```

## 🔧 Configuration

### Backend Environment (.env in zinovia-backend/)
```env
DATABASE_URL=sqlite:///./zinovia.db
ALLOWED_ORIGINS=http://localhost:3000
EMAIL_ENABLED=false
```

### Frontend Environment (.env.local in zinovia-frontend/)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚀 Production Deployment

1. Update environment variables in docker-compose.yml
2. Switch to PostgreSQL
3. Configure proper CORS origins
4. Enable SSL/HTTPS
5. Use reverse proxy (nginx)

## 📝 Useful Commands

```bash
# Build images
docker-compose build

# Rebuild and restart
docker-compose up -d --build

# View backend logs only
docker-compose logs -f backend

# View frontend logs only
docker-compose logs -f frontend

# Execute command in container
docker-compose exec backend python -c "print('Hello')"

# Access database
docker-compose exec backend sqlite3 zinovia.db "SELECT * FROM contacts;"
```

