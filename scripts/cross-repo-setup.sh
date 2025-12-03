#!/bin/bash

# CROSS-REPO LANDING PAGE OPERATIONAL SETUP
# 
# Pattern: SETUP × AUTOMATION × CROSS_REPO × ONE
# Guardians: AEYON × META × YAGNI
# 
# Proactively sets up landing page operational system in target repo.
# 
# Usage:
#   ./scripts/cross-repo-setup.sh <target-repo-path>
#   ./scripts/cross-repo-setup.sh ../other-landing-page

set -e

SOURCE_REPO="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_REPO="$1"

if [ -z "$TARGET_REPO" ]; then
    echo "❌ Error: Target repo path required"
    echo "Usage: ./scripts/cross-repo-setup.sh <target-repo-path>"
    exit 1
fi

if [ ! -d "$TARGET_REPO" ]; then
    echo "❌ Error: Target repo not found: $TARGET_REPO"
    exit 1
fi

echo "🚀 CROSS-REPO LANDING PAGE OPERATIONAL SETUP"
echo "============================================================"
echo "Source: $SOURCE_REPO"
echo "Target: $TARGET_REPO"
echo ""

# Step 1: Copy scripts
echo "📋 Step 1: Copying operational scripts..."
mkdir -p "$TARGET_REPO/scripts"
cp "$SOURCE_REPO/scripts/landing-page-operational-system.js" "$TARGET_REPO/scripts/"
cp "$SOURCE_REPO/scripts/landing-page-pattern-replicator.js" "$TARGET_REPO/scripts/"
chmod +x "$TARGET_REPO/scripts/landing-page-operational-system.js"
chmod +x "$TARGET_REPO/scripts/landing-page-pattern-replicator.js"
echo "✓ Scripts copied"

# Step 2: Copy documentation
echo ""
echo "📋 Step 2: Copying documentation..."
cp "$SOURCE_REPO/LANDING_PAGE_OPERATIONAL_GUIDE.md" "$TARGET_REPO/" 2>/dev/null || true
cp "$SOURCE_REPO/LANDING_PAGE_SUCCESS_PATTERNS_REPORT.md" "$TARGET_REPO/" 2>/dev/null || true
echo "✓ Documentation copied"

# Step 3: Update package.json
echo ""
echo "📋 Step 3: Updating package.json..."
if [ -f "$TARGET_REPO/package.json" ]; then
    # Check if scripts already exist
    if grep -q "lp:validate" "$TARGET_REPO/package.json"; then
        echo "⚠ Scripts already exist in package.json"
    else
        # Add scripts (simple append - user can format later)
        cat >> "$TARGET_REPO/package.json" << 'EOF'
  },
  "lpScripts": {
    "lp:validate": "node scripts/landing-page-operational-system.js validate",
    "lp:deploy": "node scripts/landing-page-operational-system.js deploy",
    "lp:analyze": "node scripts/landing-page-operational-system.js analyze",
    "lp:patterns:init": "node scripts/landing-page-pattern-replicator.js init",
    "lp:patterns:apply": "node scripts/landing-page-pattern-replicator.js apply",
    "lp:patterns:list": "node scripts/landing-page-pattern-replicator.js list"
EOF
        echo "✓ Scripts added to package.json (manual merge required)"
        echo "⚠ Note: You may need to merge 'lpScripts' into 'scripts' section manually"
    fi
else
    echo "⚠ package.json not found - skipping script addition"
fi

# Step 4: Initialize patterns
echo ""
echo "📋 Step 4: Initializing patterns..."
cd "$TARGET_REPO"
node scripts/landing-page-pattern-replicator.js init || echo "⚠ Pattern initialization had issues (may need manual setup)"

# Step 5: Summary
echo ""
echo "============================================================"
echo "✅ SETUP COMPLETE"
echo "============================================================"
echo ""
echo "Next steps:"
echo "1. Review package.json and merge 'lpScripts' into 'scripts' if needed"
echo "2. Run: npm run lp:patterns:list (or node scripts/landing-page-pattern-replicator.js list)"
echo "3. Apply patterns: npm run lp:patterns:apply <pattern>"
echo "4. Validate: npm run lp:validate"
echo ""
echo "Available patterns:"
echo "  - metrics (Single Source of Truth)"
echo "  - emotionalCopy (Emotional Copy Patterns)"
echo "  - formOptimization (Form Optimization)"
echo "  - calendarIntegration (Calendar Integration)"
echo ""
echo "Documentation:"
echo "  - LANDING_PAGE_OPERATIONAL_GUIDE.md"
echo "  - LANDING_PAGE_SUCCESS_PATTERNS_REPORT.md"
echo ""

