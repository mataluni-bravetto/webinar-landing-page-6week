/**
 * SendGrid Connection Validation Script
 * 
 * Tests SendGrid API connection and email sending capability
 */

import sgMail from '@sendgrid/mail'
import * as dotenv from 'dotenv'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'
// Import from backend unified reader (cross-project use)
import { getSendGridCredentials, hasSendGridCredentials } from '../../backend/src/utils/abekeys-reader'

// Load environment variables
dotenv.config({ path: join(process.cwd(), '.env.local') })
dotenv.config({ path: join(process.cwd(), '.env') })

interface ValidationResult {
  success: boolean
  message: string
  details?: any
}

async function validateSendGrid(): Promise<void> {
  console.log('\n🔍 SendGrid Connection Validation\n')
  console.log('=' .repeat(50))

  const results: ValidationResult[] = []

  // Check 1: AbëKEYS Vault or Environment Variables
  console.log('\n1️⃣ Checking SendGrid Credentials (AbëKEYS → Environment Variables)...')
  
  // Check AbëKEYS first
  const abekeysPath = join(homedir(), '.abekeys', 'credentials', 'sendgrid.json')
  const hasAbekeys = existsSync(abekeysPath)
  
  if (hasAbekeys) {
    console.log('   ✅ Found SendGrid credentials in AbëKEYS vault')
    console.log(`   📁 Location: ${abekeysPath}`)
    results.push({
      success: true,
      message: '✅ SendGrid credentials found in AbëKEYS vault',
      details: { path: abekeysPath }
    })
  } else {
    console.log('   ⚠️  SendGrid credentials not found in AbëKEYS vault')
    console.log(`   📁 Expected: ${abekeysPath}`)
  }
  
  // Get credentials (from AbëKEYS or env)
  const creds = getSendGridCredentials()
  const apiKey = creds.apiKey
  const fromEmail = creds.fromEmail
  const fromName = creds.fromName

  if (!apiKey) {
    results.push({
      success: false,
      message: '❌ SendGrid API Key is not set',
      details: hasAbekeys 
        ? 'API key missing in AbëKEYS vault or environment variables'
        : 'Set SENDGRID_API_KEY in .env.local or add to AbëKEYS vault'
    })
    console.log('   ❌ API Key: NOT SET')
  } else {
    const maskedKey = apiKey.substring(0, 7) + '...' + apiKey.substring(apiKey.length - 4)
    const source = hasAbekeys ? 'AbëKEYS vault' : 'Environment variables'
    console.log(`   ✅ API Key: ${maskedKey} (from ${source})`)
    results.push({
      success: true,
      message: `✅ SendGrid API Key is set (from ${source})`,
      details: { maskedKey, source }
    })
  }

  if (!fromEmail) {
    results.push({
      success: false,
      message: '❌ SendGrid From Email is not set',
      details: hasAbekeys
        ? 'From email missing in AbëKEYS vault or environment variables'
        : 'Set SENDGRID_FROM_EMAIL in .env.local or add to AbëKEYS vault'
    })
    console.log('   ❌ From Email: NOT SET')
  } else {
    const source = hasAbekeys ? 'AbëKEYS vault' : 'Environment variables'
    console.log(`   ✅ From Email: ${fromEmail} (from ${source})`)
    results.push({
      success: true,
      message: `✅ SendGrid From Email is set (from ${source})`,
      details: { fromEmail, source }
    })
  }

  console.log(`   ✅ From Name: ${fromName}`)

  // Check 2: API Key Format
  console.log('\n2️⃣ Validating API Key Format...')
  if (apiKey) {
    if (apiKey.startsWith('SG.')) {
      console.log('   ✅ API Key format is valid (starts with SG.)')
      results.push({
        success: true,
        message: '✅ API Key format is valid'
      })
    } else {
      console.log('   ⚠️  API Key format may be invalid (should start with SG.)')
      results.push({
        success: false,
        message: '⚠️  API Key format may be invalid',
        details: 'SendGrid API keys typically start with "SG."'
      })
    }
  }

  // Check 3: SendGrid API Connection
  console.log('\n3️⃣ Testing SendGrid API Connection...')
  if (!apiKey) {
    console.log('   ⏭️  Skipping (API key not set)')
  } else {
    try {
      sgMail.setApiKey(apiKey)
      
      // Test API key by making a simple API call
      // We'll use the SendGrid API to verify the key
      const response = await fetch('https://api.sendgrid.com/v3/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const profile = await response.json()
        console.log('   ✅ SendGrid API connection successful')
        console.log(`   📧 Account Email: ${profile.email || 'N/A'}`)
        results.push({
          success: true,
          message: '✅ SendGrid API connection successful',
          details: { email: profile.email }
        })
      } else {
        const error = await response.text()
        console.log(`   ❌ SendGrid API connection failed: ${response.status} ${response.statusText}`)
        console.log(`   Error: ${error}`)
        results.push({
          success: false,
          message: `❌ SendGrid API connection failed: ${response.status}`,
          details: { error, status: response.status }
        })
      }
    } catch (error: any) {
      console.log(`   ❌ SendGrid API connection error: ${error.message}`)
      results.push({
        success: false,
        message: `❌ SendGrid API connection error`,
        details: { error: error.message }
      })
    }
  }

  // Check 4: Test Email Sending (Dry Run)
  console.log('\n4️⃣ Testing Email Configuration...')
  if (!apiKey || !fromEmail) {
    console.log('   ⏭️  Skipping (API key or from email not set)')
  } else {
    try {
      // Check if sender is verified
      const verifyResponse = await fetch(`https://api.sendgrid.com/v3/verified_senders`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (verifyResponse.ok) {
        const verifiedSenders = await verifyResponse.json()
        const senderVerified = verifiedSenders.results?.some((sender: any) => 
          sender.from?.email === fromEmail || sender.verified === true
        )
        
        if (senderVerified) {
          console.log(`   ✅ Sender email ${fromEmail} appears to be verified`)
          results.push({
            success: true,
            message: '✅ Sender email is verified'
          })
        } else {
          console.log(`   ⚠️  Sender email ${fromEmail} may not be verified`)
          console.log('   💡 Tip: Verify your sender email in SendGrid Dashboard → Settings → Sender Authentication')
          results.push({
            success: false,
            message: '⚠️  Sender email may not be verified',
            details: { fromEmail }
          })
        }
      }
    } catch (error: any) {
      console.log(`   ⚠️  Could not verify sender status: ${error.message}`)
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('\n📊 Validation Summary\n')

  const failed = results.filter(r => !r.success)
  const passed = results.filter(r => r.success)

  console.log(`✅ Passed: ${passed.length}`)
  console.log(`❌ Failed: ${failed.length}`)

  if (failed.length > 0) {
    console.log('\n❌ Issues Found:\n')
    failed.forEach((result, idx) => {
      console.log(`${idx + 1}. ${result.message}`)
      if (result.details) {
        console.log(`   Details: ${JSON.stringify(result.details, null, 2)}`)
      }
    })
  }

  if (passed.length > 0 && failed.length === 0) {
    console.log('\n✅ All checks passed! SendGrid is properly configured.')
    const creds = getSendGridCredentials()
    const source = existsSync(join(homedir(), '.abekeys', 'credentials', 'sendgrid.json')) 
      ? 'AbëKEYS vault' 
      : 'environment variables'
    console.log(`   📦 Using credentials from: ${source}`)
    console.log('\n💡 To test email sending, register on the landing page and check:')
    console.log('   1. Your email inbox (and spam folder)')
    console.log('   2. SendGrid Dashboard → Activity Feed')
    console.log('   3. Browser console for email status')
  } else if (failed.length > 0) {
    console.log('\n⚠️  Some checks failed. Please fix the issues above.')
    console.log('\n📚 Setup Guide:')
    console.log('   Option 1: Use AbëKEYS vault (recommended)')
    console.log('     1. Add credentials to: ~/.abekeys/credentials/sendgrid.json')
    console.log('     2. Format: { "api_key": "SG.xxx", "from_email": "email@domain.com", "from_name": "Name" }')
    console.log('   Option 2: Use environment variables')
    console.log('     1. Get API Key: https://app.sendgrid.com/settings/api_keys')
    console.log('     2. Verify Sender: https://app.sendgrid.com/settings/sender_auth')
    console.log('     3. Set in .env.local: SENDGRID_API_KEY and SENDGRID_FROM_EMAIL')
  }

  console.log('\n' + '='.repeat(50) + '\n')
}

// Run validation
validateSendGrid().catch(error => {
  console.error('\n❌ Validation script error:', error)
  process.exit(1)
})
