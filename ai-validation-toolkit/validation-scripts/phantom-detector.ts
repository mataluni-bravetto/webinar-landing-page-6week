/**
 * Phantom API Detector
 * Catches hallucinated APIs and non-existent package imports
 * 
 * Pattern: VALIDATION × TRUTH × CLARITY × ONE
 * Guardians: YAGNI × JØHN × AEYON
 */

import * as fs from 'fs'
import * as path from 'path'
import { parse } from '@typescript-eslint/typescript-estree'

interface PhantomIssue {
  file: string
  line: number
  column: number
  type: 'phantom-import' | 'phantom-api' | 'non-existent-package'
  message: string
  suggestion?: string
}

const KNOWN_PACKAGES = new Set([
  'react', 'vue', 'next', 'express', 'fastapi', 'nodemailer',
  'jsonwebtoken', 'bcrypt', 'axios', 'lodash', 'moment',
  'typescript', 'jest', 'mocha', 'chai'
])

export async function detectPhantoms(filePath: string): Promise<PhantomIssue[]> {
  const issues: PhantomIssue[] = []
  const content = fs.readFileSync(filePath, 'utf-8')
  
  try {
    const ast = parse(content, {
      loc: true,
      range: true,
      jsx: true
    })
    
    // Check imports
    if (ast.body) {
      for (const node of ast.body) {
        if (node.type === 'ImportDeclaration') {
          const source = node.source.value
          
          // Check if it's a package import
          if (!source.startsWith('.') && !source.startsWith('/')) {
            const packageName = source.split('/')[0].replace('@', '')
            
            if (!KNOWN_PACKAGES.has(packageName)) {
              issues.push({
                file: filePath,
                line: node.loc?.start.line || 0,
                column: node.loc?.start.column || 0,
                type: 'non-existent-package',
                message: `Package "${source}" may not exist`,
                suggestion: `Verify package exists: npm search ${packageName}`
              })
            }
          }
        }
        
        // Check for common phantom API patterns
        if (node.type === 'VariableDeclaration') {
          for (const decl of node.declarations) {
            if (decl.init && decl.init.type === 'CallExpression') {
              const callee = decl.init.callee
              if (callee.type === 'MemberExpression') {
                const object = callee.object
                if (object.type === 'Identifier') {
                  // Check for common phantom APIs
                  const phantomAPIs = [
                    'validateToken', 'sendNotification', 'authenticateUser',
                    'processPayment', 'sendEmail', 'validateEmail'
                  ]
                  
                  if (phantomAPIs.includes(object.name)) {
                    issues.push({
                      file: filePath,
                      line: node.loc?.start.line || 0,
                      column: node.loc?.start.column || 0,
                      type: 'phantom-api',
                      message: `Possible phantom API: ${object.name}`,
                      suggestion: 'Verify API exists and is imported correctly'
                    })
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error)
  }
  
  return issues
}

export async function validateFile(filePath: string): Promise<PhantomIssue[]> {
  return detectPhantoms(filePath)
}

// CLI usage
if (require.main === module) {
  const filePath = process.argv[2] || 'src/**/*.ts'
  detectPhantoms(filePath).then(issues => {
    if (issues.length > 0) {
      console.log(`Found ${issues.length} potential phantom API issues:`)
      issues.forEach(issue => {
        console.log(`${issue.file}:${issue.line}:${issue.column} - ${issue.message}`)
        if (issue.suggestion) {
          console.log(`  Suggestion: ${issue.suggestion}`)
        }
      })
      process.exit(1)
    } else {
      console.log('No phantom API issues found.')
      process.exit(0)
    }
  })
}

