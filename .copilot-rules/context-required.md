# Copilot Context Requirements

## Mandatory Context Prompts

Before asking Copilot for assistance with any code, you MUST reference the appropriate context prompts:

### General Development
- **Always reference**: `prompt.md` for project conventions
- **Required for**: All code changes, new features, refactoring

### Specialized Contexts
- **Form Components**: Reference `promptFormhelper.md` for Input, Select, Autocomplete patterns
- **Testing**: Reference `promptTesting.md` for test patterns and MSW setup
- **API/Mocking**: Reference `promptMSW.md` for mock service worker patterns
- **Styling**: Reference `promptSCSS.md` for styling conventions

## Required Prompt Reference Format

When asking Copilot questions, use this format:

```
Context: [Reference specific prompt files]
Question: [Your specific question]

Example:
Context: prompt.md, promptFormhelper.md
Question: How should I implement a new form input component?
```

## Validation Checklist

Before submitting code, verify:
- [ ] Appropriate prompt files were referenced
- [ ] Code follows prompt-specified patterns
- [ ] Naming conventions match prompt requirements
- [ ] Testing patterns align with prompt guidelines
- [ ] Global utilities are used as specified in prompts

## Consequences of Non-Compliance

- Code reviews will reject changes without proper prompt context
- Automated checks will flag missing prompt references
- Team leads will require prompt compliance before merge approval

