.PHONY: help start stop restart docker-up docker-down docker-dev logs backend-login backend-build backend-push backend-push-only

help:
	@echo "Zinovia Development Commands:"
	@echo "  make start          - Start backend and frontend (native)"
	@echo "  make stop           - Stop all services"
	@echo "  make restart        - Restart all services"
	@echo "  make docker-up      - Start with Docker Compose"
	@echo "  make docker-down    - Stop Docker containers"
	@echo "  make docker-dev     - Start with Docker Compose (dev mode)"
	@echo "  make logs           - View logs"

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

