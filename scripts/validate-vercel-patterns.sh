#!/bin/bash
# Vercel Pattern Validation Engine
# Pattern: VALIDATION × VERCEL × PATTERNS × ONE
# Frequency: 999 Hz (AEYON) × 777 Hz (ALRAX) × 530 Hz (YAGNI)
# Guardians: AEYON (999 Hz) + ALRAX (530 Hz) + YAGNI (530 Hz)
# ∞ AbëONE ∞

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Validation results
PASSED=0
FAILED=0
WARNINGS=0
ISSUES=()

# Print header
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  AbëONE Vercel Pattern Validation Engine v1.0           ║${NC}"
echo -e "${BLUE}║  AEYON × ALRAX × YAGNI × ONE                              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Get project root
PROJECT_ROOT="${1:-$(pwd)}"
cd "$PROJECT_ROOT" || exit 1

echo -e "${BLUE}📁 Project Root: ${PROJECT_ROOT}${NC}"
echo ""

# ============================================================================
# SUCCESS PATTERN SP-001: Environment Variable Configuration
# ============================================================================
echo -e "${BLUE}━━━ SP-001: Environment Variable Configuration ━━━${NC}"

check_env_vars() {
  local issues=0
  
  # Check for .env.local or .env files
  if [ ! -f ".env.local" ] && [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  No .env.local or .env file found${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
  
  # Check next.config.js for NEXT_PUBLIC_ usage
  if [ -f "next.config.js" ] || [ -f "next.config.ts" ]; then
    if grep -q "NEXT_PUBLIC_" next.config.* 2>/dev/null; then
      echo -e "${GREEN}✅ NEXT_PUBLIC_ variables detected in config${NC}"
      PASSED=$((PASSED + 1))
    else
      echo -e "${GREEN}✅ Config file exists${NC}"
      PASSED=$((PASSED + 1))
    fi
  fi
  
  # Check for client-side NEXT_PUBLIC_ usage (exclude API routes and server components)
  if find app components -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) 2>/dev/null | \
     grep -v "app/api\|route.ts\|route.js" | \
     xargs grep -l "process.env" 2>/dev/null | \
     xargs grep -L "'use client'" 2>/dev/null | \
     xargs grep -n "process.env" 2>/dev/null | \
     grep -v "NEXT_PUBLIC_\|app/api\|route.ts\|route.js" > /dev/null 2>&1; then
    echo -e "${RED}❌ Found client-side process.env without NEXT_PUBLIC_ prefix${NC}"
    find app components -type f \( -name "*.tsx" -o -name "*.ts" \) 2>/dev/null | \
      grep -v "app/api\|route.ts" | \
      xargs grep -n "process.env" 2>/dev/null | \
      grep -v "NEXT_PUBLIC_\|app/api\|route.ts" | head -5
    FAILED=$((FAILED + 1))
    ISSUES+=("FP-001: Client-side env vars missing NEXT_PUBLIC_ prefix")
  else
    echo -e "${GREEN}✅ No client-side env vars without NEXT_PUBLIC_ prefix${NC}"
    PASSED=$((PASSED + 1))
  fi
}

check_env_vars
echo ""

# ============================================================================
# SUCCESS PATTERN SP-002: Hydration Error Prevention
# ============================================================================
echo -e "${BLUE}━━━ SP-002: Hydration Error Prevention ━━━${NC}"

check_hydration() {
  # Check for Date.now() or Math.random() in render
  if find app components -type f \( -name "*.tsx" -o -name "*.jsx" \) 2>/dev/null | xargs grep -l "Date.now()\|Math.random()" 2>/dev/null | grep -v "useEffect\|useState" > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Found Date.now() or Math.random() - ensure wrapped in useEffect${NC}"
    find app components -type f \( -name "*.tsx" -o -name "*.jsx" \) 2>/dev/null | xargs grep -n "Date.now()\|Math.random()" 2>/dev/null | head -3
    WARNINGS=$((WARNINGS + 1))
    ISSUES+=("SP-002: Potential hydration issue with Date.now()/Math.random()")
  else
    echo -e "${GREEN}✅ No direct Date.now()/Math.random() in render detected${NC}"
    PASSED=$((PASSED + 1))
  fi
  
  # Check for 'use client' directive where needed
  if find app components -type f -name "*.tsx" 2>/dev/null | xargs grep -l "useState\|useEffect\|onClick\|onChange" 2>/dev/null | xargs grep -L "'use client'" 2>/dev/null | head -1 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Some client hooks found without 'use client' directive${NC}"
    WARNINGS=$((WARNINGS + 1))
  else
    echo -e "${GREEN}✅ Client components properly marked${NC}"
    PASSED=$((PASSED + 1))
  fi
}

check_hydration
echo ""

# ============================================================================
# SUCCESS PATTERN SP-003: Cold Start Optimization
# ============================================================================
echo -e "${BLUE}━━━ SP-003: Cold Start Optimization ━━━${NC}"

check_cold_start() {
  # Check for large dependencies in API routes
  if [ -d "app/api" ]; then
    local api_files=$(find app/api -name "route.ts" -o -name "route.js" 2>/dev/null | wc -l)
    if [ "$api_files" -gt 0 ]; then
      echo -e "${GREEN}✅ API routes found: $api_files${NC}"
      PASSED=$((PASSED + 1))
      
      # Check for heavy imports
      if find app/api -name "route.ts" -o -name "route.js" 2>/dev/null | xargs grep -l "import.*from.*node_modules" 2>/dev/null | head -1 > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Consider optimizing heavy imports in API routes${NC}"
        WARNINGS=$((WARNINGS + 1))
      fi
    fi
  fi
  
  # Check for vercel.json configuration
  if [ -f "vercel.json" ]; then
    echo -e "${GREEN}✅ vercel.json found${NC}"
    PASSED=$((PASSED + 1))
  else
    echo -e "${YELLOW}⚠️  No vercel.json - consider adding function region config${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
}

check_cold_start
echo ""

# ============================================================================
# SUCCESS PATTERN SP-004: Build Success Configuration
# ============================================================================
echo -e "${BLUE}━━━ SP-004: Build Success Configuration ━━━${NC}"

check_build_config() {
  # Check for package.json
  if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json not found${NC}"
    FAILED=$((FAILED + 1))
    ISSUES+=("FP-004: Missing package.json")
    return
  fi
  
  echo -e "${GREEN}✅ package.json found${NC}"
  PASSED=$((PASSED + 1))
  
  # Check for build script
  if grep -q '"build"' package.json; then
    echo -e "${GREEN}✅ Build script found${NC}"
    PASSED=$((PASSED + 1))
  else
    echo -e "${RED}❌ No build script in package.json${NC}"
    FAILED=$((FAILED + 1))
    ISSUES+=("FP-004: Missing build script")
  fi
  
  # Check for next.config.js
  if [ -f "next.config.js" ] || [ -f "next.config.ts" ]; then
    echo -e "${GREEN}✅ next.config found${NC}"
    PASSED=$((PASSED + 1))
    
    # Check for eslint ignore during builds
    if grep -q "ignoreDuringBuilds.*true" next.config.* 2>/dev/null; then
      echo -e "${YELLOW}⚠️  ESLint errors ignored during builds - ensure code quality${NC}"
      WARNINGS=$((WARNINGS + 1))
    fi
  else
    echo -e "${YELLOW}⚠️  No next.config.js found${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
  
  # Check for TypeScript config
  if [ -f "tsconfig.json" ]; then
    echo -e "${GREEN}✅ tsconfig.json found${NC}"
    PASSED=$((PASSED + 1))
  else
    echo -e "${YELLOW}⚠️  No tsconfig.json found${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
}

check_build_config
echo ""

# ============================================================================
# SUCCESS PATTERN SP-005: Routing & Rewrites
# ============================================================================
echo -e "${BLUE}━━━ SP-005: Routing & Rewrites ━━━${NC}"

check_routing() {
  # Check for App Router structure
  if [ -d "app" ]; then
    echo -e "${GREEN}✅ App Router structure detected${NC}"
    PASSED=$((PASSED + 1))
    
    # Check for route handlers
    local route_handlers=$(find app -name "route.ts" -o -name "route.js" 2>/dev/null | wc -l)
    if [ "$route_handlers" -gt 0 ]; then
      echo -e "${GREEN}✅ Route handlers found: $route_handlers${NC}"
      PASSED=$((PASSED + 1))
    fi
  else
    echo -e "${YELLOW}⚠️  No app directory - using Pages Router?${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
  
  # Check for rewrites in next.config
  if [ -f "next.config.js" ] || [ -f "next.config.ts" ]; then
    if grep -q "rewrites\|redirects" next.config.* 2>/dev/null; then
      echo -e "${GREEN}✅ Rewrites/redirects configured${NC}"
      PASSED=$((PASSED + 1))
    fi
  fi
}

check_routing
echo ""

# ============================================================================
# FAILURE PATTERN FP-001: Build-Time Environment Variable Errors
# ============================================================================
echo -e "${BLUE}━━━ FP-001: Environment Variable Errors ━━━${NC}"

check_env_errors() {
  # Check for destructuring process.env (breaks inlining) - exclude API routes
  if find app components -type f \( -name "*.tsx" -o -name "*.ts" \) 2>/dev/null | \
     grep -v "app/api\|route.ts\|route.js" | \
     xargs grep -n "const.*=.*process.env\." 2>/dev/null | \
     grep -v "NEXT_PUBLIC_\|app/api\|route.ts\|route.js" | head -1 > /dev/null 2>&1; then
    echo -e "${RED}❌ Found destructured process.env (breaks inlining)${NC}"
    find app components -type f \( -name "*.tsx" -o -name "*.ts" \) 2>/dev/null | \
      grep -v "app/api\|route.ts" | \
      xargs grep -n "const.*=.*process.env\." 2>/dev/null | \
      grep -v "NEXT_PUBLIC_\|app/api\|route.ts" | head -3
    FAILED=$((FAILED + 1))
    ISSUES+=("FP-001: Destructured process.env breaks NEXT_PUBLIC_ inlining")
  else
    echo -e "${GREEN}✅ No problematic env destructuring found${NC}"
    PASSED=$((PASSED + 1))
  fi
}

check_env_errors
echo ""

# ============================================================================
# FAILURE PATTERN FP-002: Hydration Mismatch Errors
# ============================================================================
echo -e "${BLUE}━━━ FP-002: Hydration Mismatch Errors ━━━${NC}"

check_hydration_errors() {
  # Check for window/document access outside useEffect
  if find app components -type f \( -name "*.tsx" -o -name "*.jsx" \) 2>/dev/null | xargs grep -n "window\|document" 2>/dev/null | grep -v "useEffect\|'use client'" | head -1 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Found window/document access - ensure in useEffect or 'use client'${NC}"
    WARNINGS=$((WARNINGS + 1))
    ISSUES+=("FP-002: Potential hydration mismatch with window/document")
  else
    echo -e "${GREEN}✅ Browser APIs properly guarded${NC}"
    PASSED=$((PASSED + 1))
  fi
}

check_hydration_errors
echo ""

# ============================================================================
# FAILURE PATTERN FP-003: Serverless Function Timeout
# ============================================================================
echo -e "${BLUE}━━━ FP-003: Serverless Function Timeout ━━━${NC}"

check_timeout() {
  # Check for long-running operations in API routes
  if [ -d "app/api" ]; then
    if find app/api -name "route.ts" -o -name "route.js" 2>/dev/null | xargs grep -l "setTimeout\|setInterval\|while.*true\|for.*;;" 2>/dev/null | head -1 > /dev/null 2>&1; then
      echo -e "${YELLOW}⚠️  Found potential long-running operations in API routes${NC}"
      WARNINGS=$((WARNINGS + 1))
      ISSUES+=("FP-003: Potential timeout risk in API routes")
    else
      echo -e "${GREEN}✅ No obvious timeout risks detected${NC}"
      PASSED=$((PASSED + 1))
    fi
  fi
}

check_timeout
echo ""

# ============================================================================
# FAILURE PATTERN FP-004: Memory Limit Exceeded
# ============================================================================
echo -e "${BLUE}━━━ FP-004: Memory Limit Exceeded ━━━${NC}"

check_memory() {
  # Check for getStaticPaths with large counts
  if find app -name "*.tsx" -o -name "*.ts" 2>/dev/null | xargs grep -l "getStaticPaths" 2>/dev/null | xargs grep -n "paths.*length\|paths.*\[.*\.\.\." 2>/dev/null | head -1 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Large getStaticPaths detected - consider ISR${NC}"
    WARNINGS=$((WARNINGS + 1))
    ISSUES+=("FP-004: Large static paths may cause memory issues")
  else
    echo -e "${GREEN}✅ No obvious memory risks detected${NC}"
    PASSED=$((PASSED + 1))
  fi
  
  # Check node_modules size (rough estimate)
  if [ -d "node_modules" ]; then
    local node_modules_size=$(du -sh node_modules 2>/dev/null | cut -f1)
    echo -e "${BLUE}ℹ️  node_modules size: $node_modules_size${NC}"
  fi
}

check_memory
echo ""

# ============================================================================
# FAILURE PATTERN FP-005: Deployment Stuck or Failed
# ============================================================================
echo -e "${BLUE}━━━ FP-005: Deployment Failure Prevention ━━━${NC}"

check_deployment() {
  # Check for .gitignore
  if [ -f ".gitignore" ]; then
    echo -e "${GREEN}✅ .gitignore found${NC}"
    PASSED=$((PASSED + 1))
    
    # Ensure node_modules is ignored
    if grep -q "node_modules" .gitignore; then
      echo -e "${GREEN}✅ node_modules in .gitignore${NC}"
      PASSED=$((PASSED + 1))
    else
      echo -e "${RED}❌ node_modules not in .gitignore${NC}"
      FAILED=$((FAILED + 1))
      ISSUES+=("FP-005: node_modules should be in .gitignore")
    fi
  else
    echo -e "${YELLOW}⚠️  No .gitignore found${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
  
  # Check for package-lock.json
  if [ -f "package-lock.json" ]; then
    echo -e "${GREEN}✅ package-lock.json found${NC}"
    PASSED=$((PASSED + 1))
  else
    echo -e "${YELLOW}⚠️  No package-lock.json - consider committing for reproducibility${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
}

check_deployment
echo ""

# ============================================================================
# SUMMARY
# ============================================================================
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Validation Summary                                          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}✅ Passed: $PASSED${NC}"
echo -e "${YELLOW}⚠️  Warnings: $WARNINGS${NC}"
echo -e "${RED}❌ Failed: $FAILED${NC}"
echo ""

if [ ${#ISSUES[@]} -gt 0 ]; then
  echo -e "${RED}Issues Found:${NC}"
  for issue in "${ISSUES[@]}"; do
    echo -e "  ${RED}•${NC} $issue"
  done
  echo ""
fi

# Exit code based on failures
if [ $FAILED -gt 0 ]; then
  echo -e "${RED}❌ Validation FAILED - Fix issues before deployment${NC}"
  exit 1
elif [ $WARNINGS -gt 0 ]; then
  echo -e "${YELLOW}⚠️  Validation PASSED with warnings${NC}"
  exit 0
else
  echo -e "${GREEN}✅ Validation PASSED - Ready for deployment${NC}"
  exit 0
fi

