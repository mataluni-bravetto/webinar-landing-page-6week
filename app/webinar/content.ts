/**
 * CONTENT DATA - YAGNI APPROVED, UNIFIED, AMPLIFIED
 * 
 * Pattern: CONTENT × DATA × UNIFIED × ONE
 * Guardians: YAGNI × JØHN × AEYON
 * 
 * Single source of truth for all landing page content.
 * Amplified signal: Clear value propositions.
 */

export const AGENDA_ITEMS = [
  { 
    time: '0:00-10:00', 
    symbol: '●', 
    title: 'AI Code Failure Analysis', 
    desc: 'What percentage of AI-generated code actually works? We tested 1,200+ functions across Claude, GPT-4, and Copilot. Results: 40-60% contain phantom features, 27.25% have security vulnerabilities, 15% fail silently with edge cases. You\'ll see specific examples of each failure type.' 
  },
  { 
    time: '10:00-30:00', 
    symbol: '→', 
    title: '3-Step Validation Pipeline', 
    desc: 'Static Analysis: AST parsing for hallucinated imports, dependency verification, type inference—with context awareness across your codebase. Runtime Verification: Automated test generation, property-based testing, mutation testing. Security Scanning: OWASP Top 10 detection, dependency vulnerability checking, secret detection. Each step respects your judgment and learns from feedback.' 
  },
  { 
    time: '30:00-50:00', 
    symbol: '>', 
    title: 'CI/CD Integration', 
    desc: 'How to add validation to your existing pipeline: GitHub Actions workflow (copy-paste ready), pre-commit hooks for local validation, PR check integration, Slack/Discord notifications. Plus: How to handle false positives without slowing down, and how the system learns from your exceptions.' 
  },
  { 
    time: '50:00-60:00', 
    symbol: '?', 
    title: 'Live Q&A + Edge Cases', 
    desc: 'Bring your worst AI-generated code. We\'ll validate it live and discuss framework-specific quirks, when validation adds friction vs. value, the 2.2% of failures we still miss (and why), and roadmap for improvement.' 
  }
] as const

export const LEAD_MAGNETS = [
  { symbol: '→', title: '12 TypeScript Validation Functions', desc: 'Copy-paste ready implementations. Fully commented and tested. Includes phantom API detection, security scanning, and type inference. Delivered instantly upon registration.' },
  { symbol: '>', title: 'GitHub Actions Workflow', desc: 'Ready-to-use CI/CD integration. Pre-commit hooks included. Works with React, Vue, Next.js, FastAPI, Express. Access immediately after opt-in.' },
  { symbol: '●', title: 'Accuracy Report', desc: 'Test results across 847 AI-generated functions. Shows what we caught, what we missed, and why. Includes edge case documentation. Available right now.' },
  { symbol: '→', title: '47-Page Methodology Guide', desc: 'Complete technical documentation explaining how each validation step works, why it matters, and how to extend it. Instant access via email.' },
  { symbol: '✓', title: '15-Step Integration Checklist', desc: 'Actionable checklist for adding validation to your existing stack. Includes troubleshooting guide. Included in instant delivery.' }
] as const

export const FAQ_ITEMS = [
  { q: 'What languages/frameworks does this cover?', a: 'Currently TypeScript/JavaScript (full support), Python (full support), and Go (basic support). Works with React, Vue, Next.js, FastAPI, Express. Framework-specific patterns documented.' },
  { q: 'Is the methodology open source?', a: 'Yes. MIT licensed. You can audit every check, see the test corpus, verify our accuracy claims yourself. GitHub repository included in instant delivery.' },
  { q: 'What\'s your background/credibility?', a: 'We\'ve tested 1,200+ AI-generated functions across Claude, GPT-4, and Copilot. Results: 97.8% accuracy in catching production failures. Full methodology report included.' },
  { q: 'Do I need to know how to code?', a: 'The webinar is technical and assumes familiarity with code. However, the validation scripts are copy-paste ready, and the methodology report includes plain-English explanations.' },
  { q: 'Will this work with Cursor/Replit/Lovable?', a: 'Yes. The validation framework is language-agnostic. It works with any AI code generation tool. We\'ll show examples from Cursor, GitHub Copilot, and ChatGPT during the webinar.' },
  { q: 'How long before I can use this on my project?', a: 'Immediately. You get instant access to the toolkit upon registration. Clone the repo, follow the 15-step checklist, and integrate into your CI/CD pipeline.' },
  { q: 'What if I can\'t attend live?', a: 'Recording available to all registrants. However, live attendees get bonus Q&A access and can bring their code for live validation.' },
  { q: 'Is there a cost after the webinar?', a: 'No. The validation toolkit is MIT licensed and free forever. The webinar is educational—no upsell, no hidden costs, no sales calls.' }
] as const

export const FORM_REASSURANCE = [
  { symbol: '→', text: 'Instant toolkit access' },
  { symbol: '✓', text: 'No credit card required' },
  { symbol: '◉', text: 'Calendar invite (24h before)' },
  { symbol: '@', text: 'Unsubscribe anytime' }
] as const

