# Copilot Instructions

On every new Copilot chat session in this repository:

1. Treat `.ai-context/README.md` as required baseline context.
2. Load and follow any relevant files under `.ai-context/**` before proposing code changes.
3. If a request conflicts with `.ai-context/**`, prioritize `.ai-context/**` unless the user explicitly overrides it.
4. Keep responses and generated code aligned with existing project conventions.

When context is missing, ask for exactly what is needed and suggest adding it under `.ai-context/` for future sessions.
