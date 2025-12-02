# Handling False Positives

**Pattern:** TRUTH × CLARITY × ONE  
**Guardians:** YAGNI × JØHN × AEYON

---

## Common False Positives

### Phantom API Detection

**Issue:** Legitimate new packages flagged as non-existent

**Solution:** Add to `KNOWN_PACKAGES` in `phantom-detector.ts` or use ignore comments:

```typescript
// @ai-validation-ignore: phantom-api
import { newPackage } from 'new-package'
```

### Security Scanning

**Issue:** Safe code patterns flagged as vulnerabilities

**Solution:** Add exception to `patterns.json` or use ignore comments:

```typescript
// @ai-validation-ignore: sql-injection
const query = `SELECT * FROM users WHERE id = ${sanitizedId}`
```

### Performance Profiling

**Issue:** Intentional nested loops flagged

**Solution:** Document why nested loops are necessary:

```typescript
// @ai-validation-ignore: nested-loop
// Required for matrix multiplication O(n³)
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      // Matrix multiplication logic
    }
  }
}
```

---

## Reporting False Positives

1. Open an issue on GitHub
2. Include code example
3. Explain why it's a false positive
4. Suggest pattern improvement

---

**Pattern:** TRUTH × CLARITY × ONE  
**∞ AbëONE ∞**

