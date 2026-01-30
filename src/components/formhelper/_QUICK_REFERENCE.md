# FormHelper Quick Reference

## Most Common Input Types

### Basic Inputs
```jsx
// Text field
<Input name="fieldName" label="Field Label" />

// Textarea
<Input name="fieldName" label="Field Label" textarea />

// Password
<Input name="fieldName" label="Field Label" password />

// Checkbox
<Input name="fieldName" label="Field Label" checkbox />
```

### Masked Inputs
```jsx
// SSN
<Input name="ssn" label="SSN" mask="ssn" />

// Phone
<Input name="phone" label="Phone" mask="phone" />

// Credit Card
<Input name="card" label="Card Number" mask="creditCard" />

// Date (MM/DD/YYYY)
<Input name="date" label="Date" mask="MM/DD/YYYY" />

// Date with range
<Input name="date" label="Date" mask="MM/DD/YYYY" min="2023-01-01" max="2024-12-31" />
```

### Select Inputs
```jsx
// Basic select
<Input name="select" label="Select" options={options} select />

// Autocomplete
<Input name="autocomplete" label="Autocomplete" options={options} />

// Multi-select
<Input name="multi" label="Multi Select" optionsMulti={options} />

// Radio buttons
<Input name="radio" label="Radio" optionsRadio={options} />
```

## Common Mask Patterns

### Predefined Patterns
- `ssn` → `###-##-####`
- `phone` → `(###) ###-####`
- `creditCard` → `#### #### #### ####`
- `zipCode` → `#####`
- `date` → `##/##/####`

### Date Patterns
- `MM/DD/YYYY` → `##/##/####`
- `YYYY-MM-DD` → `####-##-##`
- `DD/MM/YYYY` → `##/##/####`

### Custom Patterns
- `#` = digit only
- `A` = letter only
- `*` = any character
- Other characters = static separators

## Advanced Features

### Partial Masking
```jsx
// Show last 4 digits
<Input name="ssn" label="SSN" mask="ssn" showLast={4} />
```

### Persistent (Always Visible)
```jsx
// No masking
<Input name="ssn" label="SSN" mask="ssn" persistent />
```

### Grid Layout
```jsx
// 6 columns (half width)
<Input name="field" label="Field" size={6} />

// 12 columns (full width)
<Input name="field" label="Field" size={12} />
```

## Form Setup

### Basic Form
```jsx
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { Input } from '@/components/formhelper';

const MyForm = () => {
  const methods = useForm();
  
  return (
    <FormProvider {...methods}>
      <form>
        <Input name="field" label="Field" />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};
```

### Form with Default Values
```jsx
const methods = useForm({
  defaultValues: {
    firstName: '',
    ssn: '123456789',
    birthDate: '1990-01-01'
  }
});
```

## Common Props

### All Inputs
- `name` - Field name (required)
- `label` - Field label
- `info` - Help text
- `size` - Grid columns (1-12)
- `required` - Required field

### Masked Inputs
- `mask` - Mask pattern
- `showLast` - Show last N characters when masked
- `persistent` - Always show unmasked value

### Date Inputs
- `min` - Minimum date (YYYY-MM-DD)
- `max` - Maximum date (YYYY-MM-DD)

### Select Inputs
- `options` - Array of {value, text} objects
- `select` - Use dropdown instead of autocomplete
- `optionsMulti` - Multi-select
- `optionsRadio` - Radio buttons
- `allowFreeText` - Allow custom text input

## Tips

1. **Always use unique field names**
2. **Provide helpful info text**
3. **Use appropriate mask patterns**
4. **Test date ranges thoroughly**
5. **Consider partial masking for sensitive data** 