/**
 * Decrypt SendGrid credentials using master key approach
 * Flow: vault_key → decrypt master_key → master_key → decrypt credentials
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'
import { createDecipheriv, pbkdf2Sync } from 'crypto'

const ABEKEYS_DIR = join(homedir(), '.abekeys')
const ABEKEYS_VAULT = join(ABEKEYS_DIR, 'credentials')
const VAULT_KEY_PATH = join(ABEKEYS_DIR, 'vault_key.key')
const MASTER_KEY_PATH = join(ABEKEYS_DIR, '.master-key')

function getVaultKey(): Buffer {
  if (!existsSync(VAULT_KEY_PATH)) {
    throw new Error(`Vault key not found at ${VAULT_KEY_PATH}`)
  }
  const vaultKeyBase64 = readFileSync(VAULT_KEY_PATH, 'utf-8').trim()
  const vaultKey = Buffer.from(vaultKeyBase64, 'base64')
  if (vaultKey.length !== 32) {
    throw new Error(`Invalid vault key (expected 32 bytes, got ${vaultKey.length})`)
  }
  return vaultKey
}

function decryptMasterKey(): string {
  if (!existsSync(MASTER_KEY_PATH)) {
    throw new Error(`Master key file not found at ${MASTER_KEY_PATH}`)
  }

  const masterKeyData = JSON.parse(readFileSync(MASTER_KEY_PATH, 'utf-8'))
  
  // Check if master key is encrypted
  if (!masterKeyData.encrypted && !masterKeyData.ciphertext) {
    // Plain text master key
    return masterKeyData.master_key || masterKeyData.key || masterKeyData
  }

  // Decrypt master key using vault key
  const vaultKey = getVaultKey()
  const iterations = masterKeyData.iterations || 100000
  const salt = Buffer.from(masterKeyData.salt, 'hex')
  const derivedKey = pbkdf2Sync(vaultKey, salt, iterations, 32, 'sha256')
  const iv = Buffer.from(masterKeyData.iv, 'hex')
  const tag = Buffer.from(masterKeyData.tag, 'hex')
  const ciphertextHex = masterKeyData.ciphertext || masterKeyData.encrypted

  if (!ciphertextHex) {
    throw new Error('No ciphertext found in master key file')
  }

  const ciphertext = Buffer.from(ciphertextHex, 'hex')
  const decipher = createDecipheriv('aes-256-gcm', derivedKey, iv)
  decipher.setAuthTag(tag)

  let decrypted = decipher.update(ciphertext)
  decrypted = Buffer.concat([decrypted, decipher.final()])

  const decryptedJson = decrypted.toString('utf-8')
  const masterKeyObj = JSON.parse(decryptedJson)
  return masterKeyObj.master_key || masterKeyObj.key || decryptedJson
}

function decryptCredentialWithMasterKey(encrypted: any, masterKey: string): any {
  const iterations = encrypted.iterations || 100000
  const salt = Buffer.from(encrypted.salt, 'hex')
  
  // Use master key (as string) to derive key
  const masterKeyBuffer = Buffer.from(masterKey, 'utf-8')
  const derivedKey = pbkdf2Sync(masterKeyBuffer, salt, iterations, 32, 'sha256')
  
  const iv = Buffer.from(encrypted.iv, 'hex')
  const tag = Buffer.from(encrypted.tag, 'hex')
  const ciphertextHex = encrypted.ciphertext || encrypted.encrypted

  if (!ciphertextHex) {
    throw new Error('No ciphertext found')
  }

  const ciphertext = Buffer.from(ciphertextHex, 'hex')
  const decipher = createDecipheriv('aes-256-gcm', derivedKey, iv)
  decipher.setAuthTag(tag)

  let decrypted = decipher.update(ciphertext)
  decrypted = Buffer.concat([decrypted, decipher.final()])

  return JSON.parse(decrypted.toString('utf-8'))
}

// Main
try {
  console.log('🔐 Decrypting SendGrid credentials using master key approach...\n')
  
  // Step 1: Decrypt master key
  console.log('Step 1: Decrypting master key...')
  const masterKey = decryptMasterKey()
  console.log('✅ Master key decrypted (length:', masterKey.length, 'chars)')
  
  // Step 2: Read SendGrid credential
  const sendgridPath = join(ABEKEYS_VAULT, 'sendgrid.json')
  if (!existsSync(sendgridPath)) {
    throw new Error('SendGrid credential file not found')
  }
  
  console.log('\nStep 2: Reading SendGrid credential...')
  const sendgridData = JSON.parse(readFileSync(sendgridPath, 'utf-8'))
  
  // Step 3: Decrypt credential using master key
  if (!sendgridData.encrypted && !sendgridData.ciphertext) {
    console.log('✅ SendGrid credential is not encrypted')
    console.log('\nCredentials:', JSON.stringify(sendgridData, null, 2))
  } else {
    console.log('Step 3: Decrypting credential with master key...')
    const decrypted = decryptCredentialWithMasterKey(sendgridData, masterKey)
    console.log('✅ Credential decrypted successfully!')
    console.log('\nDecrypted credentials:')
    console.log(JSON.stringify(decrypted, null, 2))
    
    // Extract SendGrid fields
    console.log('\n📧 SendGrid Credentials:')
    console.log('API Key:', decrypted.api_key || decrypted.apiKey || 'NOT FOUND')
    console.log('From Email:', decrypted.from_email || decrypted.fromEmail || 'NOT FOUND')
    console.log('From Name:', decrypted.from_name || decrypted.fromName || 'NOT FOUND')
  }
} catch (error) {
  console.error('\n❌ Error:', error instanceof Error ? error.message : String(error))
  if (error instanceof Error && error.stack) {
    console.error('\nStack:', error.stack)
  }
  process.exit(1)
}
