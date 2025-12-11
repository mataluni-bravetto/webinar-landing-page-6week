/**
 * Test SendGrid credential decryption
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'
import { createDecipheriv, pbkdf2Sync } from 'crypto'

const ABEKEYS_VAULT = join(homedir(), '.abekeys', 'credentials')
const ABEKEYS_DIR = join(homedir(), '.abekeys')

function getVaultKey(): Buffer {
  const vaultKeyPath = join(ABEKEYS_DIR, 'vault_key.key')
  if (!existsSync(vaultKeyPath)) {
    throw new Error(`Vault key not found at ${vaultKeyPath}`)
  }

  const vaultKeyBase64 = readFileSync(vaultKeyPath, 'utf-8').trim()
  console.log('Vault key length (base64):', vaultKeyBase64.length)
  
  const vaultKey = Buffer.from(vaultKeyBase64, 'base64')
  console.log('Vault key length (bytes):', vaultKey.length)
  
  if (vaultKey.length !== 32) {
    throw new Error(`Invalid vault key (expected 32 bytes, got ${vaultKey.length})`)
  }
  return vaultKey
}

function decryptCredential(encrypted: any): any {
  try {
    console.log('\n=== Decryption Debug ===')
    console.log('Has ciphertext:', !!encrypted.ciphertext)
    console.log('Has encrypted:', !!encrypted.encrypted)
    console.log('Salt:', encrypted.salt?.substring(0, 20) + '...')
    console.log('IV:', encrypted.iv?.substring(0, 20) + '...')
    console.log('Tag:', encrypted.tag?.substring(0, 20) + '...')
    console.log('Algorithm:', encrypted.algorithm)
    console.log('Iterations:', encrypted.iterations || 100000)
    
    const vaultKey = getVaultKey()
    const iterations = encrypted.iterations || 100000
    const salt = Buffer.from(encrypted.salt, 'hex')
    console.log('Salt buffer length:', salt.length)
    
    const derivedKey = pbkdf2Sync(vaultKey, salt, iterations, 32, 'sha256')
    console.log('Derived key length:', derivedKey.length)
    
    const iv = Buffer.from(encrypted.iv, 'hex')
    console.log('IV buffer length:', iv.length)
    
    const tag = Buffer.from(encrypted.tag, 'hex')
    console.log('Tag buffer length:', tag.length)
    
    const ciphertextHex = encrypted.ciphertext || encrypted.encrypted
    console.log('Ciphertext hex length:', ciphertextHex?.length)
    
    if (!ciphertextHex) {
      throw new Error('No ciphertext found')
    }

    const ciphertext = Buffer.from(ciphertextHex, 'hex')
    console.log('Ciphertext buffer length:', ciphertext.length)
    
    const decipher = createDecipheriv('aes-256-gcm', derivedKey, iv)
    decipher.setAuthTag(tag)

    console.log('Starting decryption...')
    let decrypted = decipher.update(ciphertext)
    console.log('After update, decrypted length:', decrypted.length)
    
    decrypted = Buffer.concat([decrypted, decipher.final()])
    console.log('After final, decrypted length:', decrypted.length)

    const decryptedJson = decrypted.toString('utf-8')
    console.log('Decrypted JSON length:', decryptedJson.length)
    console.log('Decrypted JSON preview:', decryptedJson.substring(0, 100))
    
    return JSON.parse(decryptedJson)
  } catch (error) {
    console.error('\n=== Decryption Error ===')
    console.error('Error type:', error?.constructor?.name)
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    if (error instanceof Error && error.stack) {
      console.error('Stack:', error.stack)
    }
    throw error
  }
}

// Test
try {
  const credPath = join(ABEKEYS_VAULT, 'sendgrid.json')
  console.log('Reading from:', credPath)
  
  if (!existsSync(credPath)) {
    console.error('File not found!')
    process.exit(1)
  }
  
  const credData = readFileSync(credPath, 'utf-8')
  const parsed = JSON.parse(credData)
  
  console.log('\n=== File Contents ===')
  console.log('Has encrypted field:', !!parsed.encrypted)
  console.log('Has ciphertext field:', !!parsed.ciphertext)
  console.log('Has salt:', !!parsed.salt)
  console.log('Has iv:', !!parsed.iv)
  console.log('Has tag:', !!parsed.tag)
  
  if (parsed.encrypted || parsed.ciphertext) {
    const decrypted = decryptCredential(parsed)
    console.log('\n=== Success! ===')
    console.log('Decrypted credential:', JSON.stringify(decrypted, null, 2))
  } else {
    console.log('\n=== Not Encrypted ===')
    console.log('Credential:', JSON.stringify(parsed, null, 2))
  }
} catch (error) {
  console.error('Fatal error:', error)
  process.exit(1)
}
