#!/bin/bash
# Quick start script for Zinovia (Development mode without Docker)

echo "🚀 Starting Zinovia Development Environment..."

# Start Backend
echo "📦 Starting Backend..."
cd zinovia-backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi
source venv/bin/activate
pip install -q -r requirements.txt > /dev/null 2>&1
uvicorn main:app --reload --host 0.0.0.0 --port 8000 > /tmp/zinovia-backend.log 2>&1 &
BACKEND_PID=$!
cd ..
echo "✅ Backend started (PID: $BACKEND_PID) - http://localhost:8000"

# Wait a moment for backend to start
sleep 2

# Start Frontend
echo "🎨 Starting Frontend..."
cd zinovia-frontend
npm run dev > /tmp/zinovia-frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..
echo "✅ Frontend started (PID: $FRONTEND_PID) - http://localhost:3000"

echo ""
echo "🎉 Zinovia is running!"
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend API: http://localhost:8000"
echo "📍 API Docs: http://localhost:8000/docs"
echo ""
echo "📝 Logs:"
echo "   Backend: tail -f /tmp/zinovia-backend.log"
echo "   Frontend: tail -f /tmp/zinovia-frontend.log"
echo ""
echo "🛑 To stop: pkill -f 'uvicorn|next dev'"
echo ""

# Save PIDs for cleanup
echo $BACKEND_PID > /tmp/zinovia-backend.pid
echo $FRONTEND_PID > /tmp/zinovia-frontend.pid

