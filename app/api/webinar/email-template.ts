/**
 * EMAIL TEMPLATE - YAGNI APPROVED, UNIFIED, AMPLIFIED
 * 
 * Pattern: EMAIL × TEMPLATE × UNIFIED × ONE
 * Guardians: YAGNI × JØHN × AEYON
 * 
 * Single source of truth for email content.
 * Amplified signal: Instant value delivery.
 */

export function createEmailTemplate(firstName: string, urls: {
  githubRepo: string
  methodologyReport: string
  landingPage: string
}) {
  const subject = 'Your Validation Toolkit is Ready (Instant Access)'
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #334e68; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0f4f8;">
  <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h1 style="color: #102a43; margin-top: 0; font-size: 28px;">Welcome, ${firstName}!</h1>
    
    <p style="font-size: 16px; color: #334e68;">You're registered for the webinar, and your <strong>Validation Toolkit is ready right now</strong>—no waiting required.</p>
    
    <div style="background: #f0f4f8; border-left: 4px solid #486581; padding: 20px; margin: 25px 0; border-radius: 4px;">
      <h2 style="color: #102a43; margin-top: 0; font-size: 20px;">Your Instant Access Deliverables:</h2>
      
      <div style="margin: 20px 0;">
        <h3 style="color: #486581; font-size: 18px; margin-bottom: 8px;">→ Complete Validation Toolkit</h3>
        <p style="margin: 8px 0; color: #334e68;">5 validation scripts, configuration files, and documentation. MIT licensed, production-ready.</p>
        <a href="${urls.githubRepo}" style="display: inline-block; background: #486581; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 8px;">Access GitHub Repository →</a>
      </div>
      
      <div style="margin: 20px 0;">
        <h3 style="color: #486581; font-size: 18px; margin-bottom: 8px;">→ Methodology Report</h3>
        <p style="margin: 8px 0; color: #334e68;">Complete 3-Step Validation Pipeline documentation. Test results, real-world examples, CI/CD integration guide.</p>
        <a href="${urls.methodologyReport}" style="display: inline-block; background: #486581; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 8px;">Read Methodology Report →</a>
      </div>
      
      <div style="margin: 20px 0;">
        <h3 style="color: #486581; font-size: 18px; margin-bottom: 8px;">→ Webinar Details</h3>
        <p style="margin: 8px 0; color: #334e68;">
          <strong>Date:</strong> Thursday, December 4, 2025<br>
          <strong>Time:</strong> 2:00 PM EST<br>
          <strong>Duration:</strong> 60 minutes
        </p>
        <p style="margin: 12px 0 0 0; color: #334e68;">We'll send you the webinar link and calendar invite 24 hours before the event.</p>
      </div>
    </div>
    
    <div style="border-top: 1px solid #d9e2ec; padding-top: 20px; margin-top: 30px;">
      <h3 style="color: #102a43; font-size: 18px;">What's Next?</h3>
      <ol style="color: #334e68; padding-left: 20px;">
        <li style="margin: 8px 0;">Clone the repository and explore the validation scripts</li>
        <li style="margin: 8px 0;">Read the methodology report to understand the approach</li>
        <li style="margin: 8px 0;">Join the webinar to see it in action and ask questions</li>
      </ol>
    </div>
    
    <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #d9e2ec; color: #627d98; font-size: 14px;">
      <strong>Why immediate access?</strong> We want you to experience the validation system before the webinar. Use it, test it, come prepared with questions. Zero risk, maximum value.
    </p>
    
    <p style="margin-top: 25px; color: #334e68;">
      Best regards,<br>
      <strong style="color: #102a43;">The AI Validation Team</strong>
    </p>
  </div>
  
  <div style="text-align: center; margin-top: 20px; color: #9fb3c8; font-size: 12px;">
    <p>You're receiving this because you registered for the AI Code Validation Webinar.</p>
    <p><a href="${urls.landingPage}" style="color: #486581;">View Landing Page</a> | <a href="#" style="color: #486581;">Unsubscribe</a></p>
  </div>
</body>
</html>
  `.trim()

  const text = `
Welcome, ${firstName}!

You're registered for the webinar, and your Validation Toolkit is ready right now—no waiting required.

YOUR INSTANT ACCESS DELIVERABLES:

→ Complete Validation Toolkit
5 validation scripts, configuration files, and documentation. MIT licensed, production-ready.
Access: ${urls.githubRepo}

→ Methodology Report
Complete 3-Step Validation Pipeline documentation. Test results, real-world examples, CI/CD integration guide.
Access: ${urls.methodologyReport}

→ Webinar Details
Date: Thursday, December 4, 2025
Time: 2:00 PM EST
Duration: 60 minutes

We'll send you the webinar link and calendar invite 24 hours before the event.

WHAT'S NEXT?
1. Clone the repository and explore the validation scripts
2. Read the methodology report to understand the approach
3. Join the webinar to see it in action and ask questions

Why immediate access? We want you to experience the validation system before the webinar. Use it, test it, come prepared with questions. Zero risk, maximum value.

Best regards,
The AI Validation Team
  `.trim()

  return { subject, html, text }
}

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://webinar-landing-page-backup.vercel.app')
}

export function getUrls() {
  const baseUrl = getBaseUrl()
  return {
    githubRepo: process.env.GITHUB_REPO_URL || 'https://github.com/your-org/ai-validation-toolkit',
    methodologyReport: `${baseUrl}/VALIDATION_METHODOLOGY_REPORT.md`,
    landingPage: `${baseUrl}/webinar`
  }
}

