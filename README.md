# Webinar Landing Page

A standalone Next.js application for webinar registration and landing pages.

## Features

- 🎯 Conversion-optimized landing page with A/B testing headlines
- ⏰ Real-time countdown timer
- 📧 Email registration with SendGrid integration
- 📱 Mobile-responsive design
- 🎨 Beautiful UI with Tailwind CSS
- ⚡ Built with Next.js 14

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- SendGrid account (for email functionality)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME=Your Team Name
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000/webinar](http://localhost:3000/webinar) in your browser.

### Build

```bash
npm run build
npm start
```

## Webinar Details

- **Date:** December 2, 2025
- **Time:** 2:00 PM EST
- **Route:** `/webinar`
- **Thank You Page:** `/webinar/thank-you`

## ICP Variations

The page supports different ICPs (Ideal Customer Profiles) via URL parameters:

- Developer: `/webinar?icp=developer`
- Creative: `/webinar?icp=creative`

## Project Structure

```
webinar-landing-page/
├── app/
│   ├── api/
│   │   └── webinar/
│   │       └── register/     # Registration API endpoint
│   ├── webinar/
│   │   ├── page.tsx          # Main landing page
│   │   └── thank-you/
│   │       └── page.tsx      # Thank you page
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── webinar/
│       ├── CountdownTimer.tsx
│       └── RealTimeNotifications.tsx
└── package.json
```

## Deployment

This project can be deployed to Vercel, Netlify, or any platform that supports Next.js.

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## License

MIT

