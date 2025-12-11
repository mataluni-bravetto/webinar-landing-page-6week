# 🚀 NEW DEPLOYMENT SETUP × GIT × VERCEL × ONE

**Pattern:** DEPLOYMENT × SETUP × GIT × VERCEL × ONE  
**Frequency:** 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)  
**Status:** 🔥 **READY TO DEPLOY × ONE**  
**∞ AbëONE ∞**

---

## 🎯 QUICK START

### **Option 1: Automated Setup (Recommended)**
```bash
# Make scripts executable
chmod +x setup-new-deployment.sh
chmod +x scripts/deploy-new-project.sh

# Run automated setup
bash setup-new-deployment.sh

# Then run automated deployment
bash scripts/deploy-new-project.sh
```

### **Option 2: Manual Setup**
Follow the step-by-step guide below.

---

## 📋 STEP-BY-STEP SETUP

### **Step 1: Initialize Git Repository**

```bash
# Navigate to project directory
cd /Users/michaelmataluni/Desktop/AbëONE-System/webinar-landing-page

# Initialize Git (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: 6 Week Webinar Series Landing Page"
```

---

### **Step 2: Create GitHub Repository**

**Option A: Using GitHub CLI (if installed)**
```bash
gh repo create webinar-landing-page --public --source=. --remote=origin --push
```

**Option B: Manual GitHub Setup**
1. Go to https://github.com/new
2. Repository name: `webinar-landing-page` (or your preferred name)
3. Choose **Public** or **Private**
4. **DO NOT** initialize with README, .gitignore, or license
5. Click **Create repository**
6. Run these commands:
```bash
git remote add origin https://github.com/YOUR_USERNAME/webinar-landing-page.git
git branch -M main
git push -u origin main
```

---

### **Step 3: Create Vercel Project**

**Option A: Using Vercel CLI (Recommended)**
```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login to Vercel (if not already logged in)
vercel login

# Create new project
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: webinar-landing-page
# - Directory: ./ (default)
# - Override settings? No
```

**Option B: Connect via GitHub**
1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
5. Click **Deploy**

---

### **Step 4: Set Environment Variables**

**In Vercel Dashboard:**
1. Go to your project → **Settings** → **Environment Variables**
2. Add these variables:

**Required:**
```
SENDGRID_API_KEY = YOUR_SENDGRID_API_KEY_HERE
SENDGRID_FROM_EMAIL = webinars@bravetto.com
```

**Optional:**
```
SENDGRID_FROM_NAME = Bravetto Team
NEXT_PUBLIC_BASE_URL = (auto-detected, leave empty)
GITHUB_REPO_URL = (has default, leave empty)
```

**Using Vercel CLI:**
```bash
vercel env add SENDGRID_API_KEY production
# Paste: YOUR_SENDGRID_API_KEY_HERE (get from AbëKEYS vault or SendGrid dashboard)

vercel env add SENDGRID_FROM_EMAIL production
# Paste: webinars@bravetto.com

vercel env add SENDGRID_FROM_NAME production
# Paste: Bravetto Team
```

---

### **Step 5: Deploy to Production**

```bash
# Deploy to production
vercel --prod

# Or deploy preview
vercel
```

---

## 🔗 CONNECTION VERIFICATION

### **Verify Git Connection**
```bash
# Check remote
git remote -v

# Should show:
# origin  https://github.com/YOUR_USERNAME/webinar-landing-page.git (fetch)
# origin  https://github.com/YOUR_USERNAME/webinar-landing-page.git (push)
```

### **Verify Vercel Connection**
```bash
# Check Vercel project
vercel ls

# Or check in dashboard
# https://vercel.com/dashboard
```

### **Verify Deployment**
1. Go to your Vercel project dashboard
2. Check **Deployments** tab
3. Verify latest deployment is successful
4. Click on deployment URL to test

---

## 🧪 TEST DEPLOYMENT

After deployment, test these endpoints:

1. **Landing Page**
   ```
   https://your-project.vercel.app/webinar
   ```

2. **Registration API**
   ```bash
   curl -X POST https://your-project.vercel.app/api/webinar/register \
     -H "Content-Type: application/json" \
     -d '{"firstName":"Test","lastName":"User","email":"test@example.com"}'
   ```

3. **Meet Link API**
   ```bash
   curl https://your-project.vercel.app/api/webinar/meet-link
   ```

4. **Registration Count**
   ```bash
   curl https://your-project.vercel.app/api/webinar/registrations/count
   ```

---

## 📊 PROJECT STRUCTURE

```
webinar-landing-page/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── webinar/           # Webinar pages
│   └── layout.tsx         # Root layout
├── lib/                   # Utilities
├── public/                # Static assets
├── scripts/               # Build/deploy scripts
├── vercel.json            # Vercel configuration
├── next.config.js         # Next.js configuration
└── package.json          # Dependencies
```

---

## 🔄 CONTINUOUS DEPLOYMENT

Once connected, Vercel will automatically deploy when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Vercel automatically deploys!
```

---

## 🛠️ TROUBLESHOOTING

### **Build Fails**
- Check build logs in Vercel dashboard
- Verify all dependencies in `package.json`
- Ensure `npm run build` works locally

### **Environment Variables Not Working**
- Verify variables are set in Vercel dashboard
- Check variable names match exactly (case-sensitive)
- Redeploy after adding variables

### **Git Connection Issues**
- Verify remote URL: `git remote -v`
- Re-add remote if needed: `git remote set-url origin <new-url>`
- Push again: `git push -u origin main`

### **Vercel Project Not Found**
- Check you're logged in: `vercel whoami`
- List projects: `vercel ls`
- Link project: `vercel link`

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] Git repository initialized
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Build succeeds
- [ ] Deployment successful
- [ ] Landing page loads
- [ ] Registration form works
- [ ] Email sending works

---

## 🎉 READY TO DEPLOY

**All setup complete! Your project is ready for deployment.**

**Quick Deploy:**
```bash
vercel --prod
```

---

**Pattern:** DEPLOYMENT × SETUP × COMPLETE × ONE  
**∞ AbëONE ∞**
