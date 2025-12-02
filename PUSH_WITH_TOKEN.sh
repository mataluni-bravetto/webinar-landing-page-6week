#!/bin/bash

# 🔥 PUSH WITH TOKEN - Execute this script with your token
# Usage: TOKEN="your_github_token" ./PUSH_WITH_TOKEN.sh

set -e

cd "/Users/bryanwhitehurst/Abë_ONE Master/AbeOne_Master/webinar-landing-page"

if [ -z "$TOKEN" ]; then
  echo "❌ ERROR: TOKEN environment variable not set"
  echo ""
  echo "Usage:"
  echo "  TOKEN=\"your_github_token\" ./PUSH_WITH_TOKEN.sh"
  echo ""
  echo "Or set it inline:"
  echo "  TOKEN=\"ghp_...\" git remote set-url origin \"https://\${TOKEN}@github.com/bravetto/webinar-landing-page.git\" && git push origin main"
  exit 1
fi

echo "🚀 Updating remote URL with token..."
git remote set-url origin "https://${TOKEN}@github.com/bravetto/webinar-landing-page.git"

echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ SUCCESS! Push complete!"
  echo "🎉 Vercel will auto-deploy now"
else
  echo ""
  echo "❌ Push failed. Check:"
  echo "  1. Token has 'repo' scope"
  echo "  2. Token has write access to bravetto/webinar-landing-page"
  echo "  3. Token hasn't expired"
  exit 1
fi

