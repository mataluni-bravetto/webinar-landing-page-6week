#!/bin/bash

# SendGrid Environment Setup Script
# This script helps you set up SendGrid environment variables

echo "🚀 SendGrid Environment Setup"
echo "=============================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled. Exiting."
        exit 0
    fi
fi

echo ""
echo "📝 Please provide your SendGrid credentials:"
echo ""

# Get API Key
read -p "SendGrid API Key (starts with SG.): " SENDGRID_API_KEY
if [ -z "$SENDGRID_API_KEY" ]; then
    echo "❌ API Key is required. Exiting."
    exit 1
fi

# Get From Email
read -p "Verified Sender Email: " SENDGRID_FROM_EMAIL
if [ -z "$SENDGRID_FROM_EMAIL" ]; then
    echo "❌ Sender Email is required. Exiting."
    exit 1
fi

# Get From Name (optional)
read -p "Sender Name (default: Bravetto Team): " SENDGRID_FROM_NAME
SENDGRID_FROM_NAME=${SENDGRID_FROM_NAME:-Bravetto Team}

# Create .env.local file
cat > .env.local << EOF
# SendGrid Configuration
# Generated on $(date)

SENDGRID_API_KEY=${SENDGRID_API_KEY}
SENDGRID_FROM_EMAIL=${SENDGRID_FROM_EMAIL}
SENDGRID_FROM_NAME="${SENDGRID_FROM_NAME}"

# Optional: Base URL for links in emails
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: GitHub repository URL
GITHUB_REPO_URL=https://github.com/bravetto/ai-validation-toolkit
EOF

echo ""
echo "✅ .env.local file created successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Run: npm run validate:sendgrid"
echo "   2. Restart your dev server: npm run dev"
echo "   3. Test registration on the landing page"
echo ""
echo "💡 To get your SendGrid API key:"
echo "   https://app.sendgrid.com/settings/api_keys"
echo ""
echo "💡 To verify your sender email:"
echo "   https://app.sendgrid.com/settings/sender_auth"
echo ""
