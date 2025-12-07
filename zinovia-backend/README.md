# Zinovia Backend API

Python FastAPI backend for Zinovia AI Services website.

## 🚀 Quick Start

### Prerequisites

- Python 3.11 (recommended) / 3.10+
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

3. **Set up environment variables (configure chatbot LLM endpoint):**
```bash
cp .env.example .env
# Edit .env with your configuration

# Minimal environment variables for local chatbot testing
export APP_ENV=dev
export LLM_API_BASE_URL="http://localhost:11434"
export LLM_MODEL_NAME="llama3"
# Ollama exposes an OpenAI-compatible chat endpoint at /api/chat
export LLM_API_PATH="/api/chat"
# Optional extras:
# export LLM_API_KEY="your-key-if-required"
# export LLM_API_PATH="/v1/chat/completions"  # for OpenAI-style providers
# export LLM_IDENTITY_AUDIENCE="https://<cloud-run-llm-url>"  # required when calling an auth-protected Cloud Run LLM
# export DEBUG_MODE=true
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
│   ├── chatbot/             # Onboarding chatbot modules
│   │   ├── config.py        # Pydantic settings
│   │   ├── llm_client.py    # OpenAI-compatible client
│   │   ├── memory_store.py  # Ephemeral session store (temporary)
│   │   ├── models.py        # Chat request/response models
│   │   ├── services_descriptions.py  # Static service catalog
│   │   └── state.py         # State machine & transitions
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── email_service.py     # Email notifications
│   └── routers/             # API endpoints
│       ├── __init__.py
│       ├── chatbot.py       # POST /chat endpoint
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

#### Chatbot Conversation
```
POST /chat
Body: {
  "session_id": "d0c0892d-3e24-4fef-8f0f-9ef280ff0f01",
  "message": "Hi there!"
}
Response: {
  "reply": "...",
  "session_id": "...",
  "state": "ASK_USER_TYPE",
  "finished": false,
  "debug": {...} // only when DEBUG_MODE=true
}
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

## 🤖 Chatbot Flow

1. `GREETING` – welcome message and ask what brings the visitor here.
2. `ASK_USER_TYPE` – capture whether they are an individual, small business, or enterprise.
3. `ASK_GOAL` – understand the primary objective or challenge.
4. `SHOW_SERVICES` – present service catalog and recommend a fit.
5. `COLLECT_CONTACT_NAME` – request their name.
6. `COLLECT_CONTACT_EMAIL` – request an email (basic validation only).
7. `SUMMARY` – recap collected details and confirm follow-up.
8. `DONE` – support additional questions without repeating onboarding.

> ℹ️ Conversation state is stored in-memory for now. Cloud Run instances are ephemeral; plan to move this to Redis, Firestore, or another shared store for production.

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

- Update frontend `.env.local`:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
  ```
- The floating “Chat with Expert” widget should call `POST /chat` on this backend. Make sure the backend has `LLM_*` variables configured and reachable.
- Restrict CORS origins in production (currently set to allow localhost by default).

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

# Test chatbot endpoint (ensure LLM env vars are set and reachable)
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "123e4567-e89b-12d3-a456-426614174000",
    "message": "Hello there"
  }'

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
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### Artifact Registry (via Makefile)

From the repository root:

```bash
make backend-login                               # configure docker auth (gcloud required)
make backend-push BACKEND_IMAGE_TAG=dev          # build & push europe-west1-docker.pkg.dev/zinovia-ia/backend/zinovia-backend:dev
```

Override `BACKEND_REGISTRY_HOST`, `BACKEND_REGISTRY_REPO`, `BACKEND_IMAGE_NAME`, or `BACKEND_IMAGE_TAG` to match your registry naming convention.

### Ollama LLM Image

```bash
make llm-push \
  LLM_IMAGE_TAG=2025-11-09-llm \
  LLM_REGISTRY_REPO=zinovia-ia/backend
```

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
