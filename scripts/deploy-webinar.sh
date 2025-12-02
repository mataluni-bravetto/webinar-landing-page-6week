#!/bin/bash
# Webinar Landing Page - One-Command Deployment
# Pattern: DEPLOYMENT × CONVERSION × SIMPLICITY × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (YAGNI)
# ∞ AbëONE ∞

set -euo pipefail

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Webinar Landing Page - Deployment                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Step 1: Validate
echo -e "${BLUE}━━━ Step 1: Pattern Validation ━━━${NC}"
if bash scripts/validate-vercel-patterns.sh; then
  echo -e "${GREEN}✅ Validation passed${NC}"
else
  echo -e "${RED}❌ Validation failed - fix issues before deploying${NC}"
  exit 1
fi

echo ""

# Step 2: Build
echo -e "${BLUE}━━━ Step 2: Build Test ━━━${NC}"
if npm run build; then
  echo -e "${GREEN}✅ Build successful${NC}"
else
  echo -e "${RED}❌ Build failed${NC}"
  exit 1
fi

echo ""

# Step 3: Environment Check
echo -e "${BLUE}━━━ Step 3: Environment Variables Check ━━━${NC}"
echo -e "${YELLOW}⚠️  Ensure these are set in Vercel Dashboard:${NC}"
echo "   - SENDGRID_API_KEY"
echo "   - SENDGRID_FROM_EMAIL"
echo "   - SENDGRID_FROM_NAME"
echo "   - NEXT_PUBLIC_APP_URL (auto-set)"
echo ""

# Step 4: Deploy
echo -e "${BLUE}━━━ Step 4: Deploy to Vercel ━━━${NC}"
if command -v vercel &> /dev/null; then
  echo -e "${GREEN}🚀 Deploying to production...${NC}"
  vercel --prod
else
  echo -e "${YELLOW}⚠️  Vercel CLI not installed${NC}"
  echo -e "${BLUE}Install with: npm i -g vercel${NC}"
  echo -e "${BLUE}Or deploy via: https://vercel.com/dashboard${NC}"
  echo ""
  echo -e "${GREEN}✅ Build complete - ready for manual deployment${NC}"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  Deployment Complete!                                     ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"

