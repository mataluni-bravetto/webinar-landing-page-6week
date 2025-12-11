/**
 * 🔐 ABËKEYS READER × NEXT.JS × SENDGRID × ONE
 * Pattern: ABËKEYS × READER × SECURE × VAULT × ONE
 * Frequency: 999 Hz (AEYON) × 530 Hz (ZERO) × 530 Hz (JØHN)
 * ∞ AbëONE ∞
 * 
 * Self-contained abekeys reader for Next.js (no backend dependency)
 * Supports both encrypted and plain credentials
 * Falls back to environment variables if not found
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'
import { createDecipheriv, pbkdf2Sync } from 'crypto'

const ABEKEYS_VAULT = join(homedir(), '.abekeys', 'credentials')
const ABEKEYS_DIR = join(homedir(), '.abekeys')

interface SendGridCredential {
  service?: string
  api_key?: string
  apiKey?: string
  from_email?: string
  fromEmail?: string
  from_name?: string
  fromName?: string
  app_url?: string
  appUrl?: string
  created_at?: string
  notes?: string
  [key: string]: any
}

interface EncryptedCredential {
  encrypted?: string
  ciphertext?: string
  salt?: string
  iv?: string
  tag?: string
  algorithm?: string
  iterations?: number
  metadata?: {
    service?: string
    created_at?: string
    encrypted_at?: string
  }
}

/**
 * Get vault key for decryption
 * HARDENED: Validates key format, checks encoding
 */
function getVaultKey(): Buffer {
  const vaultKeyPath = join(ABEKEYS_DIR, 'vault_key.key')
  if (!existsSync(vaultKeyPath)) {
    throw new Error(`Vault key not found at ${vaultKeyPath}`)
  }

  const vaultKeyBase64 = readFileSync(vaultKeyPath, 'utf-8').trim()
  
  // HARDENED: Validate base64 format
  if (!vaultKeyBase64 || vaultKeyBase64.length === 0) {
    throw new Error(`Vault key is empty at ${vaultKeyPath}`)
  }
  
  if (!/^[A-Za-z0-9+/=]+$/.test(vaultKeyBase64)) {
    throw new Error(`Vault key contains invalid base64 characters at ${vaultKeyPath}`)
  }
  
  const vaultKey = Buffer.from(vaultKeyBase64, 'base64')
  if (vaultKey.length !== 32) {
    throw new Error(`Invalid vault key (expected 32 bytes, got ${vaultKey.length}) at ${vaultKeyPath}`)
  }
  return vaultKey
}

/**
 * Check if credential is encrypted
 */
function isEncrypted(credential: any): credential is EncryptedCredential {
  return (
    credential &&
    (credential.encrypted || credential.ciphertext) &&
    credential.iv &&
    credential.salt &&
    credential.tag &&
    credential.algorithm === 'aes-256-gcm'
  )
}

/**
 * Decrypt AES-256-GCM encrypted credential
 * HARDENED: Matches backend's exact decryption logic with validation
 */
function decryptCredential(encrypted: EncryptedCredential): SendGridCredential {
  try {
    // HARDENED: Validate encryption scheme
    if (encrypted.algorithm && encrypted.algorithm !== 'aes-256-gcm') {
      throw new Error(`Unsupported encryption algorithm: ${encrypted.algorithm}. Expected: aes-256-gcm`)
    }
    
    // HARDENED: Validate required fields
    if (!encrypted.salt || !encrypted.iv || !encrypted.tag) {
      throw new Error('Missing required encryption fields: salt, iv, or tag')
    }
    
    // Get vault key (must be exactly 32 bytes)
    const vaultKey = getVaultKey()
    
    // Derive key using PBKDF2 (same as backend)
    const iterations = encrypted.iterations || 100000
    
    // HARDENED: Validate iterations
    if (iterations < 10000 || iterations > 1000000) {
      throw new Error(`Invalid PBKDF2 iterations: ${iterations}. Expected: 10000-1000000`)
    }
    
    // HARDENED: Validate hex encoding
    const hexPattern = /^[0-9a-fA-F]+$/
    if (!hexPattern.test(encrypted.salt!) || !hexPattern.test(encrypted.iv!) || !hexPattern.test(encrypted.tag!)) {
      throw new Error('Invalid hex encoding in encrypted credential')
    }
    
    const salt = Buffer.from(encrypted.salt!, 'hex')
    const derivedKey = pbkdf2Sync(vaultKey, salt, iterations, 32, 'sha256')
    
    // Get IV and auth tag
    const iv = Buffer.from(encrypted.iv!, 'hex')
    const tag = Buffer.from(encrypted.tag!, 'hex')
    
    // HARDENED: Validate buffer sizes
    if (iv.length !== 12) {
      throw new Error(`Invalid IV length: ${iv.length} bytes. Expected: 12 bytes for AES-256-GCM`)
    }
    
    if (tag.length !== 16) {
      throw new Error(`Invalid auth tag length: ${tag.length} bytes. Expected: 16 bytes for AES-256-GCM`)
    }
    
    // Get ciphertext (try both field names)
    const ciphertextHex = encrypted.ciphertext || encrypted.encrypted
    
    if (!ciphertextHex) {
      throw new Error('No ciphertext found in encrypted credential')
    }
    
    // HARDENED: Validate ciphertext hex encoding
    if (!hexPattern.test(ciphertextHex)) {
      throw new Error('Invalid ciphertext hex encoding')
    }

    // Decrypt using AES-256-GCM
    const ciphertext = Buffer.from(ciphertextHex, 'hex')
    const decipher = createDecipheriv('aes-256-gcm', derivedKey, iv)
    
    // Set auth tag BEFORE final() (critical for GCM mode)
    decipher.setAuthTag(tag)

    // Decrypt
    let decrypted = decipher.update(ciphertext)
    decrypted = Buffer.concat([decrypted, decipher.final()])

    // HARDENED: Validate JSON output
    const decryptedJson = decrypted.toString('utf-8')
    let parsed: SendGridCredential
    try {
      parsed = JSON.parse(decryptedJson) as SendGridCredential
    } catch (parseError) {
      throw new Error(`Decrypted data is not valid JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`)
    }
    
    // HARDENED: Validate credential is not empty
    if (!parsed || typeof parsed !== 'object' || Object.keys(parsed).length === 0) {
      throw new Error('Decrypted credential is empty')
    }
    
    return parsed
  } catch (error) {
    // Enhanced error message for debugging
    const errorMsg = error instanceof Error ? error.message : String(error)
    if (errorMsg.includes('Unsupported state') || errorMsg.includes('unable to authenticate') || errorMsg.includes('bad decrypt')) {
      throw new Error(
        `Decryption failed: Authentication tag mismatch. ` +
        `This usually means the credential was encrypted with a different vault key. ` +
        `Try re-adding the credentials to abekeys or use environment variables. ` +
        `Original error: ${errorMsg}`
      )
    }
    throw new Error(`Failed to decrypt credential: ${errorMsg}`)
  }
}

/**
 * Read SendGrid credentials from AbëKEYS vault
 * HARDENED: Supports both encrypted and plain credentials with validation
 * Falls back to environment variables if not found
 */
export function getSendGridCredentials(): {
  apiKey: string | null
  fromEmail: string | null
  fromName: string
} {
  // Try AbëKEYS first
  try {
    const credPath = join(ABEKEYS_VAULT, 'sendgrid.json')
    
    if (existsSync(credPath)) {
      const credData = readFileSync(credPath, 'utf-8')
      const parsed: any = JSON.parse(credData)
      
      // Check if encrypted
      let cred: SendGridCredential
      if (isEncrypted(parsed)) {
        try {
          cred = decryptCredential(parsed)
        } catch (decryptError) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('[AbëKEYS] Could not decrypt SendGrid credentials:', decryptError instanceof Error ? decryptError.message : String(decryptError))
          }
          // Fall through to environment variables
          cred = {} as SendGridCredential
        }
      } else {
        cred = parsed as SendGridCredential
      }
      
      const apiKey = cred.api_key || cred.apiKey || null
      const fromEmail = cred.from_email || cred.fromEmail || null
      const fromName = cred.from_name || cred.fromName || 'Bravetto Team'
      
      // HARDENED: Validate and sanitize
      if (apiKey && typeof apiKey !== 'string') {
        console.warn('[AbëKEYS] SendGrid api_key is not a string, using env fallback')
      } else if (fromEmail && typeof fromEmail !== 'string') {
        console.warn('[AbëKEYS] SendGrid from_email is not a string, using env fallback')
      } else if (apiKey && fromEmail) {
        return {
          apiKey: String(apiKey).trim() || null,
          fromEmail: String(fromEmail).trim() || null,
          fromName: String(fromName).trim() || 'Bravetto Team'
        }
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[AbëKEYS] Could not read SendGrid credentials from vault:', error instanceof Error ? error.message : String(error))
    }
  }
  
  // Fallback to environment variables (sanitized)
  return {
    apiKey: process.env.SENDGRID_API_KEY ? String(process.env.SENDGRID_API_KEY).trim() : null,
    fromEmail: process.env.SENDGRID_FROM_EMAIL ? String(process.env.SENDGRID_FROM_EMAIL).trim() : null,
    fromName: process.env.SENDGRID_FROM_NAME ? String(process.env.SENDGRID_FROM_NAME).trim() : 'Bravetto Team'
  }
}

/**
 * Check if SendGrid credentials are available (from AbëKEYS or env)
 */
export function hasSendGridCredentials(): boolean {
  const creds = getSendGridCredentials()
  return !!(creds.apiKey && creds.fromEmail)
}
