# Zinovia Backend Requirements

## 🎯 Why You Need a Backend

Currently, forms are just simulating submissions. A backend is essential for:

### ✅ Critical Features Requiring Backend

1. **Lead Generation & CRM**
   - Store contact form submissions
   - Capture leads from newsletter signups
   - Track user interests and engagement
   - Export to CRM systems (Salesforce, HubSpot)

2. **Customer Data Management**
   - Customer contact information
   - Company details and requirements
   - Project inquiries and history
   - Communication logs

3. **Analytics & Insights**
   - Form submission analytics
   - Newsletter subscriber metrics
   - User behavior tracking
   - Conversion funnel analysis

4. **Email Notifications**
   - Send confirmation emails to customers
   - Notify your team of new inquiries
   - Newsletter subscription confirmations
   - Automated follow-ups

5. **Security & Validation**
   - Server-side form validation
   - Spam protection (reCAPTCHA, rate limiting)
   - Data sanitization
   - Secure data storage

6. **Business Operations**
   - Schedule demo/consultation bookings
   - Manage case studies dynamically
   - Content management (blog, resources)
   - User authentication (admin panel)

---

## 📋 Recommended Backend Features

### Phase 1: Essential (MVP)

#### 1. Contact Form API
```
POST /api/contact
- Store contact form submissions
- Send email notifications
- Return success/error responses
```

#### 2. Newsletter Subscription API
```
POST /api/newsletter/subscribe
- Store email addresses
- Prevent duplicates
- Send confirmation email
```

#### 3. Database Schema
- `contacts` table: name, email, company, message, created_at
- `newsletter_subscribers` table: email, subscribed_at, active
- `form_submissions` table: type, data, status, created_at

---

### Phase 2: Enhanced Features

#### 4. Analytics API
```
GET /api/analytics/submissions
GET /api/analytics/subscribers
GET /api/analytics/trends
```

#### 5. Admin API (with authentication)
```
GET /api/admin/contacts
GET /api/admin/subscribers
PUT /api/admin/contacts/:id/status
DELETE /api/admin/subscribers/:id
```

#### 6. Case Studies Management
```
GET /api/case-studies
POST /api/admin/case-studies
PUT /api/admin/case-studies/:id
```

---

### Phase 3: Advanced Features

#### 7. CRM Integration
- Salesforce integration
- HubSpot sync
- Zapier webhooks

#### 8. Email Service
- SendGrid / Mailgun integration
- Email templates
- Automated follow-ups

#### 9. Authentication & Authorization
- Admin login
- JWT tokens
- Role-based access control

---

## 🗄️ Database Schema Recommendations

### PostgreSQL/SQLite Schema

```sql
-- Contacts Table
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, converted
    source VARCHAR(50) DEFAULT 'contact_form',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    unsubscribed_at TIMESTAMP,
    source VARCHAR(50) DEFAULT 'website'
);

-- Form Submissions (for analytics)
CREATE TABLE form_submissions (
    id SERIAL PRIMARY KEY,
    form_type VARCHAR(50) NOT NULL, -- contact, newsletter, demo_request
    form_data JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Case Studies (optional, for dynamic content)
CREATE TABLE case_studies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    description TEXT,
    results JSONB,
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🛠️ Technology Stack Recommendations

### Option 1: FastAPI (Recommended for Python)
- Fast, modern Python framework
- Automatic API documentation
- Easy async support
- Great for ML/AI integrations

### Option 2: Flask
- Simpler, lightweight
- Good for quick MVP
- Large ecosystem

### Option 3: Django REST Framework
- Full-featured, batteries included
- Admin panel built-in
- Good for complex applications

### Database Options:
- **PostgreSQL** (production) - robust, feature-rich
- **SQLite** (development/testing) - simple, no setup needed
- **MongoDB** (if you prefer NoSQL) - flexible schema

---

## 📡 API Endpoints to Implement

### Public Endpoints

```python
# Contact Form
POST /api/v1/contact
Body: { name, email, company, message }
Response: { success: true, message: "Thank you!" }

# Newsletter
POST /api/v1/newsletter/subscribe
Body: { email }
Response: { success: true, message: "Subscribed!" }

POST /api/v1/newsletter/unsubscribe
Body: { email }
Response: { success: true }
```

### Admin Endpoints (Authenticated)

```python
# Get all contacts
GET /api/v1/admin/contacts?page=1&limit=20

# Update contact status
PUT /api/v1/admin/contacts/{id}
Body: { status: "contacted" }

# Get analytics
GET /api/v1/admin/analytics/dashboard
```

---

## 🔐 Security Considerations

1. **Rate Limiting**: Prevent spam (max 5 submissions/hour per IP)
2. **Input Validation**: Server-side validation
3. **SQL Injection Prevention**: Use ORM/parameterized queries
4. **CORS Configuration**: Allow only your frontend domain
5. **Environment Variables**: Store secrets securely
6. **Email Verification**: Optional double opt-in for newsletter

---

## 📧 Email Integration

### Recommended Services:
- **SendGrid** - 100 emails/day free
- **Mailgun** - 5,000 emails/month free
- **AWS SES** - Very cheap
- **Resend** - Modern, developer-friendly

### Email Templates Needed:
1. Contact form confirmation (to customer)
2. New lead notification (to your team)
3. Newsletter welcome email
4. Newsletter unsubscribe confirmation

---

## 🚀 Quick Start Implementation Priority

**Week 1:**
1. Set up FastAPI/Flask project
2. Create database schema
3. Implement POST /api/contact
4. Implement POST /api/newsletter/subscribe
5. Basic email sending

**Week 2:**
6. Add admin endpoints
7. Implement analytics
8. Add rate limiting & security
9. Frontend integration
10. Testing & deployment

---

## 📊 Expected Data Flow

```
User fills form
    ↓
Frontend validates (client-side)
    ↓
POST /api/contact
    ↓
Backend validates (server-side)
    ↓
Store in database
    ↓
Send email notifications
    ↓
Return success response
    ↓
Frontend shows success message
```

---

## 💡 Next Steps

1. Choose Python framework (FastAPI recommended)
2. Set up database (PostgreSQL or SQLite)
3. Implement basic contact form endpoint
4. Set up email service
5. Connect frontend to backend
6. Add authentication for admin panel
7. Implement analytics

---

This backend will transform your static website into a lead generation machine! 🚀

