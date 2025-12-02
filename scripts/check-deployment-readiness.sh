#!/bin/bash
# Vercel Deployment Readiness Checker
# Pattern: DEPLOYMENT × READINESS × VALIDATION × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 530 Hz (YAGNI)
# Guardians: AEYON (999 Hz) + JØHN (530 Hz) + YAGNI (530 Hz)
# ∞ AbëONE ∞

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ROOT="${1:-$(pwd)}"
cd "$PROJECT_ROOT" || exit 1

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Vercel Deployment Readiness Check                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

READY=true

# Pre-flight checks
echo -e "${BLUE}━━━ Pre-Flight Checks ━━━${NC}"

# 1. Check Node.js version
if command -v node &> /dev/null; then
  NODE_VERSION=$(node -v)
  echo -e "${GREEN}✅ Node.js: $NODE_VERSION${NC}"
else
  echo -e "${RED}❌ Node.js not found${NC}"
  READY=false
fi

# 2. Check npm
if command -v npm &> /dev/null; then
  NPM_VERSION=$(npm -v)
  echo -e "${GREEN}✅ npm: $NPM_VERSION${NC}"
else
  echo -e "${RED}❌ npm not found${NC}"
  READY=false
fi

# 3. Check dependencies installed
if [ -d "node_modules" ]; then
  echo -e "${GREEN}✅ Dependencies installed${NC}"
else
  echo -e "${YELLOW}⚠️  node_modules not found - run: npm install${NC}"
fi

# 4. Check for required files
REQUIRED_FILES=("package.json" "next.config.js")
for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ] || [ -f "${file%.js}.ts" ]; then
    echo -e "${GREEN}✅ $file found${NC}"
  else
    echo -e "${RED}❌ $file not found${NC}"
    READY=false
  fi
done

echo ""

# Build test
echo -e "${BLUE}━━━ Build Test ━━━${NC}"
if [ -d "node_modules" ]; then
  echo -e "${BLUE}Running: npm run build${NC}"
  if npm run build 2>&1 | tee /tmp/build.log; then
    echo -e "${GREEN}✅ Build successful${NC}"
  else
    echo -e "${RED}❌ Build failed${NC}"
    echo -e "${YELLOW}Last 10 lines of build output:${NC}"
    tail -10 /tmp/build.log
    READY=false
  fi
else
  echo -e "${YELLOW}⚠️  Skipping build test (no node_modules)${NC}"
fi

echo ""

# Pattern validation
echo -e "${BLUE}━━━ Pattern Validation ━━━${NC}"
if [ -f "scripts/validate-vercel-patterns.sh" ]; then
  if bash scripts/validate-vercel-patterns.sh "$PROJECT_ROOT"; then
    echo -e "${GREEN}✅ Pattern validation passed${NC}"
  else
    echo -e "${RED}❌ Pattern validation failed${NC}"
    READY=false
  fi
else
  echo -e "${YELLOW}⚠️  Pattern validation script not found${NC}"
fi

echo ""

# Environment variables check
echo -e "${BLUE}━━━ Environment Variables Check ━━━${NC}"
if [ -f ".env.local" ] || [ -f ".env" ]; then
  echo -e "${GREEN}✅ Environment file found${NC}"
  
  # Check for required env vars in code
  if grep -r "process.env.SENDGRID_API_KEY" app api components 2>/dev/null | head -1 > /dev/null; then
    if grep -q "SENDGRID_API_KEY" .env.local .env 2>/dev/null; then
      echo -e "${GREEN}✅ SENDGRID_API_KEY configured${NC}"
    else
      echo -e "${YELLOW}⚠️  SENDGRID_API_KEY referenced but not in .env${NC}"
    fi
  fi
  
  if grep -r "NEXT_PUBLIC_" app components 2>/dev/null | head -1 > /dev/null; then
    if grep -q "NEXT_PUBLIC_" .env.local .env 2>/dev/null; then
      echo -e "${GREEN}✅ NEXT_PUBLIC_ variables configured${NC}"
    else
      echo -e "${YELLOW}⚠️  NEXT_PUBLIC_ variables referenced but not in .env${NC}"
    fi
  fi
else
  echo -e "${YELLOW}⚠️  No .env.local or .env file found${NC}"
  echo -e "${BLUE}ℹ️  Remember to configure environment variables in Vercel Dashboard${NC}"
fi

echo ""

# Final summary
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Deployment Readiness Summary                              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

if [ "$READY" = true ]; then
  echo -e "${GREEN}✅ READY FOR DEPLOYMENT${NC}"
  echo ""
  echo -e "${BLUE}Next steps:${NC}"
  echo -e "  1. Push to GitHub: ${GREEN}git push${NC}"
  echo -e "  2. Deploy to Vercel: ${GREEN}vercel --prod${NC}"
  echo -e "  3. Or connect GitHub repo in Vercel Dashboard"
  exit 0
else
  echo -e "${RED}❌ NOT READY FOR DEPLOYMENT${NC}"
  echo ""
  echo -e "${YELLOW}Please fix the issues above before deploying${NC}"
  exit 1
fi

