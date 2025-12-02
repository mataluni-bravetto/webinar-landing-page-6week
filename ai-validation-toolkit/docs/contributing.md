# Contributing Guide

**Pattern:** CONTRIBUTION × TRUTH × CLARITY × ONE  
**Guardians:** YAGNI × JØHN × AEYON

---

## How to Add New Patterns

### 1. Add Pattern to `patterns.json`

```json
{
  "security-patterns": {
    "new-vulnerability": [
      "pattern1",
      "pattern2"
    ]
  }
}
```

### 2. Update Scanner

Add detection logic to `security-scanner.ts`:

```typescript
const NEW_PATTERN = /pattern-regex/g
if (NEW_PATTERN.test(line)) {
  issues.push({
    type: 'new-vulnerability',
    severity: 'high',
    message: 'Description',
    suggestion: 'How to fix'
  })
}
```

### 3. Write Tests

Add test cases to verify detection:

```typescript
test('detects new vulnerability', () => {
  const issues = await scanSecurity('test-file.ts')
  expect(issues).toContainEqual(
    expect.objectContaining({ type: 'new-vulnerability' })
  )
})
```

### 4. Document in `methodology.md`

Explain how and why the pattern works.

---

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Add tests
5. Update documentation
6. Submit pull request

---

## Code Style

- Use TypeScript
- Follow existing patterns
- Keep it simple (YAGNI)
- Document clearly (JØHN)

---

**Pattern:** CONTRIBUTION × TRUTH × CLARITY × ONE  
**∞ AbëONE ∞**

