# Zinovia Backend API

Python FastAPI backend for Zinovia AI Services website.

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- pip (Python package manager)

### Installation

1. **Create virtual environment:**
```bash
cd zinovia-backend
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Run the server:**
```bash
# Development mode (auto-reload)
uvicorn main:app --reload

# Or production mode
uvicorn main:app --host 0.0.0.0 --port 8000
```

5. **Access API Documentation:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 📁 Project Structure

```
zinovia-backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app initialization
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── email_service.py     # Email notifications
│   └── routers/             # API endpoints
│       ├── __init__.py
│       ├── health.py        # Health check
│       ├── contact.py       # Contact form
│       └── newsletter.py    # Newsletter subscription
├── main.py                  # Entry point
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

---

## 🔌 API Endpoints

### Public Endpoints

#### Health Check
```
GET /api/v1/health
```

#### Submit Contact Form
```
POST /api/v1/contact
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "message": "I'm interested in your AI solutions"
}
```

#### Subscribe to Newsletter
```
POST /api/v1/newsletter/subscribe
Body: {
  "email": "user@example.com"
}
```

#### Unsubscribe from Newsletter
```
POST /api/v1/newsletter/unsubscribe
Body: {
  "email": "user@example.com"
}
```

---

## 🗄️ Database

### Default: SQLite
- No setup required
- Database file: `zinovia.db` (created automatically)

### Production: PostgreSQL
1. Install PostgreSQL
2. Create database: `CREATE DATABASE zinovia;`
3. Update `.env`: `DATABASE_URL=postgresql://user:password@localhost:5432/zinovia`
4. Install driver: `pip install psycopg2-binary`

---

## 📧 Email Configuration (Optional)

Email notifications are disabled by default. To enable:

1. Update `.env`:
```env
EMAIL_ENABLED=true
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@zinovia.com
```

2. For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833)

---

## 🔒 Security Features

- ✅ Rate limiting (5 contact submissions/hour, 10 newsletter subscriptions/hour)
- ✅ Input validation with Pydantic
- ✅ CORS protection
- ✅ SQL injection prevention (SQLAlchemy ORM)
- ✅ Email validation

---

## 🔗 Frontend Integration

1. Update frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

2. The frontend forms will automatically connect to the backend when running.

---

## 📊 Database Tables

### contacts
- Stores contact form submissions
- Fields: id, name, email, company, message, status, created_at

### newsletter_subscribers
- Stores newsletter email subscriptions
- Fields: id, email, subscribed_at, active, unsubscribed_at

### form_submissions
- Analytics/logging for all form submissions
- Fields: id, form_type, form_data, ip_address, user_agent, created_at

---

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:8000/api/v1/health

# Test contact form
curl -X POST http://localhost:8000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Co",
    "message": "This is a test message"
  }'

# Test newsletter subscription
curl -X POST http://localhost:8000/api/v1/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

---

## 🚀 Deployment

### Docker (Recommended)
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Artifact Registry (via Makefile)

From the repository root:

```bash
make backend-login                               # configure docker auth (gcloud required)
make backend-push BACKEND_IMAGE_TAG=dev          # build & push europe-west1-docker.pkg.dev/zinovia-ia/backend/zinovia-backend:dev
```

Override `BACKEND_REGISTRY_HOST`, `BACKEND_REGISTRY_REPO`, `BACKEND_IMAGE_NAME`, or `BACKEND_IMAGE_TAG` to match your registry naming convention.

### Production Checklist
- [ ] Set `ENVIRONMENT=production` in `.env`
- [ ] Use PostgreSQL instead of SQLite
- [ ] Set secure `SECRET_KEY`
- [ ] Configure proper CORS origins
- [ ] Enable email notifications
- [ ] Set up SSL/HTTPS
- [ ] Configure logging
- [ ] Set up monitoring

---

## 📝 Next Steps

1. **Add Admin Panel** (optional):
   - View/manage contacts
   - Export data
   - Analytics dashboard

2. **Add Authentication** (optional):
   - JWT tokens
   - Admin login
   - Protected endpoints

3. **Add CRM Integration**:
   - Salesforce webhook
   - HubSpot sync
   - Zapier integration

4. **Add More Features**:
   - Demo booking
   - File uploads
   - Case study management

---

## 🤝 Support

For issues or questions, contact: hello@zinovia.com
