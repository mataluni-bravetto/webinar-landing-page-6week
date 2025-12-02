# Makefile - Webinar Landing Page Deployment
# Pattern: DEPLOYMENT × AUTOMATION × YAGNI × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (YAGNI)
# ∞ AbëONE ∞

.PHONY: help install build dev validate deploy check-ready

# Default target
help: ## Show this help message
	@echo "Webinar Landing Page - Development Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Setup
install: ## Install dependencies
	@echo "📦 Installing dependencies..."
	@npm install
	@echo "✅ Dependencies installed"

# Development
dev: ## Start development server
	@echo "🚀 Starting development server..."
	@npm run dev

build: ## Build for production
	@echo "🔨 Building for production..."
	@npm run build
	@echo "✅ Build complete"

# Validation (UNIFIED)
validate: ## Validate Vercel patterns (SP-001 to SP-005, FP-001 to FP-005)
	@echo "🔍 Validating Vercel patterns..."
	@bash scripts/validate-vercel-patterns.sh
	@echo "✅ Pattern validation complete"

validate-vercel: validate ## Alias for validate
	@true

check-ready: ## Check deployment readiness (validates + checks)
	@echo "🔍 Checking deployment readiness..."
	@bash scripts/check-deployment-readiness.sh
	@echo "✅ Readiness check complete"

# Deployment (CONVERSION-OPTIMIZED)
deploy: validate build ## Deploy to Vercel (validates + builds + deploys)
	@echo "🚀 Deploying webinar landing page to Vercel..."
	@if command -v vercel &> /dev/null; then \
		echo "✅ Validation passed"; \
		echo "✅ Build successful"; \
		echo "🚀 Deploying to production..."; \
		vercel --prod; \
	else \
		echo "⚠️  Vercel CLI not installed"; \
		echo "   Install: npm i -g vercel"; \
		echo "   Or deploy via: https://vercel.com/dashboard"; \
		echo ""; \
		echo "✅ Build complete - ready for manual deployment"; \
	fi

deploy-preview: build ## Deploy preview to Vercel
	@echo "🚀 Deploying preview to Vercel..."
	@if command -v vercel &> /dev/null; then \
		vercel; \
	else \
		echo "⚠️  Vercel CLI not installed"; \
	fi

# Code Quality
lint: ## Run linter
	@echo "🔍 Linting..."
	@npm run lint

format: ## Format code (if prettier configured)
	@echo "✨ Formatting code..."
	@if command -v prettier &> /dev/null; then \
		prettier --write "**/*.{ts,tsx,js,jsx}" --ignore-path .gitignore; \
	else \
		echo "⚠️  Prettier not installed"; \
	fi

# Cleanup
clean: ## Clean build artifacts
	@echo "🧹 Cleaning..."
	@rm -rf .next
	@rm -rf node_modules/.cache
	@echo "✅ Clean complete"

clean-all: clean ## Clean everything including node_modules
	@echo "🧹 Deep cleaning..."
	@rm -rf node_modules
	@rm -rf .next
	@echo "✅ Deep clean complete"

# Quick start
quickstart: install dev ## Quick start (install + dev)

# Verification
verify: validate check-ready ## Verify everything (validate + check-ready)

