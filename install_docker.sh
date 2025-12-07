#!/bin/bash
# Docker Installation Script for Linux
# This script installs Docker Engine using the official Docker repository

set -e

echo "🐳 Installing Docker..."

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    echo "Please run this script with sudo: sudo ./install_docker.sh"
    exit 1
fi

# Remove old versions if they exist
echo "📦 Removing old Docker versions..."
apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

# Install prerequisites
echo "📥 Installing prerequisites..."
apt-get update
apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
echo "🔑 Adding Docker's official GPG key..."
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

# Set up the repository
echo "📚 Setting up Docker repository..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
echo "⬇️  Installing Docker Engine..."
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker service
echo "🚀 Starting Docker service..."
systemctl start docker
systemctl enable docker

# Add current user to docker group (if not root)
if [ -n "$SUDO_USER" ]; then
    echo "👤 Adding $SUDO_USER to docker group..."
    usermod -aG docker $SUDO_USER
    echo "⚠️  Note: You may need to log out and log back in for group changes to take effect."
fi

# Verify installation
echo "✅ Verifying Docker installation..."
docker --version
docker compose version

echo ""
echo "🎉 Docker installation completed successfully!"
echo ""
echo "To use Docker without sudo, log out and log back in, or run:"
echo "  newgrp docker"
echo ""
echo "To test Docker, run:"
echo "  docker run hello-world"
