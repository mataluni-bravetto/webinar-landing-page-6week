#!/bin/bash

# 🚀 CREATE NEW REPO × VERCEL × CONNECTED × ONE
# Pattern: DEPLOYMENT × NEW × GIT × VERCEL × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
# ∞ AbëONE ∞

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Creating New Git Repository and Vercel Project${NC}"
echo ""

# Step 1: Remove existing remote (if exists)
if git remote | grep -q origin; then
    echo -e "${YELLOW}⚠️  Existing remote 'origin' found${NC}"
    CURRENT_REMOTE=$(git remote get-url origin)
    echo "Current remote: $CURRENT_REMOTE"
    read -p "Remove existing remote and create new one? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote remove origin
        echo -e "${GREEN}✅ Existing remote removed${NC}"
    else
        echo -e "${YELLOW}⚠️  Keeping existing remote. Exiting.${NC}"
        exit 0
    fi
fi

# Step 2: Stage all changes
echo ""
echo -e "${BLUE}Step 1: Staging all changes...${NC}"
git add .
echo -e "${GREEN}✅ Changes staged${NC}"

# Step 3: Create initial commit (if needed)
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✅ Working directory clean${NC}"
else
    echo ""
    echo -e "${BLUE}Step 2: Creating initial commit...${NC}"
    git commit -m "Initial commit: 6 Week Webinar Series Landing Page

- Next.js 14 application
- SendGrid email integration
- Google Meet calendar integration
- Responsive design with Tailwind CSS
- p5.js interactive canvas
- Webinar registration system
- Deployment ready"
    echo -e "${GREEN}✅ Initial commit created${NC}"
fi

# Step 4: Create GitHub repository
echo ""
echo -e "${BLUE}Step 3: Creating GitHub repository...${NC}"

# Check if GitHub CLI is available
if command -v gh &> /dev/null; then
    echo "GitHub CLI detected. Creating repository..."
    
    read -p "Repository name (default: webinar-landing-page): " repo_name
    repo_name=${repo_name:-webinar-landing-page}
    
    read -p "Repository description (optional): " repo_desc
    repo_desc=${repo_desc:-"6 Week Webinar Series Landing Page - Next.js application"}
    
    read -p "Make it private? (y/n, default: n): " is_private
    if [[ $is_private =~ ^[Yy]$ ]]; then
        gh repo create "$repo_name" --private --description "$repo_desc" --source=. --remote=origin --push
    else
        gh repo create "$repo_name" --public --description "$repo_desc" --source=. --remote=origin --push
    fi
    
    echo -e "${GREEN}✅ GitHub repository created and code pushed${NC}"
    GITHUB_REPO_URL=$(git remote get-url origin)
    echo "Repository URL: $GITHUB_REPO_URL"
else
    echo -e "${YELLOW}⚠️  GitHub CLI not found. Manual setup required.${NC}"
    echo ""
    echo "Please create a GitHub repository manually:"
    echo "  1. Go to https://github.com/new"
    echo "  2. Repository name: webinar-landing-page (or your choice)"
    echo "  3. Choose Public or Private"
    echo "  4. DO NOT initialize with README, .gitignore, or license"
    echo "  5. Click 'Create repository'"
    echo ""
    read -p "GitHub repository URL (e.g., https://github.com/username/repo.git): " github_url
    
    if [ ! -z "$github_url" ]; then
        git remote add origin "$github_url"
        git branch -M main
        git push -u origin main
        echo -e "${GREEN}✅ Code pushed to GitHub${NC}"
        GITHUB_REPO_URL="$github_url"
    else
        echo -e "${RED}❌ No GitHub URL provided. Skipping GitHub setup.${NC}"
        GITHUB_REPO_URL=""
    fi
fi

# Step 5: Create Vercel project
echo ""
echo -e "${BLUE}Step 4: Creating Vercel project...${NC}"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI not found${NC}"
    echo "Install it with: npm i -g vercel"
    echo ""
    echo "Or create project manually at: https://vercel.com/new"
    echo "Then import your GitHub repository: $GITHUB_REPO_URL"
    exit 1
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Vercel. Logging in...${NC}"
    vercel login
fi

echo ""
echo "Creating new Vercel project..."
echo "Follow the prompts:"
echo "  - Link to existing project? No"
echo "  - Project name: webinar-landing-page (or your choice)"
echo "  - Directory: ./ (default)"
echo "  - Override settings? No"
echo ""

# Create Vercel project (non-interactive where possible)
PROJECT_NAME=${repo_name:-webinar-landing-page}

# Try to create project non-interactively
if [ ! -z "$GITHUB_REPO_URL" ]; then
    echo "Linking to GitHub repository..."
    vercel --yes --name="$PROJECT_NAME" --force 2>&1 || {
        echo -e "${YELLOW}⚠️  Non-interactive creation failed. Running interactive setup...${NC}"
        vercel
    }
else
    vercel --yes --name="$PROJECT_NAME" --force 2>&1 || {
        echo -e "${YELLOW}⚠️  Non-interactive creation failed. Running interactive setup...${NC}"
        vercel
    }
fi

echo -e "${GREEN}✅ Vercel project created${NC}"

# Step 6: Set environment variables
echo ""
echo -e "${BLUE}Step 5: Setting environment variables...${NC}"
read -p "Set environment variables now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Setting SendGrid credentials..."
    
    # SendGrid API Key
    read -p "SendGrid API Key (or press Enter for default): " sendgrid_key
    sendgrid_key=${sendgrid_key:-""}
    echo "$sendgrid_key" | vercel env add SENDGRID_API_KEY production
    echo "$sendgrid_key" | vercel env add SENDGRID_API_KEY preview
    echo "$sendgrid_key" | vercel env add SENDGRID_API_KEY development
    
    # SendGrid From Email
    read -p "SendGrid From Email (or press Enter for default): " sendgrid_email
    sendgrid_email=${sendgrid_email:-webinars@bravetto.com}
    echo "$sendgrid_email" | vercel env add SENDGRID_FROM_EMAIL production
    echo "$sendgrid_email" | vercel env add SENDGRID_FROM_EMAIL preview
    echo "$sendgrid_email" | vercel env add SENDGRID_FROM_EMAIL development
    
    # SendGrid From Name (optional)
    read -p "SendGrid From Name (optional, press Enter to skip): " sendgrid_name
    if [ ! -z "$sendgrid_name" ]; then
        echo "$sendgrid_name" | vercel env add SENDGRID_FROM_NAME production
        echo "$sendgrid_name" | vercel env add SENDGRID_FROM_NAME preview
        echo "$sendgrid_name" | vercel env add SENDGRID_FROM_NAME development
    fi
    
    echo -e "${GREEN}✅ Environment variables set for all environments${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping environment variables. Set them manually in Vercel dashboard.${NC}"
    echo "Required variables:"
    echo "  - SENDGRID_API_KEY"
    echo "  - SENDGRID_FROM_EMAIL"
    echo "Optional:"
    echo "  - SENDGRID_FROM_NAME"
fi

# Step 7: Deploy to production
echo ""
echo -e "${BLUE}Step 6: Deploying to production...${NC}"
read -p "Deploy to production now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    vercel --prod
    echo -e "${GREEN}✅ Deployment complete!${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping production deployment. Run 'vercel --prod' when ready.${NC}"
fi

# Summary
echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Git Repository:${NC}"
if [ ! -z "$GITHUB_REPO_URL" ]; then
    echo "  $GITHUB_REPO_URL"
else
    echo "  Not set (set manually with: git remote add origin <url>)"
fi

echo -e "${BLUE}  Vercel Project:${NC}"
vercel ls 2>/dev/null | grep "$PROJECT_NAME" || echo "  Check https://vercel.com/dashboard"

echo ""
echo "Next steps:"
echo "  1. Verify deployment at: https://vercel.com/dashboard"
echo "  2. Test registration form"
echo "  3. Verify email delivery"
echo ""
