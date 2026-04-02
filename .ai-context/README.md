# AI Context

This folder contains project context files that Copilot should consult at the start of new chat sessions.

## How to use

- Put durable rules and conventions in focused markdown files (for example: `coding-standards.md`, `testing.md`, `architecture.md`).
- Keep each file short, specific, and easy to scan.
- Prefer one topic per file.

## Suggested files

- `project-overview.md`
- `coding-standards.md`
- `testing-standards.md`
- `ui-patterns.md`
- `api-contracts.md`

## Current files

- `context-requirements.md` - references required `.copilot-rules` context prompts
- `project-guidelines.md` - points to `legacy/prompt.md` and pre-change checks
- `formhelper-patterns.md` - FormHelper/MUI 7 guidance entry point

## Notes

- Copilot auto-load behavior is driven by `.github/copilot-instructions.md` and repository rules.
- This README is a landing page for that context.
