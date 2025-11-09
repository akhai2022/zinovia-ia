# Docker Setup for Zinovia

## 🐳 Quick Start with Docker Compose

### Production Mode

```bash
# Build and start both services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Development Mode (with hot reload)

```bash
# Start with development configuration
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

## 📋 Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🔧 Individual Docker Commands

### Backend Only

```bash
cd zinovia-backend
docker build -t zinovia-backend .
docker run -p 8000:8000 zinovia-backend
```

### Frontend Only

```bash
cd zinovia-frontend
docker build -t zinovia-frontend .
docker run -p 3000:3000 zinovia-frontend
```

## 🛠️ Development Without Docker

### Backend

```bash
cd zinovia-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd zinovia-frontend
npm install
npm run dev
```

## 📝 Environment Variables

### Backend (.env in zinovia-backend/)
```env
DATABASE_URL=sqlite:///./zinovia.db
ALLOWED_ORIGINS=http://localhost:3000
EMAIL_ENABLED=false
```

### Frontend (.env.local in zinovia-frontend/)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚀 Production Deployment

For production, update:
1. Environment variables in docker-compose.yml
2. Use PostgreSQL instead of SQLite
3. Set proper CORS origins
4. Enable SSL/HTTPS
5. Use reverse proxy (nginx/traefik)

