# Prompt Reference Template

## Standard Copilot Request Format

Use this template for all Copilot interactions:

```
Context: [List relevant prompt files]
Scope: [What you're working on]
Question: [Specific question or request]

Example:
Context: prompt.md, promptFormhelper.md
Scope: Creating new form input component
Question: How should I structure the component to follow our patterns?
```

## Prompt File Quick Reference

### Core Prompts
- `prompt.md` - Project conventions, naming, global utilities
- `promptFormhelper.md` - Form component patterns, MUI 7 specifics
- `promptTesting.md` - Testing patterns, MSW setup, global test functions
- `promptMSW.md` - Mock service worker patterns, data loading

### When to Use Each Prompt

| Task Type | Required Prompts |
|-----------|------------------|
| New Components | prompt.md |
| Form Components | prompt.md, promptFormhelper.md |
| Testing | prompt.md, promptTesting.md |
| API/Mocking | prompt.md, promptMSW.md |
| Styling | prompt.md, promptSCSS.md |
| Refactoring | prompt.md + relevant specialized prompts |

## Validation Commands

Run these commands to verify prompt compliance:

```bash
# Check if prompt files exist
ls prompt*.md

# Verify prompt content is current
git log --oneline prompt*.md

# Check for prompt references in recent commits
git log --grep="Context:" --oneline
```

