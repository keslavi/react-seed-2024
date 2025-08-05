# FormHelper Usage Examples

This document provides comprehensive usage examples for all FormHelper components.

## Table of Contents

1. [Basic Input Components](#basic-input-components)
2. [Text Input with Masking](#text-input-with-masking)
3. [Date Input Components](#date-input-components)
4. [Select Components](#select-components)
5. [Checkbox and Radio Components](#checkbox-and-radio-components)
6. [Advanced Features](#advanced-features)

## Basic Input Components

### Text Field
```jsx
import { Input } from '@/components/formhelper';

// Basic text input
<Input
  name="firstName"
  label="First Name"
  info="Enter your first name"
/>

// With validation
<Input
  name="email"
  label="Email Address"
  info="Enter a valid email address"
  required
/>

// With size (grid columns)
<Input
  name="phone"
  label="Phone Number"
  size={6}
/>
```

### Textarea
```jsx
// Basic textarea
<Input
  name="description"
  label="Description"
  textarea
  info="Enter a detailed description"
/>

// With rows
<Input
  name="comments"
  label="Comments"
  textarea
  rows={4}
/>
```

### Password Field
```jsx
// Basic password field
<Input
  name="password"
  label="Password"
  password
  info="Enter your password"
/>
```

## Text Input with Masking

### Social Security Number
```jsx
// Using predefined mask
<Input
  name="ssn"
  label="Social Security Number"
  mask="ssn"
  info="Format: XXX-XX-XXXX"
/>

// Using custom mask pattern
<Input
  name="ssn"
  label="SSN"
  mask="###-##-####"
/>
```

### Phone Numbers
```jsx
// US Phone number
<Input
  name="phone"
  label="Phone Number"
  mask="phone"
  info="Format: (XXX) XXX-XXXX"
/>

// Phone with extension
<Input
  name="phoneExt"
  label="Phone with Extension"
  mask="phoneExt"
  info="Format: (XXX) XXX-XXXX xXXXX"
/>

// Custom phone format
<Input
  name="internationalPhone"
  label="International Phone"
  mask="+## ### ### ####"
/>
```

### Credit Card Information
```jsx
// Credit card number
<Input
  name="creditCard"
  label="Credit Card Number"
  mask="creditCard"
  info="Format: XXXX XXXX XXXX XXXX"
/>

// Credit card expiry
<Input
  name="expiry"
  label="Expiry Date"
  mask="creditCardExpiry"
  info="Format: MM/YY"
/>
```

### Address Information
```jsx
// ZIP Code
<Input
  name="zipCode"
  label="ZIP Code"
  mask="zipCode"
  info="Format: XXXXX"
/>

// ZIP Code with extension
<Input
  name="zipCodeExt"
  label="ZIP Code +4"
  mask="zipCodePlus4"
  info="Format: XXXXX-XXXX"
/>
```

### Currency and Percentages
```jsx
// Currency
<Input
  name="amount"
  label="Amount"
  mask="currency"
  info="Format: $X,XXX.XX"
/>

// Percentage
<Input
  name="discount"
  label="Discount"
  mask="percentage"
  info="Format: XX%"
/>
```

### License Plate
```jsx
<Input
  name="licensePlate"
  label="License Plate"
  mask="licensePlate"
  info="Format: AAA-####"
/>
```

## Date Input Components

### Datepicker (HTML5 Date Input)
```jsx
// Basic date input
<Input
  name="birthDate"
  label="Birth Date"
  datepicker
  info="Select your birth date"
/>

// With min/max date constraints
<Input
  name="eventDate"
  label="Event Date"
  datepicker
  min="2024-01-01"
  max="2024-12-31"
  info="Select a date in 2024"
/>
```

### Date Mask (Formatted Date Input)
```jsx
// MM/DD/YYYY format (default)
<Input
  name="birthDate"
  label="Birth Date"
  mask="MM/DD/YYYY"
  info="Format: MM/DD/YYYY"
/>

// YYYY-MM-DD format
<Input
  name="expiryDate"
  label="Expiry Date"
  mask="YYYY-MM-DD"
  info="Format: YYYY-MM-DD"
/>

// DD/MM/YYYY format
<Input
  name="customDate"
  label="Custom Date"
  mask="DD/MM/YYYY"
  info="Format: DD/MM/YYYY"
/>

// With date range validation
<Input
  name="rangeDate"
  label="Date Range (2023-2024)"
  mask="MM/DD/YYYY"
  min="2023-01-01"
  max="2024-12-31"
  info="Only dates between 2023 and 2024"
/>

// Future dates only
<Input
  name="futureDate"
  label="Future Date"
  mask="YYYY-MM-DD"
  min={new Date().toISOString().split('T')[0]}
  info="Only future dates are allowed"
/>
```

## Select Components

### Basic Select
```jsx
const options = [
  { value: 'option1', text: 'Option 1' },
  { value: 'option2', text: 'Option 2' },
  { value: 'option3', text: 'Option 3' }
];

<Input
  name="category"
  label="Category"
  options={options}
  select
  info="Select a category"
/>
```

### Autocomplete Select
```jsx
const countries = [
  { value: 'us', text: 'United States' },
  { value: 'ca', text: 'Canada' },
  { value: 'uk', text: 'United Kingdom' },
  { value: 'au', text: 'Australia' }
];

<Input
  name="country"
  label="Country"
  options={countries}
  info="Type to search countries"
/>
```

### Multi-Select
```jsx
const skills = [
  { value: 'javascript', text: 'JavaScript' },
  { value: 'react', text: 'React' },
  { value: 'node', text: 'Node.js' },
  { value: 'python', text: 'Python' }
];

<Input
  name="skills"
  label="Skills"
  optionsMulti={skills}
  info="Select multiple skills"
/>
```

### Autocomplete with Free Text
```jsx
const predefinedTags = [
  { value: 'react', text: 'React' },
  { value: 'vue', text: 'Vue' },
  { value: 'angular', text: 'Angular' }
];

<Input
  name="tags"
  label="Tags"
  options={predefinedTags}
  allowFreeText
  info="Select from list or type custom tags"
/>
```

### Checkbox Select
```jsx
const permissions = [
  { value: 'read', text: 'Read' },
  { value: 'write', text: 'Write' },
  { value: 'delete', text: 'Delete' },
  { value: 'admin', text: 'Admin' }
];

<Input
  name="permissions"
  label="Permissions"
  optionsCheckbox={permissions}
  info="Select multiple permissions"
/>
```

## Checkbox and Radio Components

### Single Checkbox
```jsx
<Input
  name="agree"
  label="I agree to the terms and conditions"
  checkbox
  info="Please read the terms before agreeing"
/>
```

### Radio Buttons
```jsx
const genderOptions = [
  { value: 'male', text: 'Male' },
  { value: 'female', text: 'Female' },
  { value: 'other', text: 'Other' }
];

<Input
  name="gender"
  label="Gender"
  optionsRadio={genderOptions}
  info="Select your gender"
/>
```

## Advanced Features

### Masking with Partial Visibility
```jsx
// Show last 4 digits of SSN
<Input
  name="ssn"
  label="Social Security Number"
  mask="ssn"
  showLast={4}
  info="Shows only last 4 digits when masked"
/>

// Show last 2 digits of credit card
<Input
  name="creditCard"
  label="Credit Card"
  mask="creditCard"
  showLast={2}
  info="Shows only last 2 digits when masked"
/>
```

### Persistent Masking (Always Visible)
```jsx
// Always show unmasked value
<Input
  name="publicSSN"
  label="Public SSN"
  mask="ssn"
  persistent
  info="Always visible, no masking"
/>

// Always show unmasked date
<Input
  name="publicDate"
  label="Public Date"
  mask="MM/DD/YYYY"
  persistent
  info="Always visible, no masking"
/>
```

### Custom Mask Patterns
```jsx
// Custom phone format
<Input
  name="customPhone"
  label="Custom Phone"
  mask="+## ### ### ####"
  info="International format"
/>

// Custom date format
<Input
  name="customDate"
  label="Custom Date"
  mask="DD-MM-YYYY"
  info="European format"
/>

// Custom pattern with letters and numbers
<Input
  name="productCode"
  label="Product Code"
  mask="AA-####"
  info="Format: AA-1234"
/>
```

### Form Integration
```jsx
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { Input } from '@/components/formhelper';

const MyForm = () => {
  const methods = useForm({
    defaultValues: {
      firstName: '',
      email: '',
      ssn: '123456789',
      birthDate: '1990-01-01'
    }
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input
          name="firstName"
          label="First Name"
          required
        />
        
        <Input
          name="email"
          label="Email"
          required
        />
        
        <Input
          name="ssn"
          label="SSN"
          mask="ssn"
          showLast={4}
        />
        
        <Input
          name="birthDate"
          label="Birth Date"
          mask="MM/DD/YYYY"
          min="1900-01-01"
          max={new Date().toISOString().split('T')[0]}
        />
        
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};
```

### Grid Layout
```jsx
// Using size prop for grid layout
<div>
  <Input
    name="firstName"
    label="First Name"
    size={6}
  />
  
  <Input
    name="lastName"
    label="Last Name"
    size={6}
  />
  
  <Input
    name="email"
    label="Email"
    size={12}
  />
  
  <Input
    name="phone"
    label="Phone"
    mask="phone"
    size={8}
  />
  
  <Input
    name="extension"
    label="Ext"
    size={4}
  />
</div>
```

## Available Mask Patterns

### Predefined Patterns
```jsx
import { inputMask } from '@/components/formhelper';

// Available patterns:
inputMask.ssn           // '###-##-####'
inputMask.phone         // '(###) ###-####'
inputMask.phoneExt      // '(###) ###-#### x####'
inputMask.creditCard    // '#### #### #### ####'
inputMask.creditCardExpiry // '##/##'
inputMask.zipCode       // '#####'
inputMask.zipCodePlus4  // '#####-####'
inputMask.date          // '##/##/####'
inputMask.time          // '##:##'
inputMask.currency      // '$#,###.##'
inputMask.percentage    // '##%'
inputMask.licensePlate  // 'AAA-####'
```

### Date Mask Patterns
```jsx
import { dateMaskPatterns } from '@/components/formhelper';

// Available date patterns:
dateMaskPatterns['MM/DD/YYYY']     // '##/##/####'
dateMaskPatterns['MM-DD-YYYY']     // '##-##-####'
dateMaskPatterns['DD/MM/YYYY']     // '##/##/####'
dateMaskPatterns['DD-MM-YYYY']     // '##-##-####'
dateMaskPatterns['YYYY-MM-DD']     // '####-##-##'
dateMaskPatterns['MM/DD/YY']       // '##/##/##'
dateMaskPatterns['MM-DD-YY']       // '##-##-##'
dateMaskPatterns['DD/MM/YY']       // '##/##/##'
dateMaskPatterns['DD-MM-YY']       // '##-##-##'
dateMaskPatterns['YYYY/MM/DD']     // '####/##/##'
dateMaskPatterns['MM/YYYY']        // '##/####'
dateMaskPatterns['MM-YYYY']        // '##-####'
dateMaskPatterns['YYYY/MM']        // '####/##'
dateMaskPatterns['YYYY-MM']        // '####-##'
```

## Best Practices

1. **Always provide helpful info text** to guide users on expected formats
2. **Use appropriate mask patterns** for data validation and user experience
3. **Consider using partial masking** for sensitive data like SSNs and credit cards
4. **Implement date range validation** for date inputs to prevent invalid dates
5. **Use grid sizing** to create responsive form layouts
6. **Test mask patterns** thoroughly to ensure they work as expected
7. **Provide clear error messages** when validation fails

## Common Issues and Solutions

### Issue: Mask not applying correctly
**Solution**: Ensure the mask pattern uses the correct characters:
- `#` for digits only
- `A` for letters only
- `*` for any character
- Other characters are treated as static separators

### Issue: Date validation not working
**Solution**: Make sure to use the correct date format for min/max props:
```jsx
// Correct
min="2023-01-01"
max="2024-12-31"

// Incorrect
min="01/01/2023"
max="12/31/2024"
```

### Issue: Partial masking not working
**Solution**: Ensure the `showLast` prop is a positive number and the field has a value:
```jsx
// Correct
showLast={4}

// Incorrect
showLast="4"
showLast={0}
```

### Issue: Form values not updating
**Solution**: Make sure the form is wrapped in FormProvider and the field names are unique:
```jsx
<FormProvider {...methods}>
  <form>
    <Input name="uniqueName" label="Field" />
  </form>
</FormProvider>
``` 