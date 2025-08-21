#!/bin/bash

# Render build script that handles oracledb installation gracefully
echo "🚀 Starting Render build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Check if we're in a production environment without Oracle Instant Client
if [ ! -f "/usr/lib/oracle/instantclient/libclntsh.so" ] && [ "$NODE_ENV" == "production" ]; then
    echo "⚠️  Oracle Instant Client not found - using mock fallback for production"
    # Set environment variable to indicate Oracle is not available
    export ORACLE_AVAILABLE=false
fi

# Build the application
echo "🏗️  Building application..."
npm run build

echo "✅ Build completed successfully!"
