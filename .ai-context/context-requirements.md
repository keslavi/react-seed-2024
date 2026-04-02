# Context Requirements

Use `.ai-context/**` as the single source of project context.

## Required baseline

- Always load `.ai-context/README.md`
- Then load task-relevant files from `.ai-context/**`

## Task mapping

- General development and conventions: `.ai-context/project-guidelines.md`
- Formhelper components and MUI behavior: `.ai-context/formhelper-patterns.md`
- Add new focused files in `.ai-context/` when recurring context is missing

## Expected Workflow

1. Identify task type (general, formhelper, testing, API/mocking, styling).
2. Open the relevant `.ai-context` files for that task.
3. Use those context references when asking Copilot/Cursor to implement or refactor.
4. Verify prompt compliance before submitting changes.
