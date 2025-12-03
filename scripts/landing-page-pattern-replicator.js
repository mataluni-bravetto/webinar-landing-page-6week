#!/usr/bin/env node

/**
 * LANDING PAGE PATTERN REPLICATOR
 * 
 * Pattern: REPLICATION × AUTOMATION × PATTERNS × ONE
 * Guardians: AEYON (999 Hz) × META (777 Hz) × YAGNI (530 Hz)
 * 
 * Replicates validated landing page patterns to other repos.
 * Proactive, programmatic pattern application.
 * 
 * Usage:
 *   node scripts/landing-page-pattern-replicator.js init
 *   node scripts/landing-page-pattern-replicator.js apply <pattern>
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

function logSuccess(message) {
  log(`✓ ${message}`, COLORS.green)
}

function logError(message) {
  log(`✗ ${message}`, COLORS.red)
}

// ============================================================================
// PATTERN TEMPLATES
// ============================================================================

const PATTERNS = {
  metrics: {
    name: 'Single Source of Truth Metrics',
    description: 'Centralized metrics file with helper functions',
    files: {
      'app/webinar/metrics.ts': `/**
 * METRICS CONSTANTS - SINGLE SOURCE OF TRUTH
 * 
 * Pattern: METRICS × TRUTH × CONSISTENCY × ONE
 * Guardians: YAGNI × JØHN × AEYON
 * 
 * All numbers used across the landing page.
 * Update here, changes everywhere.
 */

export const METRICS = {
  // Test Corpus
  totalFunctionsTested: 1200,
  validatedFunctions: 847,
  
  // Accuracy Metrics
  overallAccuracy: 97.8,
  falsePositiveRate: 3,
  falseNegativeRate: 2.2,
  
  // Toolkit Deliverables
  scriptsIncluded: 12,
  guidePages: 47,
  integrationSteps: 15,
  
  // Performance Metrics
  averageDetectionTime: { min: 12, max: 29 },
} as const

export const formatMetrics = {
  totalTested: () => \`\${METRICS.totalFunctionsTested.toLocaleString()}+\`,
  validated: () => METRICS.validatedFunctions.toLocaleString(),
  accuracy: () => \`\${METRICS.overallAccuracy}%\`,
  scripts: () => METRICS.scriptsIncluded.toString(),
  guidePages: () => METRICS.guidePages.toString(),
  steps: () => METRICS.integrationSteps.toString(),
}
`
    },
    integration: {
      type: 'import',
      code: `import { formatMetrics } from './metrics'`
    }
  },

  emotionalCopy: {
    name: 'Emotional Copy Patterns',
    description: 'Pain acknowledgment, confidence payoff, form reassurance',
    snippets: {
      painAcknowledgment: `"Stop debugging AI-generated code blind. See the exact validation framework we use internally—a context-aware system that catches the subtle bugs that look correct but break under real-world load. Works WITH your judgment, not against it."`,
      confidencePayoff: `"Ship knowing it works—not hoping it does."`,
      formReassurance: `"✓ Instant toolkit access · ✓ No credit card · ✓ MIT licensed"`,
      timeToRelief: `"Start validating your code today."`
    }
  },

  formOptimization: {
    name: 'Form Optimization Pattern',
    description: 'Minimal fields, reassurance, validation',
    code: `
// Form optimization pattern
const [formData, setFormData] = useState({ firstName: '', email: '' })
const [formErrors, setFormErrors] = useState({})

// Validation
const validateForm = (): boolean => {
  const errors = {}
  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required'
  }
  if (!formData.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
  }
  setFormErrors(errors)
  return Object.keys(errors).length === 0
}

// Form reassurance
<p className="text-sm text-gray-500 mt-2 text-center">
  ✓ Instant toolkit access · ✓ No credit card · ✓ MIT licensed
</p>
`
  },

  calendarIntegration: {
    name: 'Calendar Integration Pattern',
    description: 'Add to Calendar component with multiple options',
    files: {
      'app/webinar/components/AddToCalendar.tsx': `'use client'

interface CalendarEvent {
  title: string
  description: string
  location: string
  startDate: string
  endDate: string
  timeZone: string
}

const WEBINAR_EVENT: CalendarEvent = {
  title: 'Your Event Title',
  description: 'Event description with agenda and details',
  location: 'https://meet.google.com/your-link',
  startDate: '2025-12-04T19:00:00Z',
  endDate: '2025-12-04T20:00:00Z',
  timeZone: 'America/New_York'
}

export function AddToCalendar({ variant = 'button' }) {
  // Implementation here
  return <div>Add to Calendar buttons</div>
}
`
    }
  }
}

// ============================================================================
// PATTERN REPLICATOR
// ============================================================================

class PatternReplicator {
  constructor(targetRoot = process.cwd()) {
    this.targetRoot = targetRoot
  }

  init() {
    log('\n🚀 INITIALIZING LANDING PAGE PATTERNS', COLORS.bright + COLORS.cyan)
    
    // Create directory structure
    const dirs = [
      'app/webinar',
      'app/webinar/components',
      'scripts'
    ]

    dirs.forEach(dir => {
      const fullPath = path.join(this.targetRoot, dir)
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true })
        logSuccess(`Created directory: ${dir}`)
      }
    })

    // Create pattern documentation
    const docPath = path.join(this.targetRoot, 'LANDING_PAGE_PATTERNS.md')
    if (!fs.existsSync(docPath)) {
      fs.writeFileSync(docPath, `# Landing Page Patterns

This document contains validated landing page patterns from the webinar landing page project.

See LANDING_PAGE_SUCCESS_PATTERNS_REPORT.md for detailed analysis.

## Available Patterns

- Single Source of Truth Metrics
- Emotional Copy Optimization
- Form Optimization
- Calendar Integration

## Usage

\`\`\`bash
node scripts/landing-page-pattern-replicator.js apply <pattern>
\`\`\`
`)
      logSuccess('Created pattern documentation')
    }

    logSuccess('Pattern initialization complete')
  }

  apply(patternName) {
    log(`\n🚀 APPLYING PATTERN: ${patternName}`, COLORS.bright + COLORS.cyan)

    const pattern = PATTERNS[patternName]
    if (!pattern) {
      logError(`Pattern not found: ${patternName}`)
      log('Available patterns:', COLORS.yellow)
      Object.keys(PATTERNS).forEach(p => log(`  - ${p}`, COLORS.cyan))
      return false
    }

    log(`Pattern: ${pattern.name}`, COLORS.cyan)
    log(`Description: ${pattern.description}`, COLORS.cyan)

    // Apply files
    if (pattern.files) {
      Object.entries(pattern.files).forEach(([filePath, content]) => {
        const fullPath = path.join(this.targetRoot, filePath)
        const dir = path.dirname(fullPath)
        
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }

        fs.writeFileSync(fullPath, content)
        logSuccess(`Created: ${filePath}`)
      })
    }

    // Apply code snippets
    if (pattern.snippets) {
      log('\nCode snippets available:', COLORS.yellow)
      Object.keys(pattern.snippets).forEach(key => {
        log(`  - ${key}`, COLORS.cyan)
      })
      log('\nSee pattern documentation for implementation details.', COLORS.yellow)
    }

    // Apply integration code
    if (pattern.integration) {
      log('\nIntegration code:', COLORS.yellow)
      log(pattern.integration.code, COLORS.cyan)
    }

    logSuccess(`Pattern ${patternName} applied successfully`)
    return true
  }

  list() {
    log('\n📋 AVAILABLE PATTERNS', COLORS.bright + COLORS.cyan)
    log('='.repeat(60), COLORS.cyan)

    Object.entries(PATTERNS).forEach(([key, pattern]) => {
      log(`\n${key}:`, COLORS.bright + COLORS.blue)
      log(`  Name: ${pattern.name}`, COLORS.cyan)
      log(`  Description: ${pattern.description}`, COLORS.cyan)
    })
  }
}

// ============================================================================
// MAIN CLI
// ============================================================================

const command = process.argv[2]
const arg = process.argv[3]
const targetRoot = process.cwd()

const replicator = new PatternReplicator(targetRoot)

switch (command) {
  case 'init':
    replicator.init()
    break

  case 'apply':
    if (!arg) {
      logError('Pattern name required')
      log('Usage: node scripts/landing-page-pattern-replicator.js apply <pattern>')
      replicator.list()
    } else {
      replicator.apply(arg)
    }
    break

  case 'list':
    replicator.list()
    break

  case 'help':
  case 'h':
    log('\n🚀 LANDING PAGE PATTERN REPLICATOR', COLORS.bright + COLORS.cyan)
    log('='.repeat(60), COLORS.cyan)
    log('\nCommands:')
    log('  init              - Initialize pattern structure')
    log('  apply <pattern>   - Apply a pattern to current project')
    log('  list              - List available patterns')
    log('  help              - Show this help')
    log('\nUsage:')
    log('  node scripts/landing-page-pattern-replicator.js init')
    log('  node scripts/landing-page-pattern-replicator.js apply metrics')
    log('  node scripts/landing-page-pattern-replicator.js list')
    break

  default:
    logError(`Unknown command: ${command}`)
    log('Run with "help" to see available commands')
    process.exit(1)
}

