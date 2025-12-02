/**
 * Performance Profiler
 * Identifies performance issues in AI-generated code
 * 
 * Pattern: VALIDATION × TRUTH × CLARITY × ONE
 * Guardians: YAGNI × JØHN × AEYON
 */

import * as fs from 'fs'

interface PerformanceIssue {
  file: string
  line: number
  type: 'nested-loop' | 'inefficient-query' | 'memory-leak' | 'synchronous-operation'
  message: string
  suggestion: string
}

export async function profilePerformance(filePath: string): Promise<PerformanceIssue[]> {
  const issues: PerformanceIssue[] = []
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  
  let nestedLoopDepth = 0
  
  lines.forEach((line, index) => {
    // Detect nested loops
    if (/for\s*\(/.test(line) || /while\s*\(/.test(line)) {
      nestedLoopDepth++
      if (nestedLoopDepth > 2) {
        issues.push({
          file: filePath,
          line: index + 1,
          type: 'nested-loop',
          message: 'Deeply nested loops detected',
          suggestion: 'Consider optimizing with map/filter/reduce or breaking into smaller functions'
        })
      }
    } else if (/\}/.test(line)) {
      nestedLoopDepth = Math.max(0, nestedLoopDepth - 1)
    }
    
    // Detect synchronous file operations
    if (/fs\.(readFileSync|writeFileSync|readdirSync)/.test(line)) {
      issues.push({
        file: filePath,
        line: index + 1,
        type: 'synchronous-operation',
        message: 'Synchronous file operation detected',
        suggestion: 'Use async/await with fs.promises for better performance'
      })
    }
    
    // Detect inefficient queries
    if (/\.find\(.*\.find\(/.test(line)) {
      issues.push({
        file: filePath,
        line: index + 1,
        type: 'inefficient-query',
        message: 'Nested find operations detected',
        suggestion: 'Use a Map or Set for O(1) lookups instead of nested finds'
      })
    }
    
    // Detect potential memory leaks
    if (/setInterval|setTimeout/.test(line) && !/clearInterval|clearTimeout/.test(content.substring(index * 100))) {
      issues.push({
        file: filePath,
        line: index + 1,
        type: 'memory-leak',
        message: 'Timer without cleanup detected',
        suggestion: 'Ensure timers are cleared when component unmounts or function completes'
      })
    }
  })
  
  return issues
}

// CLI usage
if (require.main === module) {
  const filePath = process.argv[2] || 'src/**/*.ts'
  profilePerformance(filePath).then(issues => {
    if (issues.length > 0) {
      console.log(`Found ${issues.length} performance issues:`)
      issues.forEach(issue => {
        console.log(`${issue.file}:${issue.line} - ${issue.message}`)
        console.log(`  Fix: ${issue.suggestion}`)
      })
      process.exit(1)
    } else {
      console.log('No performance issues found.')
      process.exit(0)
    }
  })
}

