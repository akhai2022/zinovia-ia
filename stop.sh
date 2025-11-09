#!/bin/bash
# Stop script for Zinovia

echo "🛑 Stopping Zinovia..."

# Stop processes
pkill -f "uvicorn main:app"
pkill -f "next dev"

# Clean up PID files
rm -f /tmp/zinovia-backend.pid
rm -f /tmp/zinovia-frontend.pid

echo "✅ All services stopped"

