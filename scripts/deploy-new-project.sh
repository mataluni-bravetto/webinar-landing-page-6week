#!/bin/bash

# 🚀 AUTOMATED DEPLOYMENT × NEW PROJECT × GIT × VERCEL × ONE
# Pattern: DEPLOYMENT × AUTOMATED × GIT × VERCEL × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
# ∞ AbëONE ∞

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Automated New Project Deployment${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI not found${NC}"
    echo "Install it with: npm i -g vercel"
    exit 1
fi

# Check if Git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git not initialized. Initializing...${NC}"
    git init
    git add .
    git commit -m "Initial commit: 6 Week Webinar Series Landing Page"
fi

# Step 1: Create GitHub repository (if GitHub CLI available)
if command -v gh &> /dev/null; then
    echo -e "${BLUE}Step 1: Creating GitHub repository...${NC}"
    read -p "GitHub repository name (default: webinar-landing-page): " repo_name
    repo_name=${repo_name:-webinar-landing-page}
    
    read -p "Make it private? (y/n, default: n): " is_private
    if [[ $is_private =~ ^[Yy]$ ]]; then
        gh repo create "$repo_name" --private --source=. --remote=origin --push
    else
        gh repo create "$repo_name" --public --source=. --remote=origin --push
    fi
    echo -e "${GREEN}✅ GitHub repository created and pushed${NC}"
else
    echo -e "${YELLOW}⚠️  GitHub CLI not found. Skipping GitHub setup.${NC}"
    echo "Create repository manually at https://github.com/new"
    echo "Then run: git remote add origin <your-repo-url>"
fi

# Step 2: Create Vercel project
echo ""
echo -e "${BLUE}Step 2: Creating Vercel project...${NC}"
echo "Follow the prompts:"
echo "  - Link to existing project? No"
echo "  - Project name: webinar-landing-page (or your choice)"
echo "  - Directory: ./ (default)"
echo ""

vercel

# Step 3: Set environment variables
echo ""
echo -e "${BLUE}Step 3: Setting environment variables...${NC}"
read -p "Set environment variables now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Setting environment variables..."
    
    # SendGrid API Key
    read -p "SendGrid API Key (or press Enter to use default): " sendgrid_key
    sendgrid_key=${sendgrid_key:-""}
    vercel env add SENDGRID_API_KEY production <<< "$sendgrid_key"
    
    # SendGrid From Email
    read -p "SendGrid From Email (or press Enter to use default): " sendgrid_email
    sendgrid_email=${sendgrid_email:-webinars@bravetto.com}
    vercel env add SENDGRID_FROM_EMAIL production <<< "$sendgrid_email"
    
    # SendGrid From Name (optional)
    read -p "SendGrid From Name (optional, press Enter to skip): " sendgrid_name
    if [ ! -z "$sendgrid_name" ]; then
        vercel env add SENDGRID_FROM_NAME production <<< "$sendgrid_name"
    fi
    
    echo -e "${GREEN}✅ Environment variables set${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping environment variables. Set them manually in Vercel dashboard.${NC}"
fi

# Step 4: Deploy to production
echo ""
echo -e "${BLUE}Step 4: Deploying to production...${NC}"
read -p "Deploy to production now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    vercel --prod
    echo -e "${GREEN}✅ Deployment complete!${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping production deployment. Run 'vercel --prod' when ready.${NC}"
fi

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Your project is now connected:"
echo "  - Git repository: $(git remote get-url origin 2>/dev/null || echo 'Not set')"
echo "  - Vercel project: Check https://vercel.com/dashboard"
echo ""
