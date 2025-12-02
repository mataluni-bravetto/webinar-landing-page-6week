/**
 * Security Scanner
 * OWASP Top 10 pattern detection and vulnerability scanning
 * 
 * Pattern: VALIDATION × TRUTH × CLARITY × ONE
 * Guardians: YAGNI × JØHN × AEYON
 */

import * as fs from 'fs'
import * as path from 'path'

interface SecurityIssue {
  file: string
  line: number
  type: 'sql-injection' | 'xss' | 'hardcoded-secret' | 'auth-bypass' | 'insecure-dependency'
  severity: 'high' | 'medium' | 'low'
  message: string
  suggestion: string
}

const SQL_INJECTION_PATTERNS = [
  /\$\{.*\}/g,
  /\+.*req\.(params|query|body)/g,
  /`SELECT.*\$\{/g,
  /`INSERT.*\$\{/g,
  /`UPDATE.*\$\{/g,
  /`DELETE.*\$\{/g
]

const XSS_PATTERNS = [
  /innerHTML\s*=\s*.*req\./g,
  /dangerouslySetInnerHTML/g,
  /<div>.*\{.*req\./g,
  /document\.write\(.*req\./g
]

const SECRET_PATTERNS = [
  /['"]sk_live_[a-zA-Z0-9]{20,}['"]/g,
  /['"]sk_test_[a-zA-Z0-9]{20,}['"]/g,
  /['"]AIza[0-9A-Za-z_-]{35}['"]/g,
  /password\s*[:=]\s*['"][^'"]+['"]/g,
  /api[_-]?key\s*[:=]\s*['"][^'"]+['"]/g,
  /secret\s*[:=]\s*['"][^'"]+['"]/g
]

export async function scanSecurity(filePath: string): Promise<SecurityIssue[]> {
  const issues: SecurityIssue[] = []
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  
  lines.forEach((line, index) => {
    // SQL Injection detection
    SQL_INJECTION_PATTERNS.forEach(pattern => {
      if (pattern.test(line)) {
        issues.push({
          file: filePath,
          line: index + 1,
          type: 'sql-injection',
          severity: 'high',
          message: 'Potential SQL injection vulnerability',
          suggestion: 'Use parameterized queries or prepared statements'
        })
      }
    })
    
    // XSS detection
    XSS_PATTERNS.forEach(pattern => {
      if (pattern.test(line)) {
        issues.push({
          file: filePath,
          line: index + 1,
          type: 'xss',
          severity: 'high',
          message: 'Potential XSS vulnerability',
          suggestion: 'Sanitize user input and use React\'s built-in escaping'
        })
      }
    })
    
    // Hardcoded secrets detection
    SECRET_PATTERNS.forEach(pattern => {
      if (pattern.test(line)) {
        issues.push({
          file: filePath,
          line: index + 1,
          type: 'hardcoded-secret',
          severity: 'high',
          message: 'Hardcoded secret detected',
          suggestion: 'Move secrets to environment variables'
        })
      }
    })
    
    // Auth bypass patterns
    if (/if\s*\(.*\)\s*\{?\s*return\s+true/g.test(line) && 
        /req\.(user|auth|session)/g.test(line)) {
      issues.push({
        file: filePath,
        line: index + 1,
        type: 'auth-bypass',
        severity: 'high',
        message: 'Potential authentication bypass',
        suggestion: 'Verify authentication logic is secure'
      })
    }
  })
  
  return issues
}

export async function scanDirectory(dirPath: string): Promise<SecurityIssue[]> {
  const allIssues: SecurityIssue[] = []
  const files = fs.readdirSync(dirPath)
  
  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      const subIssues = await scanDirectory(filePath)
      allIssues.push(...subIssues)
    } else if (file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.jsx')) {
      const issues = await scanSecurity(filePath)
      allIssues.push(...issues)
    }
  }
  
  return allIssues
}

// CLI usage
if (require.main === module) {
  const targetPath = process.argv[2] || 'src'
  scanDirectory(targetPath).then(issues => {
    if (issues.length > 0) {
      console.log(`Found ${issues.length} security issues:`)
      issues.forEach(issue => {
        console.log(`[${issue.severity.toUpperCase()}] ${issue.file}:${issue.line}`)
        console.log(`  ${issue.message}`)
        console.log(`  Fix: ${issue.suggestion}`)
        console.log('')
      })
      process.exit(1)
    } else {
      console.log('No security issues found.')
      process.exit(0)
    }
  })
}

