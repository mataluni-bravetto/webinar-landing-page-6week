/**
 * Use backend's abekeys-reader to get SendGrid credentials
 * This script calls the backend's reader which has proper decryption support
 */

import { execSync } from 'child_process'
import { join } from 'path'
import { existsSync } from 'fs'

const backendPath = join(__dirname, '../../backend')
const backendReaderPath = join(backendPath, 'src/utils/abekeys-reader.ts')

if (!existsSync(backendReaderPath)) {
  console.error('Backend abekeys-reader not found at:', backendReaderPath)
  process.exit(1)
}

try {
  // Use tsx to run backend's unified reader
  const script = `
    import { getSendGridCredentials } from '${backendReaderPath}'
    try {
      const creds = getSendGridCredentials()
      console.log(JSON.stringify({
        api_key: creds.apiKey,
        from_email: creds.fromEmail,
        from_name: creds.fromName
      }))
    } catch (e) {
      console.error('Error:', e.message)
      process.exit(1)
    }
  `
  
  const result = execSync(`cd ${backendPath} && npx tsx -e "${script.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`, {
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
    cwd: backendPath
  })
  
  if (result.trim()) {
    const creds = JSON.parse(result.trim())
    console.log(JSON.stringify(creds, null, 2))
    process.exit(0)
  } else {
    console.error('No output from backend reader')
    process.exit(1)
  }
} catch (error: any) {
  console.error('Failed to read from backend abekeys:', error.message)
  if (error.stdout) console.log('Stdout:', error.stdout)
  if (error.stderr) console.error('Stderr:', error.stderr)
  process.exit(1)
}
