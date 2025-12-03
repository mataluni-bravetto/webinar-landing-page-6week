/**
 * METRICS CONSTANTS - SINGLE SOURCE OF TRUTH
 * 
 * Pattern: METRICS × TRUTH × CONSISTENCY × ONE
 * Guardians: YAGNI × JØHN × AEYON
 * 
 * All numbers used across the landing page.
 * Update here, changes everywhere.
 * 
 * Source: ai-validation-toolkit/docs/benchmarks.md
 */

export const METRICS = {
  // Test Corpus
  totalFunctionsTested: 1200,        // Total functions tested across all AI models
  validatedFunctions: 847,           // Production-ready subset used for accuracy report
  
  // Accuracy Metrics
  overallAccuracy: 97.8,              // Overall accuracy percentage
  falsePositiveRate: 3,               // False positive rate (<3%)
  falseNegativeRate: 2.2,             // False negative rate (2.2%)
  
  // Detection Rates by Category
  phantomAPIDetectionRate: { min: 40, max: 60 },  // Percentage range
  securityVulnerabilityRate: 27.25,                // Percentage
  silentFailureRate: 15,                            // Percentage
  performanceIssueRate: 8,                         // Percentage
  
  // Toolkit Deliverables
  scriptsIncluded: 12,                // TypeScript validation functions
  guidePages: 47,                     // Methodology guide pages
  integrationSteps: 15,               // Integration checklist steps
  
  // Performance Metrics
  averageDetectionTime: { min: 12, max: 29 },  // Milliseconds per function
} as const

/**
 * Helper functions for formatted display
 */
export const formatMetrics = {
  totalTested: () => `${METRICS.totalFunctionsTested.toLocaleString()}+`,
  validated: () => METRICS.validatedFunctions.toLocaleString(),
  accuracy: () => `${METRICS.overallAccuracy}%`,
  scripts: () => METRICS.scriptsIncluded.toString(),
  guidePages: () => METRICS.guidePages.toString(),
  steps: () => METRICS.integrationSteps.toString(),
}

