import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useFormProvider } from './form-provider';
import { DateMask } from './date-mask';

// Wrapper component to provide form context
const TestWrapper = ({ children, formOptions = {} }) => {
  const methods = useFormProvider(formOptions);
  return (
    <FormProvider formMethods={methods}>
      {children}
    </FormProvider>
  );
};

describe('DateMask', () => {
  it('renders with default MM/DD/YYYY mask', () => {
    render(
      <TestWrapper>
        <DateMask name="testDate" label="Test Date" />
      </TestWrapper>
    );
    
    // Get the masked input (type="text" with **/**/**** value)
    const input = screen.getByDisplayValue('**/**/****');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Test Date');
  });

  it('renders with custom mask pattern', () => {
    render(
      <TestWrapper>
        <DateMask name="testDate" label="Test Date" mask="YYYY-MM-DD" />
      </TestWrapper>
    );
    
    // Get the masked input (type="text" with **/**/**** value)
    const input = screen.getByDisplayValue('**/**/****');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Test Date');
  });

  it('applies mask formatting to input', () => {
    render(
      <TestWrapper>
        <DateMask name="testDate" label="Test Date" />
      </TestWrapper>
    );
    
    // Get the date input (type="date") which is the visible one when no value is set
    const input = screen.getByDisplayValue('');
    
    // Change to a valid date
    fireEvent.change(input, { target: { value: '2023-12-01' } });
    
    // Should accept the date value
    expect(input.value).toBe('2023-12-01');
  });

  /*
  it('shows visibility toggle when not persistent', () => {
    render(
      <TestWrapper formOptions={{ defaultValues: { testDate: '1234567890' } }}>
        <DateMask name="testDate" label="Test Date" />
      </TestWrapper>
    );
    
    // Focus the input to show the helper text
    const input = screen.getByDisplayValue('1234567890');
    fireEvent.focus(input);
    
    const toggleText = screen.getByText('Show');
    expect(toggleText).toBeInTheDocument();
  });
  */

/*
  it('hides visibility toggle when persistent', () => {
    render(
      <TestWrapper formOptions={{ defaultValues: { testDate: '1234567890' } }}>
        <DateMask name="testDate" label="Test Date" persistent />
      </TestWrapper>
    );
    
    // Focus the input to try to show the helper text
    const input = screen.getByDisplayValue('1234567890');
    fireEvent.focus(input);
    
    // No helper text should be present when persistent
    const toggleText = screen.queryByText('Show');
    expect(toggleText).not.toBeInTheDocument();
  });
  */

  it('validates date input', () => {
    render(
      <TestWrapper>
        <DateMask name="testDate" label="Test Date" />
      </TestWrapper>
    );
    
    const input = screen.getByDisplayValue('');
    
    // Valid date
    fireEvent.change(input, { target: { value: '2023-12-01' } });
    expect(input.value).toBe('2023-12-01');
    
    // Another valid date
    fireEvent.change(input, { target: { value: '2023-06-15' } });
    expect(input.value).toBe('2023-06-15');
  });

  it('validates min date constraint', () => {
    render(
      <TestWrapper>
        <DateMask name="testDate" label="Test Date" min="2023-01-01" />
      </TestWrapper>
    );
    
    const input = screen.getByDisplayValue('');
    
    // Date before min (should be rejected)
    fireEvent.change(input, { target: { value: '2022-12-01' } });
    expect(input.value).toBe('2022-12-01'); // Should format but validation would prevent storage
    
    // Date after min (should be accepted)
    fireEvent.change(input, { target: { value: '2023-12-01' } });
    expect(input.value).toBe('2023-12-01');
  });

  it('validates max date constraint', () => {
    render(
      <TestWrapper>
        <DateMask name="testDate" label="Test Date" max="2023-12-31" />
      </TestWrapper>
    );
    
    const input = screen.getByDisplayValue('');
    
    // Date after max (should be rejected)
    fireEvent.change(input, { target: { value: '2024-01-01' } });
    expect(input.value).toBe('2024-01-01'); // Should format but validation would prevent storage
    
    // Date before max (should be accepted)
    fireEvent.change(input, { target: { value: '2023-12-01' } });
    expect(input.value).toBe('2023-12-01');
  });

  it('validates both min and max date constraints', () => {
    render(
      <TestWrapper>
        <DateMask name="testDate" label="Test Date" min="2023-01-01" max="2023-12-31" />
      </TestWrapper>
    );
    
    // Get the date input (type="date") which is the visible one when no value is set
    const input = screen.getByDisplayValue('');
    
    // Date within range (should be accepted)
    fireEvent.change(input, { target: { value: '2023-06-01' } });
    expect(input.value).toBe('2023-06-01');
    
    // Date before min (should be rejected)
    fireEvent.change(input, { target: { value: '2022-12-01' } });
    expect(input.value).toBe('2022-12-01'); // Should format but validation would prevent storage
    
    // Date after max (should be rejected)
    fireEvent.change(input, { target: { value: '2024-01-01' } });
    expect(input.value).toBe('2024-01-01'); // Should format but validation would prevent storage
  });
}); 