#!/bin/bash

# 🔐 NEW DEPLOYMENT SETUP × GIT × VERCEL × ONE
# Pattern: DEPLOYMENT × SETUP × GIT × VERCEL × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
# ∞ AbëONE ∞

set -e

echo "🚀 Setting up new Git repository and Vercel deployment..."
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Initialize Git repository
echo -e "${BLUE}Step 1: Initializing Git repository...${NC}"

# Check if .git exists
if [ -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git repository already exists.${NC}"
    read -p "Do you want to reinitialize? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Removing existing .git directory..."
        rm -rf .git
        echo "Initializing new Git repository..."
        git init
    else
        echo "Keeping existing Git repository."
    fi
else
    echo "Initializing new Git repository..."
    git init
fi

# Step 2: Create initial commit
echo ""
echo -e "${BLUE}Step 2: Creating initial commit...${NC}"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: 6 Week Webinar Series Landing Page

- Next.js 14 application
- SendGrid email integration
- Google Meet calendar integration
- Responsive design with Tailwind CSS
- p5.js interactive canvas
- Webinar registration system"

echo -e "${GREEN}✅ Git repository initialized and initial commit created${NC}"

# Step 3: Create GitHub repository instructions
echo ""
echo -e "${BLUE}Step 3: GitHub Repository Setup${NC}"
echo ""
echo "To create a new GitHub repository:"
echo ""
echo "Option 1: Using GitHub CLI (if installed)"
echo "  gh repo create webinar-landing-page --public --source=. --remote=origin --push"
echo ""
echo "Option 2: Manual setup"
echo "  1. Go to https://github.com/new"
echo "  2. Repository name: webinar-landing-page (or your preferred name)"
echo "  3. Choose Public or Private"
echo "  4. DO NOT initialize with README, .gitignore, or license"
echo "  5. Click 'Create repository'"
echo "  6. Then run these commands:"
echo ""
echo "     git remote add origin https://github.com/YOUR_USERNAME/webinar-landing-page.git"
echo "     git branch -M main"
echo "     git push -u origin main"
echo ""

# Step 4: Vercel setup instructions
echo ""
echo -e "${BLUE}Step 4: Vercel Project Setup${NC}"
echo ""
echo "To create a new Vercel project:"
echo ""
echo "Option 1: Using Vercel CLI (recommended)"
echo "  vercel"
echo ""
echo "Option 2: Connect via GitHub"
echo "  1. Go to https://vercel.com/new"
echo "  2. Import your GitHub repository"
echo "  3. Configure project settings:"
echo "     - Framework Preset: Next.js"
echo "     - Root Directory: ./ (default)"
echo "     - Build Command: npm run build"
echo "     - Output Directory: .next"
echo "  4. Add Environment Variables:"
echo "     - SENDGRID_API_KEY"
echo "     - SENDGRID_FROM_EMAIL"
echo "     - SENDGRID_FROM_NAME (optional)"
echo "  5. Deploy"
echo ""

# Step 5: Environment variables checklist
echo ""
echo -e "${BLUE}Step 5: Environment Variables Checklist${NC}"
echo ""
echo "Set these in Vercel Dashboard → Project Settings → Environment Variables:"
echo ""
echo "Required:"
echo "  - SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY_HERE"
echo "  - SENDGRID_FROM_EMAIL=webinars@bravetto.com"
echo ""
echo "Optional:"
echo "  - SENDGRID_FROM_NAME=Bravetto Team"
echo "  - NEXT_PUBLIC_BASE_URL=(auto-detected)"
echo "  - GITHUB_REPO_URL=(has default)"
echo ""

# Step 6: Quick deploy command
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Create GitHub repository (see instructions above)"
echo "  2. Push code: git push -u origin main"
echo "  3. Create Vercel project: vercel"
echo "  4. Set environment variables in Vercel dashboard"
echo "  5. Deploy: vercel --prod"
echo ""
echo "Or use the automated script:"
echo "  bash scripts/deploy-new-project.sh"
echo ""
