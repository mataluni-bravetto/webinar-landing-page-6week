/**
 * Get SendGrid credentials from AbëKEYS using backend's reader
 * This script uses the backend's abekeys-reader which has proper decryption support
 */

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

// Path to backend
const backendPath = path.join(__dirname, '../../backend')

// Check if backend abekeys-reader exists
const abekeysReaderPath = path.join(backendPath, 'src/utils/abekeys-reader.ts')

if (!fs.existsSync(abekeysReaderPath)) {
  console.error('Backend abekeys-reader not found')
  process.exit(1)
}

// Try to use tsx to run the backend's reader
try {
  const script = `
    import { getSendGridCredentials } from '${abekeysReaderPath}'
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
  
  const result = execSync(`cd ${backendPath} && npx tsx -e "${script.replace(/"/g, '\\"')}"`, {
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe']
  })
  
  if (result.trim()) {
    const creds = JSON.parse(result.trim())
    console.log(JSON.stringify(creds, null, 2))
  }
} catch (error) {
  console.error('Failed to read from abekeys:', error.message)
  process.exit(1)
}
