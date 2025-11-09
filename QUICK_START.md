# 🚀 Quick Start Guide

## Start Everything (3 Methods)

### Method 1: Docker Compose (Easiest)

```bash
# Production
docker-compose up -d

# Development (with hot reload)
docker-compose -f docker-compose.dev.yml up -d
```

### Method 2: Quick Script

```bash
./start.sh
```

### Method 3: Makefile

```bash
make start          # Native development
make docker-up      # Docker production
make docker-dev     # Docker development
```

## ✅ Verify Services

- **Frontend**: http://localhost:3000 ✅
- **Backend API**: http://localhost:8000 ✅
- **API Docs**: http://localhost:8000/docs ✅

## 🛑 Stop Services

```bash
# Docker
docker-compose down

# Native
./stop.sh
# or
make stop
```

## 📊 Current Status

Both services are configured and ready. Use any method above to start!

