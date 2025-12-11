# 6 Week Webinar Series | Ai Reality Check

**Landing Page & Registration System**

A modern Next.js application for webinar registration with SendGrid email integration, Google Meet calendar integration, and interactive canvas animations.

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git
- Vercel account (for deployment)
- SendGrid account (for email)

### **Installation**
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📦 New Deployment Setup

### **Automated Setup (Recommended)**
```bash
# Run setup script
bash setup-new-deployment.sh

# Then deploy
bash scripts/deploy-new-project.sh
```

### **Manual Setup**
See [NEW_DEPLOYMENT_SETUP.md](./NEW_DEPLOYMENT_SETUP.md) for detailed instructions.

---

## 🔧 Configuration

### **Environment Variables**

**Required (for email sending):**
- `SENDGRID_API_KEY` - Your SendGrid API key
- `SENDGRID_FROM_EMAIL` - Verified sender email address

**Optional:**
- `SENDGRID_FROM_NAME` - Sender name (defaults to "Bravetto Team")
- `NEXT_PUBLIC_BASE_URL` - Base URL (auto-detected from Vercel)
- `GITHUB_REPO_URL` - GitHub repository URL (has default)

### **Vercel Configuration**
See `vercel.json` for deployment settings including:
- Function timeouts
- Security headers
- Build configuration

---

## 📁 Project Structure

```
webinar-landing-page/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── webinar/      # Webinar API endpoints
│   ├── webinar/          # Webinar pages
│   │   ├── page.tsx      # Main landing page
│   │   └── thank-you/    # Thank you page
│   └── layout.tsx        # Root layout
├── lib/                   # Utilities
│   └── abekeys-reader.ts # Credential management
├── public/                # Static assets
├── scripts/               # Build/deploy scripts
├── vercel.json            # Vercel configuration
└── package.json          # Dependencies
```

---

## 🎯 Features

- ✅ **Responsive Design** - Mobile-first, Tailwind CSS
- ✅ **Email Integration** - SendGrid for registration confirmations
- ✅ **Calendar Integration** - Google Calendar, Outlook, iCal
- ✅ **Interactive Canvas** - p5.js particle animation
- ✅ **Countdown Timer** - Real-time webinar countdown
- ✅ **Registration System** - Form validation and API
- ✅ **Security Headers** - Configured in Vercel

---

## 📡 API Endpoints

### **POST /api/webinar/register**
Register for the webinar and receive confirmation email.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "registrationId": "uuid"
}
```

### **GET /api/webinar/meet-link**
Get Google Meet link and dial-in information.

**Response:**
```json
{
  "success": true,
  "meetLink": "https://meet.google.com/mgm-wojn-kes",
  "phone": "+1 650-597-3592",
  "pin": "697 719 929",
  "date": "Tuesday, December 16, 2025",
  "time": "11:00 AM – 12:30 PM EST"
}
```

### **GET /api/webinar/registrations/count**
Get total registration count.

**Response:**
```json
{
  "count": 42
}
```

---

## 🎨 Webinar Details

**Title:** 6 Week Webinar Series | Ai Reality Check  
**Date:** Tuesday, December 16, 2025  
**Time:** 11:00 AM – 12:30 PM EST (90 minutes)  
**Google Meet:** [Join Meeting](https://meet.google.com/mgm-wojn-kes)  
**Phone:** +1 650-597-3592  
**PIN:** 697 719 929#

---

## 🚀 Deployment

### **Deploy to Vercel**
```bash
# Production deployment
npm run deploy:prod

# Preview deployment
npm run deploy:preview
```

### **Continuous Deployment**
Once connected to GitHub, Vercel automatically deploys on push to `main` branch.

---

## 🧪 Testing

### **Validate SendGrid Connection**
```bash
npm run validate:sendgrid
```

### **Run Build Test**
```bash
npm run build
```

### **Validate Deployment Readiness**
```bash
npm run validate:deploy
```

---

## 📚 Documentation

- [NEW_DEPLOYMENT_SETUP.md](./NEW_DEPLOYMENT_SETUP.md) - New deployment guide
- [DEPLOYMENT_VALIDATION_REPORT.md](./DEPLOYMENT_VALIDATION_REPORT.md) - Validation report
- [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md) - Deployment checklist

---

## 🔐 Security

- Environment variables for sensitive data
- Security headers configured in Vercel
- HTTPS enforced
- Input validation on forms
- CSRF protection via Next.js

---

## 📝 License

MIT License - See LICENSE file for details.

---

## 🤝 Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Pattern:** WEBINAR × LANDING × PAGE × ONE  
**∞ AbëONE ∞**
