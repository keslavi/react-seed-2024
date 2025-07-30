# Critical Analysis and Improvement Prompt

## Core Principles

When reviewing or implementing code, always:

1. **Think Critically**: Question assumptions, identify potential issues, and consider edge cases
2. **Suggest Alternatives**: Propose better approaches, even if the current solution works
3. **Consider Side Effects**: Always notify about changes that could impact other parts of the system
4. **Follow Project Patterns**: Use existing conventions and established patterns

## Project-Specific Guidelines
- powershell is the terminal being used by the cursor IDE. 

### Naming Conventions
- **Preferred**: `noun + modifier` format (e.g., `taskCreate`, `taskUpdate`, `userLogin`)
- **Avoid**: `verb + noun` format (e.g., `createTask`, `updateUser`)

### Global Extensions
- `isEmpty`, `isTruthy`, `isFalsy` are available as global functions
- Use these instead of creating new utility functions

### Testing Setup
- Vitest is configured with global functions of most common testing items: `screen`, `render`, `userEvent`, etc.
- Use these directly without importing
- if you feel the need to add an import for testing, verify it with me.
- use test:commit instead of test; it runs once and stops. 

### Component Patterns
- Follow the `task*` slices and components as the guiding pattern
- Maintain consistency with existing component structure

## Critical Analysis Framework

### Before Implementing:
1. **Scope Assessment**: Is this within the requested scope?
2. **Pattern Consistency**: Does this follow established project patterns?
3. **Side Effect Analysis**: What could this change impact?
4. **Alternative Evaluation**: Are there better approaches?

### During Implementation:
1. **Code Quality**: Is this the most maintainable solution?
2. **Performance**: Are there performance implications?
3. **Security**: Are there security considerations?
4. **Accessibility**: Is this accessible to all users?

### After Implementation:
1. **Testing**: Are all scenarios covered?
2. **Documentation**: Is the code self-documenting?
3. **Review**: Would another developer understand this easily?

## Response Guidelines

### Always Include:
- **Critical Analysis**: What works well and what could be improved
- **Alternative Suggestions**: Better approaches or optimizations
- **Side Effect Warnings**: Clear notification of potential impacts
- **Scope Boundaries**: What's included and what's not

### When Suggesting Changes:
- Explain the rationale behind suggestions
- Highlight benefits and trade-offs
- Provide specific examples when possible
- Consider the learning curve for the team

### When Implementing:
- Follow the `task*` pattern for consistency
- Use global extensions when available
- Maintain the established project structure
- Add appropriate tests using global testing functions

## Quality Checklist

- [ ] Follows `noun + modifier` naming convention
- [ ] Uses global extensions (`isEmpty`, `isTruthy`, `isFalsy`)
- [ ] Leverages global testing functions (`screen`, `render`, `userEvent`)
- [ ] Consistent with `task*` component patterns
- [ ] No unnecessary side effects
- [ ] Clear documentation and comments
- [ ] Appropriate error handling
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met

## Communication Style

- **Direct and Honest**: Point out issues clearly but constructively
- **Educational**: Explain why certain approaches are better
- **Collaborative**: Invite discussion and alternative viewpoints
- **Thorough**: Consider multiple angles and scenarios
- **Practical**: Focus on actionable improvements

Remember: The goal is to build better software through thoughtful analysis and continuous improvement, while maintaining the established patterns and conventions of this project.
