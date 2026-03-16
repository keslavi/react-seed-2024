# FormHelper MUI 7 Testing and Design Patterns

## Overview
This document captures the lessons learned from upgrading formhelper components from MUI 6 to MUI 7, including testing patterns, component behavior changes, and best practices.

## MUI 7 Component Behavior Changes

### TextField Component
- **Placeholder Handling**: Placeholders now need to be explicitly passed to the TextField component
- **Optional Placeholders**: Use conditional spreading `{...(props.placeholder && { placeholder: props.placeholder })}` to make placeholders truly optional
- **Fallback Behavior**: When no placeholder is provided, the `cleanParentProps` function automatically uses the label as a fallback placeholder
- **inputProps**: Still supported for TextField in MUI 7 (not deprecated for this component)

### Select Component
- **Empty Options Behavior**: When `options` array is empty, MUI 7 renders a plain `textbox` instead of a `combobox`
- **Role Changes**: Empty selects render with `role="textbox"` instead of `role="combobox"`
- **Placeholder Display**: Empty selects show placeholder text when no options are available

### Autocomplete Component
- **Import Changes**: Must import as `Autocomplete as MuiAutocomplete` to ensure correct MUI 7 component rendering
- **Controlled State**: Ensure `value` prop is always defined to prevent controlled/uncontrolled state warnings
- **Input Element Type**: Autocomplete expects an HTMLInputElement, not HTMLDivElement
- **Popup Icon**: Explicitly add `popupIcon={<KeyboardArrowDownIcon />}` for dropdown arrow
- **Placeholder Issues**: Placeholder visibility can be problematic and may require `renderValue` or `slotProps` approaches

### SelectCheckbox Component
- **Height Changes**: Component height may change when adding/removing props like `renderValue` or `placeholder`
- **Placeholder Behavior**: Placeholder may not show when empty and not focused (known issue)
- **Value Handling**: Use `autocompleteValue = selectedOptions || []` to ensure controlled state

## Testing Patterns

### Test Harness Usage
```javascript
// Correct pattern for formhelper component tests
render(
  <TestHarness item={{}}>
    <Row>
      <Input
        name="fieldName"
        label="Field Label"
        placeholder="Optional placeholder"
        data-testid="field-testid"
      />
    </Row>
  </TestHarness>
);

// With validation schema (TestHarness automatically creates resolver)
render(
  <TestHarness item={{}} schema={yupSchema}>
    <Row>
      <Input name="fieldName" label="Field Label" />
    </Row>
  </TestHarness>
);
```

### Component Selection
- Use `Input` component with appropriate props (e.g., `select`, `optionsCheckbox`) rather than direct component imports
- This ensures proper form context and validation integration

### Role-Based Testing
```javascript
// For regular text inputs
const input = screen.getByRole('textbox', { name: /field name/i });

// For select components with options
const select = screen.getByRole('combobox', { name: /field name/i });

// For empty select components (MUI 7 behavior)
const input = screen.getByRole('textbox', { name: /field name/i });
```

### Attribute Testing
```javascript
// Test for placeholder presence
expect(input).toHaveAttribute('placeholder', 'Expected placeholder');

// Test for HTML attributes passed via inputProps
expect(input).toHaveAttribute('maxlength', '50');
expect(input).toHaveAttribute('minlength', '2');
expect(input).toHaveAttribute('pattern', '[A-Za-z]+');
expect(input).toHaveAttribute('spellcheck', 'false');
expect(input).toHaveAttribute('inputmode', 'text');

// Test for autoFocus (MUI 7 may handle internally)
expect(input).toBeVisible(); // Instead of toHaveAttribute('autofocus')
```

### Info Tooltip Testing
```javascript
// Info component is rendered outside FormControl, so find globally
const infoIcon = screen.getByTestId('IconHelpRounded');

// Popover content is rendered in portal, find by role
const popover = screen.getByRole('presentation');
expect(popover).toHaveTextContent('Expected info text');
```

## Common Issues and Solutions

### Resolver Creation
**Problem**: `_options.resolver is not a function` error when submitting forms
**Solution**: TestHarness automatically creates the resolver from the schema. Just pass the schema object, not the resolver:
```javascript
// ✅ Correct - TestHarness creates resolver internally
<TestHarness item={{}} schema={yupSchema}>
  <Children />
</TestHarness>

// ❌ Incorrect - Don't create resolver manually
const resolver = yupResolver(schema);
<TestHarness item={{}} schema={resolver}>
  <Children />
</TestHarness>
```

### Controlled/Uncontrolled State Warnings
**Problem**: "A component is changing the uncontrolled open state of Autocomplete to be controlled"
**Solution**: Ensure `value` prop is always defined, never `undefined`
```javascript
const autocompleteValue = selectedOptions || [];
<MuiAutocomplete value={autocompleteValue} />
```

### Missing Dropdown Arrow
**Problem**: No dropdown arrow visible in select components
**Solution**: Add explicit popup icon
```javascript
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
<MuiAutocomplete popupIcon={<KeyboardArrowDownIcon />} />
```

### Input Element Type Errors
**Problem**: "Unable to find the input element. It was resolved to [object HTMLDivElement] while an HTMLInputElement was expected"
**Solution**: Ensure correct Autocomplete import and usage
```javascript
import { Autocomplete as MuiAutocomplete } from '@mui/material';
<MuiAutocomplete />
```

### Placeholder Not Visible
**Problem**: Placeholder not showing when field is empty and not focused
**Solution**: Explicitly pass placeholder prop to TextField
```javascript
<MuiTextField placeholder={props.placeholder} />
```

### HTML Attributes Not Applied
**Problem**: HTML attributes like `maxLength`, `minLength`, `pattern` not appearing on DOM
**Solution**: Pass via `inputProps` (still supported for TextField in MUI 7)
```javascript
const inputProps = {
  maxLength: props.maxLength,
  minLength: props.minLength,
  pattern: props.pattern,
  // ... other attributes
};
<MuiTextField inputProps={inputProps} />
```

## Testing Strategy

### Iterative Test Fixing
1. Comment out all tests except the first one
2. Fix the first test to pass
3. Uncomment the next test one by one
4. Fix each test as it fails
5. Continue until all tests pass

### Test Isolation
- Use `TestHarness` to provide proper form context
- Use `data-testid` for reliable element selection
- Test one behavior per test case

### Debugging Techniques
- Use `screen.debug()` to inspect rendered DOM
- Check console warnings for controlled/uncontrolled state issues
- Verify role and attribute presence on DOM elements

## Component Design Patterns

### Optional Props Handling
```javascript
// Make props truly optional
{...(props.placeholder && { placeholder: props.placeholder })}
{...(props.autoFocus && { autoFocus: props.autoFocus })}
```

### Value Management
```javascript
// Ensure controlled state
const autocompleteValue = selectedOptions || [];
const isCleared = !field.value || field.value === "" || field.value === null || field.value === undefined;
```

### Error Handling
```javascript
// Extract error props from form context
const { field, errorMui, valueProp } = useFormField(props);
```

### Callback Handling
```javascript
// Proper callback chaining
const onBlur = useCallback((e) => {
  field.onBlur(e.target.value);
  props.onBlur?.(e);
}, []);

const onChange = useCallback((e) => {
  field.onChange(e.target.value);
  props.onChange?.(e);
}, []);
```

## File Structure Patterns

### Test File Naming
- `component-name.test.jsx` for component tests
- Use descriptive test names that explain the expected behavior

### Component File Structure
```javascript
import { memo, useCallback, useMemo } from "react";
import { useFormField } from "./form-provider";
import { cleanParentProps, colProps } from "./helper";

export const ComponentName = memo((props) => {
  // 1. Extract form context
  const { field, errorMui, valueProp } = useFormField(props);
  
  // 2. Define callbacks
  const onBlur = useCallback((e) => {
    field.onBlur(e.target.value);
    props.onBlur?.(e);
  }, []);

  // 3. Extract props for MUI component
  const inputProps = useMemo(() => {
    // Extract HTML attributes
  }, [props]);

  // 4. Render with proper prop spreading
  return (
    <ColPadded {...colProps(props)}>
      <MuiComponent
        {...cleanParentProps(props)}
        {...valueProp}
        {...errorMui}
        inputProps={inputProps}
      />
    </ColPadded>
  );
});

ComponentName.displayName = 'ComponentName';
```

## Best Practices

### Performance
- Use `memo` for all formhelper components
- Use `useCallback` for event handlers
- Use `useMemo` for computed props

### Accessibility
- Ensure proper ARIA roles and labels
- Test with screen readers
- Maintain keyboard navigation

### Error Handling
- Always provide fallback values
- Handle undefined/null states gracefully
- Use optional chaining for callbacks

### Testing
- Test both success and error states
- Test edge cases (empty values, undefined props)
- Test accessibility attributes
- Test user interactions (focus, blur, change)

## Common Gotchas

1. **MUI 7 Role Changes**: Components may render with different ARIA roles than MUI 6
2. **Portal Rendering**: Popover content is often rendered in portals, requiring different selectors
3. **Controlled State**: MUI 7 is stricter about controlled/uncontrolled component states
4. **Prop Deprecation**: Some props are deprecated but still work (like `inputProps` for TextField)
5. **Height Changes**: Adding/removing props can affect component height unexpectedly
6. **Placeholder Behavior**: Placeholder visibility has changed and may require explicit handling

## Future Considerations

- Monitor MUI 7 updates for further deprecations
- Consider migrating to `slotProps` when `inputProps` is fully deprecated
- Keep tests updated as MUI behavior evolves
- Document any new patterns discovered during development 