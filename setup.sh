#!/bin/bash
echo "🚀 Setting up QUITUS DIOR Demo..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed or not in PATH."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (this may take a minute)..."
    npm install
else
    echo "✅ Dependencies already installed."
fi

# Start the dev server
echo "✨ Starting Development Server..."
npm run dev
