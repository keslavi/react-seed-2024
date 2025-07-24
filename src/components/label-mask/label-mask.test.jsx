import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LabelMask } from './label-mask';
import { inputMask } from 'components';

// Test wrapper component
const TestWrapper = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

describe('LabelMask Component', () => {
  test('renders with SSN mask using children', () => {
    render(
      <TestWrapper>
        <LabelMask mask={inputMask.ssn}>123456789</LabelMask>
      </TestWrapper>
    );
    
    // Should show masked value initially
    expect(screen.getByText('***-**-****')).toBeInTheDocument();
  });

  test('renders with SSN mask using text prop', () => {
    render(
      <TestWrapper>
        <LabelMask mask={inputMask.ssn} text="123456789" />
      </TestWrapper>
    );
    
    // Should show masked value initially
    expect(screen.getByText('***-**-****')).toBeInTheDocument();
  });

  test('shows visibility toggle when value is present', () => {
    render(
      <TestWrapper>
        <LabelMask mask={inputMask.ssn}>123456789</LabelMask>
      </TestWrapper>
    );
    
    const toggleButton = screen.getByLabelText('toggle value visibility');
    expect(toggleButton).toBeInTheDocument();
  });

  test('toggles visibility when clicked', () => {
    render(
      <TestWrapper>
        <LabelMask mask={inputMask.ssn}>123456789</LabelMask>
      </TestWrapper>
    );
    
    const toggleButton = screen.getByLabelText('toggle value visibility');
    
    // Initially masked
    expect(screen.getByText('***-**-****')).toBeInTheDocument();
    
    // Click to show
    fireEvent.click(toggleButton);
    expect(screen.getByText('123-45-6789')).toBeInTheDocument();
    
    // Click to hide again
    fireEvent.click(toggleButton);
    expect(screen.getByText('***-**-****')).toBeInTheDocument();
  });

  test('shows partial mask with showLast prop', () => {
    render(
      <TestWrapper>
        <LabelMask mask={inputMask.ssn} showLast={4}>123456789</LabelMask>
      </TestWrapper>
    );
    
    // Should show partial mask with last 4 characters visible
    expect(screen.getByText('***-**-6789')).toBeInTheDocument();
  });

  test('always shows unmasked value when persistent is true', () => {
    render(
      <TestWrapper>
        <LabelMask mask={inputMask.ssn} persistent>123456789</LabelMask>
      </TestWrapper>
    );
    
    // Should always show formatted value
    expect(screen.getByText('123-45-6789')).toBeInTheDocument();
    
    // Should not show toggle button
    expect(screen.queryByLabelText('toggle value visibility')).not.toBeInTheDocument();
  });

  test('handles phone number mask', () => {
    render(
      <TestWrapper>
        <LabelMask mask={inputMask.phone}>5551234567</LabelMask>
      </TestWrapper>
    );
    
    // Should show masked phone number
    expect(screen.getByText('(***) ***-****')).toBeInTheDocument();
    
    const toggleButton = screen.getByLabelText('toggle value visibility');
    fireEvent.click(toggleButton);
    
    // Should show formatted phone number
    expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
  });

  test('handles license plate mask', () => {
    render(
      <TestWrapper>
        <LabelMask mask={inputMask.licensePlate}>ABC1234</LabelMask>
      </TestWrapper>
    );
    
    // Should show masked license plate
    expect(screen.getByText('***-****')).toBeInTheDocument();
    
    const toggleButton = screen.getByLabelText('toggle value visibility');
    fireEvent.click(toggleButton);
    
    // Should show formatted license plate
    expect(screen.getByText('ABC-1234')).toBeInTheDocument();
  });

  test('inherits parent styles by default', () => {
    render(
      <TestWrapper>
        <div style={{ color: 'red', fontSize: '20px' }}>
          <LabelMask mask={inputMask.ssn}>123456789</LabelMask>
        </div>
      </TestWrapper>
    );
    
    const labelMask = screen.getByText('***-**-****').closest('span');
    expect(labelMask).toBeInTheDocument();
  });

  test('applies custom styles', () => {
    render(
      <TestWrapper>
        <LabelMask 
          mask={inputMask.ssn} 
          style={{ color: 'blue', fontWeight: 'bold' }}
        >
          123456789
        </LabelMask>
      </TestWrapper>
    );
    
    const labelMask = screen.getByText('***-**-****').closest('span');
    expect(labelMask).toHaveStyle({ color: 'blue', fontWeight: 'bold' });
  });
}); 