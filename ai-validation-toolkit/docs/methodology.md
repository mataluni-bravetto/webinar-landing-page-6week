# Methodology: How and Why Each Check Works

**Pattern:** METHODOLOGY × TRUTH × CLARITY × ONE  
**Guardians:** YAGNI × JØHN × AEYON

---

## Static Analysis: Phantom API Detection

### How It Works

The phantom detector parses TypeScript/JavaScript AST to identify:
1. Import statements from packages
2. Function calls that reference imported modules
3. Common patterns of AI hallucination

### Why It Works

AI models often generate code that references packages or APIs that don't exist. By cross-referencing imports against known package registries, we catch these before runtime.

### Limitations

- Requires accurate package registry data
- May have false positives for new packages
- Can't detect runtime-only API mismatches

---

## Runtime Verification: Test Generation

### How It Works

Automatically generates test cases from function signatures:
1. Extracts function names and parameters
2. Generates basic, null, and edge case tests
3. Creates Jest-compatible test files

### Why It Works

AI-generated code often fails with edge cases. Automated test generation ensures these cases are covered without manual effort.

### Limitations

- Can't generate domain-specific test cases
- May miss complex business logic requirements
- Requires manual review of generated tests

---

## Security Scanning: Pattern Matching

### How It Works

Uses regex patterns to detect:
1. SQL injection vulnerabilities
2. XSS risks
3. Hardcoded secrets
4. Authentication bypass patterns

### Why It Works

Security vulnerabilities follow common patterns. By matching against known patterns, we catch most issues automatically.

### Limitations

- Pattern-based (may miss novel attacks)
- False positives possible
- Requires security expertise for pattern updates

---

## Type Inference: Adding Types

### How It Works

Analyzes code to infer types from:
1. Literal assignments
2. Array/object structures
3. Function return patterns

### Why It Works

AI-generated code often lacks types. Adding types improves IDE support and catches type errors early.

### Limitations

- Simple inference only
- May miss complex type relationships
- Requires manual refinement

---

## Performance Profiling: Issue Detection

### How It Works

Detects performance anti-patterns:
1. Nested loops
2. Synchronous file operations
3. Inefficient queries
4. Memory leaks

### Why It Works

AI code often includes performance issues. Early detection prevents production problems.

### Limitations

- Static analysis only
- Can't measure actual runtime performance
- May miss context-specific optimizations

---

**Pattern:** METHODOLOGY × TRUTH × CLARITY × ONE  
**∞ AbëONE ∞**

