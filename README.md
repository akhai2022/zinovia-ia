# Zinovia Project

This repository contains the complete Zinovia project with both frontend and backend.

## Project Structure

```
zinovia/
├── zinovia-frontend/    # Next.js frontend application
└── zinovia-backend/      # Python backend application (ready for setup)
```

## Quick Start

### Frontend

```bash
cd zinovia-frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

> **Note:** The frontend contact and newsletter forms call the backend API (`NEXT_PUBLIC_API_URL`). Keep the backend running locally or provide a deployed API before testing those flows.

### Backend

```bash
cd zinovia-backend
# Set up your Python environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt  # When requirements.txt is created
```

#### Build & Push the backend container (Artifact Registry)

```bash
# From the repository root
make backend-login                   # one-time registry auth (requires gcloud)
make backend-push BACKEND_IMAGE_TAG=dev
```

Override `BACKEND_REGISTRY_HOST`, `BACKEND_REGISTRY_REPO`, `BACKEND_IMAGE_NAME`, or `BACKEND_IMAGE_TAG` as needed, e.g.:

```bash
make backend-push \
  BACKEND_REGISTRY_HOST=europe-west1-docker.pkg.dev \
  BACKEND_REGISTRY_REPO=zinovia-ia/backend \
  BACKEND_IMAGE_TAG=prod
```

## Documentation

- Frontend documentation: See `zinovia-frontend/README.md`
- Backend documentation: See `zinovia-backend/README.md`

