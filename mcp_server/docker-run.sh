#!/bin/bash

# Docker run script for MCP Server

echo "🚀 Starting MCP Server with Docker..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with your DATABASE_URL"
    echo "Example:"
    echo "DATABASE_URL=postgresql://username:password@host:port/database"
    exit 1
fi

# Build and run with docker-compose
echo "📦 Building Docker image..."
docker-compose build

echo "🐳 Starting container..."
docker-compose up -d

echo "✅ Container started!"
echo "🌐 Server should be available at: http://localhost:3100"
echo "📊 Health check: http://localhost:3100/health"
echo ""
echo "📋 Useful commands:"
echo "  View logs: docker-compose logs -f"
echo "  Stop server: docker-compose down"
echo "  Restart: docker-compose restart"