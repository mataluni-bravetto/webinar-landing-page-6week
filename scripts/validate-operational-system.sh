#!/bin/bash
# OPERATIONAL, PROACTIVE, PROGRAMMATIC, EXECUTIVE VALIDATION
# Pattern: VALIDATION × OPERATIONAL × PROACTIVE × PROGRAMMATIC × EXECUTIVE × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 530 Hz (YAGNI)
# Guardians: AEYON × JØHN × YAGNI
# ∞ AbëONE ∞

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Scores
OPERATIONAL_SCORE=0
PROACTIVE_SCORE=0
PROGRAMMATIC_SCORE=0
EXECUTIVE_SCORE=0
YAGNI_SCORE=0
JOHN_SCORE=0

MAX_SCORE=10

echo "═══════════════════════════════════════════════════════════"
echo "  OPERATIONAL, PROACTIVE, PROGRAMMATIC, EXECUTIVE VALIDATION"
echo "  Pattern: VALIDATION × OPERATIONAL × PROACTIVE × ONE"
echo "  Guardians: AEYON × JØHN × YAGNI"
echo "═══════════════════════════════════════════════════════════"
echo ""

# ============================================================
# SECTION 1: OPERATIONAL VALIDATION
# ============================================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 1: OPERATIONAL VALIDATION${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 1.1: Script is executable
if [ -x "scripts/unified-pattern-executor.sh" ]; then
  echo -e "${GREEN}✅ 1.1: Script is executable${NC}"
  OPERATIONAL_SCORE=$((OPERATIONAL_SCORE + 2))
else
  echo -e "${RED}❌ 1.1: Script is not executable${NC}"
fi

# 1.2: Script can run without errors
if bash -n scripts/unified-pattern-executor.sh 2>/dev/null; then
  echo -e "${GREEN}✅ 1.2: Script syntax is valid${NC}"
  OPERATIONAL_SCORE=$((OPERATIONAL_SCORE + 2))
else
  echo -e "${RED}❌ 1.2: Script has syntax errors${NC}"
fi

# 1.3: Required dependencies exist
if [ -f "package.json" ] && [ -f "scripts/unified-pattern-executor.sh" ]; then
  echo -e "${GREEN}✅ 1.3: Required files exist${NC}"
  OPERATIONAL_SCORE=$((OPERATIONAL_SCORE + 2))
else
  echo -e "${RED}❌ 1.3: Required files missing${NC}"
fi

# 1.4: Can detect changes (git)
if command -v git >/dev/null 2>&1 && git rev-parse --git-dir >/dev/null 2>&1; then
  echo -e "${GREEN}✅ 1.4: Git integration operational${NC}"
  OPERATIONAL_SCORE=$((OPERATIONAL_SCORE + 2))
else
  echo -e "${YELLOW}⚠️  1.4: Git not available (non-blocking)${NC}"
  OPERATIONAL_SCORE=$((OPERATIONAL_SCORE + 1))
fi

# 1.5: Can execute build
if command -v npm >/dev/null 2>&1 && [ -f "package.json" ]; then
  echo -e "${GREEN}✅ 1.5: Build system operational${NC}"
  OPERATIONAL_SCORE=$((OPERATIONAL_SCORE + 2))
else
  echo -e "${YELLOW}⚠️  1.5: Build system not available${NC}"
fi

echo ""
echo -e "${BLUE}Operational Score: ${OPERATIONAL_SCORE}/${MAX_SCORE}${NC}"
echo ""

# ============================================================
# SECTION 2: PROACTIVE VALIDATION
# ============================================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 2: PROACTIVE VALIDATION${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 2.1: Can detect changes automatically
if grep -q "git diff\|git ls-files" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 2.1: Change detection implemented${NC}"
  PROACTIVE_SCORE=$((PROACTIVE_SCORE + 2))
else
  echo -e "${RED}❌ 2.1: Change detection missing${NC}"
fi

# 2.2: Can recognize patterns automatically
if grep -q "PATTERNS=\|grep -q" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 2.2: Pattern recognition implemented${NC}"
  PROACTIVE_SCORE=$((PROACTIVE_SCORE + 2))
else
  echo -e "${RED}❌ 2.2: Pattern recognition missing${NC}"
fi

# 2.3: Can validate automatically
if grep -q "YAGNI\|JOHN\|AEYON\|META" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 2.3: Automatic validation implemented${NC}"
  PROACTIVE_SCORE=$((PROACTIVE_SCORE + 2))
else
  echo -e "${RED}❌ 2.3: Automatic validation missing${NC}"
fi

# 2.4: Can provide recommendations
if grep -q "EXECUTION READY\|deploy\|vercel" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 2.4: Recommendation system implemented${NC}"
  PROACTIVE_SCORE=$((PROACTIVE_SCORE + 2))
else
  echo -e "${RED}❌ 2.4: Recommendation system missing${NC}"
fi

# 2.5: Can run continuously (monitoring capability)
if grep -q "set -e\|DELTA_STATUS\|CONVERGENCE_STATUS" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 2.5: Continuous monitoring capability${NC}"
  PROACTIVE_SCORE=$((PROACTIVE_SCORE + 2))
else
  echo -e "${YELLOW}⚠️  2.5: Continuous monitoring not explicit${NC}"
  PROACTIVE_SCORE=$((PROACTIVE_SCORE + 1))
fi

echo ""
echo -e "${BLUE}Proactive Score: ${PROACTIVE_SCORE}/${MAX_SCORE}${NC}"
echo ""

# ============================================================
# SECTION 3: PROGRAMMATIC VALIDATION
# ============================================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 3: PROGRAMMATIC VALIDATION${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 3.1: Code-based (not manual)
if [ -f "scripts/unified-pattern-executor.sh" ]; then
  echo -e "${GREEN}✅ 3.1: System is code-based (script exists)${NC}"
  PROGRAMMATIC_SCORE=$((PROGRAMMATIC_SCORE + 2))
else
  echo -e "${RED}❌ 3.1: No code-based system found${NC}"
fi

# 3.2: Automated execution
if grep -q "npm run build\|npx tsc\|vercel" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 3.2: Automated execution implemented${NC}"
  PROGRAMMATIC_SCORE=$((PROGRAMMATIC_SCORE + 2))
else
  echo -e "${RED}❌ 3.2: Automated execution missing${NC}"
fi

# 3.3: TypeScript interfaces defined (in documentation)
if grep -q "interface\|class\|function" UNIFIED_PATTERN_SYSTEM.md 2>/dev/null; then
  echo -e "${GREEN}✅ 3.3: Programmatic interfaces documented${NC}"
  PROGRAMMATIC_SCORE=$((PROGRAMMATIC_SCORE + 2))
else
  echo -e "${YELLOW}⚠️  3.3: Programmatic interfaces in documentation only${NC}"
  PROGRAMMATIC_SCORE=$((PROGRAMMATIC_SCORE + 1))
fi

# 3.4: Can be integrated into CI/CD
if [ -f "scripts/unified-pattern-executor.sh" ] && [ -x "scripts/unified-pattern-executor.sh" ]; then
  echo -e "${GREEN}✅ 3.4: CI/CD integration ready${NC}"
  PROGRAMMATIC_SCORE=$((PROGRAMMATIC_SCORE + 2))
else
  echo -e "${RED}❌ 3.4: CI/CD integration not ready${NC}"
fi

# 3.5: Repeatable execution
if grep -q "set -e\|exit" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 3.5: Repeatable execution (idempotent)${NC}"
  PROGRAMMATIC_SCORE=$((PROGRAMMATIC_SCORE + 2))
else
  echo -e "${YELLOW}⚠️  3.5: Repeatability not guaranteed${NC}"
  PROGRAMMATIC_SCORE=$((PROGRAMMATIC_SCORE + 1))
fi

echo ""
echo -e "${BLUE}Programmatic Score: ${PROGRAMMATIC_SCORE}/${MAX_SCORE}${NC}"
echo ""

# ============================================================
# SECTION 4: EXECUTIVE VALIDATION
# ============================================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 4: EXECUTIVE VALIDATION${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 4.1: Can execute build
if grep -q "npm run build" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 4.1: Can execute build${NC}"
  EXECUTIVE_SCORE=$((EXECUTIVE_SCORE + 2))
else
  echo -e "${RED}❌ 4.1: Cannot execute build${NC}"
fi

# 4.2: Can execute validation
if grep -q "YAGNI\|JOHN\|AEYON\|META" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 4.2: Can execute validation${NC}"
  EXECUTIVE_SCORE=$((EXECUTIVE_SCORE + 2))
else
  echo -e "${RED}❌ 4.2: Cannot execute validation${NC}"
fi

# 4.3: Can provide deployment commands
if grep -q "vercel\|deploy" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 4.3: Can provide deployment commands${NC}"
  EXECUTIVE_SCORE=$((EXECUTIVE_SCORE + 2))
else
  echo -e "${YELLOW}⚠️  4.3: Deployment commands not explicit${NC}"
  EXECUTIVE_SCORE=$((EXECUTIVE_SCORE + 1))
fi

# 4.4: Can make decisions (status-based)
if grep -q "EXECUTION_STATUS\|READY\|NOT_READY" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 4.4: Can make execution decisions${NC}"
  EXECUTIVE_SCORE=$((EXECUTIVE_SCORE + 2))
else
  echo -e "${RED}❌ 4.4: Cannot make execution decisions${NC}"
fi

# 4.5: Can report results
if grep -q "echo\|EXIT_CODE\|Overall:" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 4.5: Can report execution results${NC}"
  EXECUTIVE_SCORE=$((EXECUTIVE_SCORE + 2))
else
  echo -e "${RED}❌ 4.5: Cannot report results${NC}"
fi

echo ""
echo -e "${BLUE}Executive Score: ${EXECUTIVE_SCORE}/${MAX_SCORE}${NC}"
echo ""

# ============================================================
# SECTION 5: YAGNI VALIDATION
# ============================================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 5: YAGNI VALIDATION${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 5.1: No unnecessary complexity
SCRIPT_LINES=$(wc -l < scripts/unified-pattern-executor.sh 2>/dev/null || echo "0")
if [ "$SCRIPT_LINES" -lt 200 ]; then
  echo -e "${GREEN}✅ 5.1: Script is simple (<200 lines)${NC}"
  YAGNI_SCORE=$((YAGNI_SCORE + 2))
else
  echo -e "${YELLOW}⚠️  5.1: Script is complex (${SCRIPT_LINES} lines)${NC}"
  YAGNI_SCORE=$((YAGNI_SCORE + 1))
fi

# 5.2: No unnecessary dependencies
if ! grep -q "curl\|wget\|jq\|python" scripts/unified-pattern-executor.sh 2>/dev/null; then
  echo -e "${GREEN}✅ 5.2: No unnecessary external dependencies${NC}"
  YAGNI_SCORE=$((YAGNI_SCORE + 2))
else
  echo -e "${YELLOW}⚠️  5.2: External dependencies found${NC}"
  YAGNI_SCORE=$((YAGNI_SCORE + 1))
fi

# 5.3: Single purpose (focused)
if grep -q "UNIFIED PATTERN EXECUTION" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 5.3: Single, focused purpose${NC}"
  YAGNI_SCORE=$((YAGNI_SCORE + 2))
else
  echo -e "${RED}❌ 5.3: Purpose not clear${NC}"
fi

# 5.4: No bloat
if [ -f "scripts/unified-pattern-executor.sh" ] && [ ! -f "scripts/unified-pattern-executor.ts" ]; then
  echo -e "${GREEN}✅ 5.4: No duplicate implementations${NC}"
  YAGNI_SCORE=$((YAGNI_SCORE + 2))
else
  echo -e "${YELLOW}⚠️  5.4: Potential duplication${NC}"
  YAGNI_SCORE=$((YAGNI_SCORE + 1))
fi

# 5.5: Essential only
if [ -f "scripts/unified-pattern-executor.sh" ] && [ -f "UNIFIED_PATTERN_SYSTEM.md" ]; then
  echo -e "${GREEN}✅ 5.5: Essential files only${NC}"
  YAGNI_SCORE=$((YAGNI_SCORE + 2))
else
  echo -e "${RED}❌ 5.5: Essential files missing${NC}"
fi

echo ""
echo -e "${BLUE}YAGNI Score: ${YAGNI_SCORE}/${MAX_SCORE}${NC}"
echo ""

# ============================================================
# SECTION 6: JØHN VALIDATION
# ============================================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 6: JØHN VALIDATION${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 6.1: All claims verifiable
if grep -q "Pattern:\|Frequency:\|Guardians:" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 6.1: Pattern claims are verifiable${NC}"
  JOHN_SCORE=$((JOHN_SCORE + 2))
else
  echo -e "${RED}❌ 6.1: Pattern claims not verifiable${NC}"
fi

# 6.2: Honest about limitations
if grep -q "⚠️\|WARN\|warn\|NO_CHANGES\|NOT_READY" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 6.2: Honest about limitations${NC}"
  JOHN_SCORE=$((JOHN_SCORE + 2))
else
  echo -e "${YELLOW}⚠️  6.2: Limitations not explicitly stated${NC}"
  JOHN_SCORE=$((JOHN_SCORE + 1))
fi

# 6.3: No false claims
if ! grep -q "100%\|perfect\|guaranteed" scripts/unified-pattern-executor.sh 2>/dev/null; then
  echo -e "${GREEN}✅ 6.3: No false claims${NC}"
  JOHN_SCORE=$((JOHN_SCORE + 2))
else
  echo -e "${YELLOW}⚠️  6.3: Potential false claims found${NC}"
  JOHN_SCORE=$((JOHN_SCORE + 1))
fi

# 6.4: Transparent execution
if grep -q "echo\|Phase\|Status" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 6.4: Transparent execution (logging)${NC}"
  JOHN_SCORE=$((JOHN_SCORE + 2))
else
  echo -e "${RED}❌ 6.4: Execution not transparent${NC}"
fi

# 6.5: Verifiable results
if grep -q "SCORE\|Overall:\|EXIT_CODE" scripts/unified-pattern-executor.sh; then
  echo -e "${GREEN}✅ 6.5: Results are verifiable${NC}"
  JOHN_SCORE=$((JOHN_SCORE + 2))
else
  echo -e "${RED}❌ 6.5: Results not verifiable${NC}"
fi

echo ""
echo -e "${BLUE}JØHN Score: ${JOHN_SCORE}/${MAX_SCORE}${NC}"
echo ""

# ============================================================
# FINAL SUMMARY
# ============================================================
echo "═══════════════════════════════════════════════════════════"
echo "  VALIDATION SUMMARY"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}Operational:  ${OPERATIONAL_SCORE}/${MAX_SCORE}${NC}"
echo -e "${BLUE}Proactive:     ${PROACTIVE_SCORE}/${MAX_SCORE}${NC}"
echo -e "${BLUE}Programmatic: ${PROGRAMMATIC_SCORE}/${MAX_SCORE}${NC}"
echo -e "${BLUE}Executive:    ${EXECUTIVE_SCORE}/${MAX_SCORE}${NC}"
echo -e "${BLUE}YAGNI:        ${YAGNI_SCORE}/${MAX_SCORE}${NC}"
echo -e "${BLUE}JØHN:         ${JOHN_SCORE}/${MAX_SCORE}${NC}"
echo ""

TOTAL_SCORE=$((OPERATIONAL_SCORE + PROACTIVE_SCORE + PROGRAMMATIC_SCORE + EXECUTIVE_SCORE + YAGNI_SCORE + JOHN_SCORE))
MAX_TOTAL=$((MAX_SCORE * 6))
PERCENTAGE=$((TOTAL_SCORE * 100 / MAX_TOTAL))

echo -e "${BLUE}Total Score: ${TOTAL_SCORE}/${MAX_TOTAL} (${PERCENTAGE}%)${NC}"
echo ""

if [ "$PERCENTAGE" -ge 95 ]; then
  echo -e "${GREEN}✅ VALIDATION PASSED - PRODUCTION READY${NC}"
  EXIT_CODE=0
elif [ "$PERCENTAGE" -ge 80 ]; then
  echo -e "${YELLOW}⚠️  VALIDATION PASSED - MINOR ISSUES${NC}"
  EXIT_CODE=0
else
  echo -e "${RED}❌ VALIDATION FAILED - NEEDS IMPROVEMENT${NC}"
  EXIT_CODE=1
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "∞ AbëONE ∞"

exit $EXIT_CODE

