import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useFormProvider } from './form-provider';
import { TextMask } from './text-mask';

// Test wrapper component
const TestWrapper = ({ children, formOptions = {} }) => {
  const methods = useFormProvider(formOptions);
  return (
    <FormProvider formMethods={methods}>
      {children}
    </FormProvider>
  );
};

describe('TextMask Component', () => {
  test('renders with SSN mask', () => {
    render(
      <TestWrapper>
        <TextMask 
          name="ssn" 
          label="Social Security Number" 
          mask="ssn"
        />
      </TestWrapper>
    );
    
    const input = screen.getByLabelText('Social Security Number');
    expect(input).toBeInTheDocument();
  });

  test('applies SSN mask correctly', () => {
    render(
      <TestWrapper>
        <TextMask 
          name="ssn" 
          label="SSN" 
          mask="ssn"
        />
      </TestWrapper>
    );
    
    const input = screen.getByLabelText('SSN');
    fireEvent.change(input, { target: { value: '123456789' } });
    
    expect(input.value).toBe('123-45-6789');
  });

  test('applies phone mask correctly', () => {
    render(
      <TestWrapper>
        <TextMask 
          name="phone" 
          label="Phone" 
          mask="phone"
        />
      </TestWrapper>
    );
    
    const input = screen.getByLabelText('Phone');
    fireEvent.change(input, { target: { value: '5551234567' } });
    
    expect(input.value).toBe('(555) 123-4567');
  });

  test('applies custom mask pattern', () => {
    render(
      <TestWrapper>
        <TextMask 
          name="custom" 
          label="Custom" 
          mask="##-##-##"
        />
      </TestWrapper>
    );
    
    const input = screen.getByLabelText('Custom');
    fireEvent.change(input, { target: { value: '123456' } });
    
    expect(input.value).toBe('12-34-56');
  });

  test('applies format pattern', () => {
    render(
      <TestWrapper>
        <TextMask 
          name="formatted" 
          label="Formatted" 
          format="####-####"
        />
      </TestWrapper>
    );
    
    const input = screen.getByLabelText('Formatted');
    fireEvent.change(input, { target: { value: '12345678' } });
    
    expect(input.value).toBe('1234-5678');
  });

  test('handles credit card mask', () => {
    render(
      <TestWrapper>
        <TextMask 
          name="card" 
          label="Credit Card" 
          mask="creditCard"
        />
      </TestWrapper>
    );
    
    const input = screen.getByLabelText('Credit Card');
    fireEvent.change(input, { target: { value: '1234567890123456' } });
    
    expect(input.value).toBe('1234 5678 9012 3456');
  });

  test('handles zip code mask', () => {
    render(
      <TestWrapper>
        <TextMask 
          name="zip" 
          label="Zip Code" 
          mask="zipCodePlus4"
        />
      </TestWrapper>
    );
    
    const input = screen.getByLabelText('Zip Code');
    fireEvent.change(input, { target: { value: '123456789' } });
    
    expect(input.value).toBe('12345-6789');
  });
}); 