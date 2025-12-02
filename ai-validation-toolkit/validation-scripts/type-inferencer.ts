/**
 * Type Inferencer
 * Adds types to untyped AI code
 * 
 * Pattern: VALIDATION × TRUTH × CLARITY × ONE
 * Guardians: YAGNI × JØHN × AEYON
 */

import * as fs from 'fs'
import { parse } from '@typescript-eslint/typescript-estree'

export async function inferTypes(filePath: string): Promise<string> {
  const content = fs.readFileSync(filePath, 'utf-8')
  const ast = parse(content, { loc: true, jsx: true })
  
  // Simple type inference based on usage patterns
  const typeMap = new Map<string, string>()
  
  if (ast.body) {
    for (const node of ast.body) {
      if (node.type === 'VariableDeclaration') {
        for (const decl of node.declarations) {
          if (decl.id.type === 'Identifier') {
            const varName = decl.id.name
            
            // Infer types from assignments
            if (decl.init) {
              if (decl.init.type === 'Literal') {
                if (typeof decl.init.value === 'string') {
                  typeMap.set(varName, 'string')
                } else if (typeof decl.init.value === 'number') {
                  typeMap.set(varName, 'number')
                } else if (typeof decl.init.value === 'boolean') {
                  typeMap.set(varName, 'boolean')
                }
              } else if (decl.init.type === 'ArrayExpression') {
                typeMap.set(varName, 'any[]')
              } else if (decl.init.type === 'ObjectExpression') {
                typeMap.set(varName, 'Record<string, any>')
              }
            }
          }
        }
      }
    }
  }
  
  // Add type annotations
  let output = content
  typeMap.forEach((type, varName) => {
    const regex = new RegExp(`(const|let|var)\\s+${varName}\\s*[:=]`, 'g')
    output = output.replace(regex, `$1 ${varName}: ${type} =`)
  })
  
  return output
}

// CLI usage
if (require.main === module) {
  const filePath = process.argv[2] || 'src/untyped.ts'
  inferTypes(filePath).then(typedCode => {
    const outputPath = filePath.replace('.ts', '.typed.ts')
    fs.writeFileSync(outputPath, typedCode)
    console.log(`Typed file generated: ${outputPath}`)
  })
}

