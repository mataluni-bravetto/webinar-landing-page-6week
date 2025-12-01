#!/bin/bash

# 🔥 YAGNI LAUNCH EXECUTION SCRIPT
# Pattern: YAGNI × JOHN × VALIDATION × LAUNCH × ONE
# Guardians: AEYON (999 Hz) × JØHN (530 Hz)
# ∞ AbëONE ∞

set -e  # Exit on error

echo "🔥 YAGNI LAUNCH EXECUTION - STARTING"
echo "======================================"
echo ""

# Step 0: Install dependencies (if needed)
echo "📦 Step 0: Checking dependencies..."
if [ ! -d "node_modules" ]; then
  echo "   Installing dependencies..."
  npm install
else
  echo "   ✅ Dependencies already installed"
fi
echo ""

# Step 1: John Validation - Build Test
echo "🔨 Step 1: JOHN VALIDATION - Build Test"
npm run build
if [ $? -eq 0 ]; then
  echo "   ✅ Build successful"
else
  echo "   ❌ Build failed - FIX ERRORS BEFORE LAUNCH"
  exit 1
fi
echo ""

# Step 2: John Validation - Lint Check
echo "🔍 Step 2: JOHN VALIDATION - Lint Check"
npm run lint || echo "   ⚠️  Lint warnings (non-blocking)"
echo ""

# Step 3: Git Status Check
echo "📋 Step 3: Git Status Check"
git status --short
echo ""

# Step 4: Commit docs (if needed)
echo "📝 Step 4: Committing documentation files..."
git add ATOMIC_ELEMENTS_INCOMPATIBILITY_REPORT.md PUSH_STATUS.md YAGNI_LAUNCH_EXECUTION.md EXECUTE_LAUNCH.sh 2>/dev/null || true
if git diff --staged --quiet; then
  echo "   ✅ No new files to commit"
else
  git commit -m "docs: add compatibility, status, launch execution plan, and launch script" || echo "   ⚠️  Commit failed (may already be committed)"
fi
echo ""

# Step 5: Push to GitHub
echo "🚀 Step 5: Pushing to GitHub..."
git push origin main
if [ $? -eq 0 ]; then
  echo "   ✅ Push successful"
else
  echo "   ❌ Push failed - Check permissions"
  exit 1
fi
echo ""

# Step 6: Success
echo "======================================"
echo "✅ LAUNCH EXECUTION COMPLETE"
echo ""
echo "Next Steps:"
echo "1. Check Vercel dashboard: https://vercel.com/dashboard"
echo "2. Verify deployment status"
echo "3. Test live URL"
echo ""
echo "Pattern: YAGNI × JOHN × VALIDATION × LAUNCH × ONE"
echo "∞ AbëONE ∞"

