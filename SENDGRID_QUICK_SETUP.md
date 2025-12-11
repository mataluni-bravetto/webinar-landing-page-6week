# 🚀 SendGrid Quick Setup Guide

## Issue Found
Your SendGrid environment variables are **not configured**. This is why emails aren't being sent.

## Quick Fix (5 minutes)

### Step 1: Get Your SendGrid API Key

1. **Login to SendGrid:**
   - Go to: https://app.sendgrid.com
   - Sign in (or create free account - 100 emails/day free)

2. **Create API Key:**
   - Navigate: **Settings** → **API Keys** → **Create API Key**
   - Name: `Webinar Landing Page`
   - Permissions: **Full Access** (or **Mail Send** only)
   - **Copy the API key** (starts with `SG.` - you'll only see it once!)

### Step 2: Verify Your Sender Email

1. **Go to:** **Settings** → **Sender Authentication**
2. **Click:** **"Verify a Single Sender"** (for testing)
   - Enter your email address
   - Fill in the form
   - Check your email and click the verification link
   - **Status must show "Verified"** ✅

   OR (for production):

3. **Authenticate Your Domain** (recommended for production)
   - Click **"Authenticate Your Domain"**
   - Follow DNS setup instructions
   - Add SPF, DKIM, DMARC records
   - Wait for verification (24-48 hours)

### Step 3: Create `.env.local` File

In the `webinar-landing-page` directory, create a file named `.env.local`:

```bash
cd /Users/michaelmataluni/Desktop/AbëONE-System/webinar-landing-page
touch .env.local
```

Then add your credentials:

```env
SENDGRID_API_KEY=SG.your_actual_api_key_here
SENDGRID_FROM_EMAIL=your-verified-email@yourdomain.com
SENDGRID_FROM_NAME=Bravetto Team
```

**Important:** 
- Replace `SG.your_actual_api_key_here` with your actual API key
- Replace `your-verified-email@yourdomain.com` with the email you verified in SendGrid
- The `.env.local` file is gitignored (won't be committed)

### Step 4: Validate Configuration

Run the validation script:

```bash
npm run validate:sendgrid
```

You should see:
```
✅ Passed: 3
❌ Failed: 0
✅ All checks passed! SendGrid is properly configured.
```

### Step 5: Test Email Sending

1. **Restart your dev server** (if running):
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Register on the landing page:**
   - Go to: http://localhost:3000/webinar
   - Fill out the registration form
   - Submit

3. **Check for email:**
   - Check your inbox (and spam folder)
   - Check SendGrid Dashboard → **Activity Feed** to see delivery status

## Troubleshooting

### Email Not Received?

1. **Check SendGrid Activity Feed:**
   - Go to: https://app.sendgrid.com/activity
   - Look for your email and check status
   - Common issues:
     - **Bounced:** Sender email not verified
     - **Blocked:** Email in spam/blocked list
     - **Pending:** Still processing

2. **Check Server Logs:**
   - Look at terminal where `npm run dev` is running
   - Check for SendGrid errors

3. **Verify Environment Variables:**
   ```bash
   npm run validate:sendgrid
   ```

4. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Check Network tab for `/api/webinar/register` response
   - Look for `emailSent: false` or `emailError` in response

### Common Errors

**Error: "Sender email not verified"**
- Solution: Verify your sender email in SendGrid Dashboard

**Error: "API key invalid"**
- Solution: Check that API key starts with `SG.` and is correct

**Error: "Forbidden"**
- Solution: Check API key permissions (needs Mail Send access)

## Need Help?

- SendGrid Docs: https://docs.sendgrid.com
- SendGrid Support: https://support.sendgrid.com
- Check validation script output: `npm run validate:sendgrid`
