#!/usr/bin/env node

/**
 * LANDING PAGE OPERATIONAL SYSTEM
 * 
 * Pattern: OPERATIONAL × AUTOMATION × VALIDATION × ONE
 * Guardians: AEYON (999 Hz) × META (777 Hz) × JØHN (530 Hz) × YAGNI (530 Hz)
 * 
 * Proactive, programmatic operationalization for landing page development.
 * Reusable across repos.
 * 
 * Usage:
 *   node scripts/landing-page-operational-system.js validate
 *   node scripts/landing-page-operational-system.js deploy
 *   node scripts/landing-page-operational-system.js analyze
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message, color = COLORS.reset) {
  console.log(`${color}${message}${COLORS.reset}`)
}

function logSection(title) {
  log(`\n${'='.repeat(60)}`, COLORS.cyan)
  log(title, COLORS.bright + COLORS.cyan)
  log('='.repeat(60), COLORS.cyan)
}

function logSuccess(message) {
  log(`✓ ${message}`, COLORS.green)
}

function logWarning(message) {
  log(`⚠ ${message}`, COLORS.yellow)
}

function logError(message) {
  log(`✗ ${message}`, COLORS.red)
}

// ============================================================================
// VALIDATION SYSTEM
// ============================================================================

class LandingPageValidator {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot
    this.errors = []
    this.warnings = []
  }

  // Validate single source of truth pattern
  validateMetricsConsistency() {
    logSection('Validating Metrics Consistency (Single Source of Truth)')
    
    try {
      const metricsPath = path.join(this.projectRoot, 'app/webinar/metrics.ts')
      if (!fs.existsSync(metricsPath)) {
        this.warnings.push('metrics.ts not found - single source of truth pattern not implemented')
        return false
      }

      const metricsContent = fs.readFileSync(metricsPath, 'utf8')
      const contentPath = path.join(this.projectRoot, 'app/webinar/content.ts')
      const content = fs.readFileSync(contentPath, 'utf8')
      const pagePath = path.join(this.projectRoot, 'app/webinar/page.tsx')
      const page = fs.readFileSync(pagePath, 'utf8')

      // Check if metrics are imported
      if (!content.includes('from \'./metrics\'') && !content.includes('from "./metrics"')) {
        this.errors.push('content.ts does not import metrics.ts')
      }

      // Check for hardcoded numbers that should use metrics
      const hardcodedNumbers = [
        /1200|1,200|847|97\.8|12|47|15/g
      ]
      
      let foundHardcoded = false
      hardcodedNumbers.forEach(pattern => {
        if (pattern.test(page) && !page.includes('formatMetrics')) {
          foundHardcoded = true
        }
      })

      if (foundHardcoded) {
        this.warnings.push('Hardcoded numbers found - should use formatMetrics()')
      }

      logSuccess('Metrics consistency validated')
      return true
    } catch (error) {
      this.errors.push(`Metrics validation failed: ${error.message}`)
      return false
    }
  }

  // Validate emotional copy patterns
  validateEmotionalCopy() {
    logSection('Validating Emotional Copy Patterns')
    
    try {
      const pagePath = path.join(this.projectRoot, 'app/webinar/page.tsx')
      const page = fs.readFileSync(pagePath, 'utf8')

      const patterns = {
        painAcknowledgment: /stop.*debug|frustrat|anxious|blind/i,
        confidencePayoff: /ship.*know|confidence|relief|works.*not.*hop/i,
        formReassurance: /instant.*access|no.*credit.*card|mit.*licen/i,
        timeToRelief: /today|instantly|immediate/i,
      }

      const results = {}
      Object.entries(patterns).forEach(([name, pattern]) => {
        results[name] = pattern.test(page)
        if (results[name]) {
          logSuccess(`${name} pattern found`)
        } else {
          this.warnings.push(`${name} pattern missing`)
        }
      })

      return Object.values(results).some(v => v)
    } catch (error) {
      this.errors.push(`Emotional copy validation failed: ${error.message}`)
      return false
    }
  }

  // Validate YAGNI compliance
  validateYAGNI() {
    logSection('Validating YAGNI Compliance')
    
    try {
      const pagePath = path.join(this.projectRoot, 'app/webinar/page.tsx')
      const page = fs.readFileSync(pagePath, 'utf8')

      // Check for unnecessary complexity
      const complexityIndicators = {
        unnecessaryAbstractions: /abstract.*class|interface.*extends.*interface/g,
        prematureOptimization: /memo|useMemo|useCallback.*\[.*\]/g,
        overEngineering: /factory.*pattern|builder.*pattern|strategy.*pattern/i,
      }

      let yagniScore = 100
      Object.entries(complexityIndicators).forEach(([name, pattern]) => {
        if (pattern.test(page)) {
          this.warnings.push(`Potential YAGNI violation: ${name}`)
          yagniScore -= 10
        }
      })

      logSuccess(`YAGNI compliance score: ${yagniScore}%`)
      return yagniScore >= 90
    } catch (error) {
      this.errors.push(`YAGNI validation failed: ${error.message}`)
      return false
    }
  }

  // Validate JØHN truth integrity
  validateJOHN() {
    logSection('Validating JØHN Truth Integrity')
    
    try {
      const pagePath = path.join(this.projectRoot, 'app/webinar/page.tsx')
      const page = fs.readFileSync(pagePath, 'utf8')

      // Check for unverifiable claims
      const unverifiablePatterns = [
        /#1.*product|best.*ever|revolutionary|game.*changing/i,
        /\d+%.*guarantee|\d+%.*promise/i,
      ]

      let johnScore = 100
      unverifiablePatterns.forEach(pattern => {
        if (pattern.test(page)) {
          this.errors.push(`Unverifiable claim found: ${pattern}`)
          johnScore -= 20
        }
      })

      // Check for specific, verifiable metrics
      const verifiablePatterns = [
        /\d+.*functions.*tested/i,
        /\d+\.\d+%.*accuracy/i,
        /\d+.*scripts/i,
      ]

      const hasVerifiableMetrics = verifiablePatterns.some(p => p.test(page))
      if (hasVerifiableMetrics) {
        logSuccess('Verifiable metrics found')
      } else {
        this.warnings.push('No verifiable metrics found')
      }

      logSuccess(`JØHN truth integrity score: ${johnScore}%`)
      return johnScore >= 80
    } catch (error) {
      this.errors.push(`JØHN validation failed: ${error.message}`)
      return false
    }
  }

  // Validate form optimization
  validateFormOptimization() {
    logSection('Validating Form Optimization')
    
    try {
      const pagePath = path.join(this.projectRoot, 'app/webinar/page.tsx')
      const page = fs.readFileSync(pagePath, 'utf8')

      // Count form fields
      const inputMatches = page.match(/<input[^>]*type=["'](text|email|tel|number)["'][^>]*>/gi) || []
      const fieldCount = inputMatches.length

      if (fieldCount <= 2) {
        logSuccess(`Form optimized: ${fieldCount} fields (minimal friction)`)
      } else {
        this.warnings.push(`Form has ${fieldCount} fields - consider reducing`)
      }

      // Check for form reassurance
      const hasReassurance = /instant.*access|no.*credit.*card|unsubscribe/i.test(page)
      if (hasReassurance) {
        logSuccess('Form reassurance text found')
      } else {
        this.warnings.push('Form reassurance text missing')
      }

      return fieldCount <= 3
    } catch (error) {
      this.errors.push(`Form validation failed: ${error.message}`)
      return false
    }
  }

  // Validate build readiness
  validateBuildReadiness() {
    logSection('Validating Build Readiness')
    
    try {
      log('Running build validation...', COLORS.blue)
      execSync('npm run build', { 
        cwd: this.projectRoot,
        stdio: 'pipe',
        timeout: 60000 
      })
      logSuccess('Build successful')
      return true
    } catch (error) {
      this.errors.push(`Build failed: ${error.message}`)
      return false
    }
  }

  // Run all validations
  validateAll() {
    log('\n🚀 LANDING PAGE OPERATIONAL VALIDATION', COLORS.bright + COLORS.cyan)
    log('='.repeat(60), COLORS.cyan)

    const results = {
      metrics: this.validateMetricsConsistency(),
      emotionalCopy: this.validateEmotionalCopy(),
      yagni: this.validateYAGNI(),
      john: this.validateJOHN(),
      form: this.validateFormOptimization(),
      build: this.validateBuildReadiness(),
    }

    // Summary
    logSection('Validation Summary')
    
    Object.entries(results).forEach(([name, passed]) => {
      if (passed) {
        logSuccess(`${name}: PASSED`)
      } else {
        logError(`${name}: FAILED`)
      }
    })

    if (this.errors.length > 0) {
      logSection('Errors')
      this.errors.forEach(error => logError(error))
    }

    if (this.warnings.length > 0) {
      logSection('Warnings')
      this.warnings.forEach(warning => logWarning(warning))
    }

    const allPassed = Object.values(results).every(v => v) && this.errors.length === 0
    const score = Math.round((Object.values(results).filter(v => v).length / Object.keys(results).length) * 100)

    logSection('Final Score')
    log(`Validation Score: ${score}%`, score >= 90 ? COLORS.green : COLORS.yellow)
    log(`Status: ${allPassed ? 'READY FOR DEPLOYMENT' : 'NEEDS FIXES'}`, 
        allPassed ? COLORS.green : COLORS.red)

    return { results, errors: this.errors, warnings: this.warnings, score, allPassed }
  }
}

// ============================================================================
// DEPLOYMENT SYSTEM
// ============================================================================

class LandingPageDeployer {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot
  }

  async deploy() {
    logSection('Landing Page Deployment')
    
    try {
      // Step 1: Validate
      log('Step 1: Running validations...', COLORS.blue)
      const validator = new LandingPageValidator(this.projectRoot)
      const validation = validator.validateAll()

      if (!validation.allPassed) {
        logError('Validation failed. Fix errors before deploying.')
        process.exit(1)
      }

      // Step 2: Check git status
      log('\nStep 2: Checking git status...', COLORS.blue)
      try {
        const gitStatus = execSync('git status --porcelain', { 
          cwd: this.projectRoot,
          encoding: 'utf8'
        })
        
        if (gitStatus.trim()) {
          logWarning('Uncommitted changes detected')
          log('Changes:', COLORS.yellow)
          console.log(gitStatus)
        } else {
          logSuccess('Working directory clean')
        }
      } catch (error) {
        logWarning('Git not available or not a git repo')
      }

      // Step 3: Build
      log('\nStep 3: Building...', COLORS.blue)
      execSync('npm run build', { 
        cwd: this.projectRoot,
        stdio: 'inherit'
      })
      logSuccess('Build complete')

      // Step 4: Deployment instructions
      logSection('Deployment Instructions')
      log('Build successful! Next steps:', COLORS.green)
      log('1. Review changes: git diff', COLORS.cyan)
      log('2. Stage changes: git add .', COLORS.cyan)
      log('3. Commit: git commit -m "feat: landing page updates"', COLORS.cyan)
      log('4. Push: git push', COLORS.cyan)
      log('5. Vercel will auto-deploy', COLORS.cyan)

      return true
    } catch (error) {
      logError(`Deployment failed: ${error.message}`)
      process.exit(1)
    }
  }
}

// ============================================================================
// ANALYSIS SYSTEM
// ============================================================================

class LandingPageAnalyzer {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot
  }

  analyze() {
    logSection('Landing Page Analysis')
    
    try {
      const pagePath = path.join(this.projectRoot, 'app/webinar/page.tsx')
      const page = fs.readFileSync(pagePath, 'utf8')

      const analysis = {
        fileSize: fs.statSync(pagePath).size,
        lineCount: page.split('\n').length,
        wordCount: page.split(/\s+/).length,
        componentCount: (page.match(/export\s+(default\s+)?function/g) || []).length,
        hookCount: (page.match(/use[A-Z]\w+/g) || []).length,
        importCount: (page.match(/^import\s+/gm) || []).length,
      }

      logSection('Code Metrics')
      Object.entries(analysis).forEach(([key, value]) => {
        log(`${key}: ${value}`, COLORS.cyan)
      })

      // Pattern detection
      logSection('Pattern Detection')
      const patterns = {
        'Emotional Copy': /stop.*debug|ship.*know|frustrat/i.test(page),
        'Single Source of Truth': /formatMetrics|METRICS/i.test(page),
        'Form Optimization': /<input[^>]*type=["'](text|email)["']/gi.test(page),
        'Trust Signals': /mit.*licen|open.*source|transparent/i.test(page),
        'Mobile Responsive': /clamp|md:|sm:|responsive/i.test(page),
      }

      Object.entries(patterns).forEach(([name, detected]) => {
        if (detected) {
          logSuccess(`${name}: DETECTED`)
        } else {
          logWarning(`${name}: NOT DETECTED`)
        }
      })

      return analysis
    } catch (error) {
      logError(`Analysis failed: ${error.message}`)
      return null
    }
  }
}

// ============================================================================
// MAIN CLI
// ============================================================================

const command = process.argv[2] || 'validate'
const projectRoot = process.cwd()

switch (command) {
  case 'validate':
  case 'v':
    const validator = new LandingPageValidator(projectRoot)
    validator.validateAll()
    break

  case 'deploy':
  case 'd':
    const deployer = new LandingPageDeployer(projectRoot)
    deployer.deploy()
    break

  case 'analyze':
  case 'a':
    const analyzer = new LandingPageAnalyzer(projectRoot)
    analyzer.analyze()
    break

  case 'help':
  case 'h':
    log('\n🚀 LANDING PAGE OPERATIONAL SYSTEM', COLORS.bright + COLORS.cyan)
    log('='.repeat(60), COLORS.cyan)
    log('\nCommands:')
    log('  validate, v  - Run all validations')
    log('  deploy, d   - Validate and prepare for deployment')
    log('  analyze, a  - Analyze landing page patterns')
    log('  help, h     - Show this help')
    log('\nUsage:')
    log('  node scripts/landing-page-operational-system.js validate')
    log('  node scripts/landing-page-operational-system.js deploy')
    log('  node scripts/landing-page-operational-system.js analyze')
    break

  default:
    logError(`Unknown command: ${command}`)
    log('Run with "help" to see available commands')
    process.exit(1)
}

