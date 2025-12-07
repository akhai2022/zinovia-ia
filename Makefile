.PHONY: help start stop restart docker-up docker-down docker-dev logs backend-login backend-build backend-push backend-push-only llm-build llm-push llm-push-only frontend-login frontend-build frontend-push frontend-push-only

help:
	@echo "Zinovia Development Commands:"
	@echo "  make start          - Start backend and frontend (native)"
	@echo "  make stop           - Stop all services"
	@echo "  make restart        - Restart all services"
	@echo "  make docker-up      - Start with Docker Compose"
	@echo "  make docker-down    - Stop Docker containers"
	@echo "  make docker-dev     - Start with Docker Compose (dev mode)"
	@echo "  make logs           - View logs"
	@echo "  make backend-push   - Build & push FastAPI backend image"
	@echo "  make llm-push       - Build & push Ollama LLM image"
	@echo "  make frontend-push  - Build & push Next.js frontend image"

start:
	@./start.sh

stop:
	@./stop.sh

restart: stop start

docker-up:
	@docker-compose up -d
	@echo "✅ Services starting..."
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:8000"
	@echo "API Docs: http://localhost:8000/docs"

docker-down:
	@docker-compose down

docker-dev:
	@docker-compose -f docker-compose.dev.yml up -d
	@echo "✅ Development services starting..."

logs:
	@docker-compose logs -f

# ---------------------------------------------------------------------------
# Container registry configuration (override via environment variables)
# ---------------------------------------------------------------------------
BACKEND_REGISTRY_HOST ?= europe-west1-docker.pkg.dev
BACKEND_REGISTRY_REPO ?= zinovia-ia/backend
BACKEND_IMAGE_NAME    ?= zinovia-backend
BACKEND_IMAGE_TAG     ?= dev
BACKEND_IMAGE_URI      = $(BACKEND_REGISTRY_HOST)/$(BACKEND_REGISTRY_REPO)/$(BACKEND_IMAGE_NAME):$(BACKEND_IMAGE_TAG)

backend-login:
	@gcloud auth configure-docker $(BACKEND_REGISTRY_HOST)

backend-build:
	@docker build \
		-f zinovia-backend/Dockerfile \
		-t $(BACKEND_IMAGE_URI) \
		zinovia-backend

backend-push: backend-build
	@docker push $(BACKEND_IMAGE_URI)

backend-push-only:
	@docker push $(BACKEND_IMAGE_URI)

# ---------------------------------------------------------------------------
# Ollama / LLM container registry configuration
# ---------------------------------------------------------------------------
LLM_REGISTRY_HOST ?= $(BACKEND_REGISTRY_HOST)
LLM_REGISTRY_REPO ?= zinovia-ia/backend
LLM_IMAGE_NAME    ?= zinovia-ollama
LLM_IMAGE_TAG     ?= dev
LLM_IMAGE_URI      = $(LLM_REGISTRY_HOST)/$(LLM_REGISTRY_REPO)/$(LLM_IMAGE_NAME):$(LLM_IMAGE_TAG)

llm-build:
	@docker build \
		-f zinovia-backend/llm/Dockerfile \
		-t $(LLM_IMAGE_URI) \
		zinovia-backend/llm

llm-push: llm-build
	@docker push $(LLM_IMAGE_URI)

llm-push-only:
	@docker push $(LLM_IMAGE_URI)

# ---------------------------------------------------------------------------
# Frontend container registry configuration
# ---------------------------------------------------------------------------
FRONTEND_REGISTRY_HOST ?= europe-west1-docker.pkg.dev
FRONTEND_REGISTRY_REPO ?= zinovia-ia/frontend
FRONTEND_IMAGE_NAME    ?= zinovia-frontend
FRONTEND_IMAGE_TAG     ?= logo-update-$(shell date +%Y%m%d-%H%M%S)
FRONTEND_IMAGE_URI      = $(FRONTEND_REGISTRY_HOST)/$(FRONTEND_REGISTRY_REPO)/$(FRONTEND_IMAGE_NAME):$(FRONTEND_IMAGE_TAG)

frontend-login:
	@gcloud auth configure-docker $(FRONTEND_REGISTRY_HOST)

frontend-build:
	@echo "Building frontend image with tag: $(FRONTEND_IMAGE_TAG)"
	@docker build \
		-f zinovia-frontend/Dockerfile \
		-t $(FRONTEND_IMAGE_URI) \
		zinovia-frontend

frontend-push: frontend-build
	@echo "Pushing frontend image: $(FRONTEND_IMAGE_URI)"
	@docker push $(FRONTEND_IMAGE_URI)
	@echo "✅ Frontend image pushed: $(FRONTEND_IMAGE_URI)"
	@echo ""
	@echo "Update dev.tfvars with:"
	@echo "  image = \"$(FRONTEND_IMAGE_URI)\""

frontend-push-only:
	@docker push $(FRONTEND_IMAGE_URI)

