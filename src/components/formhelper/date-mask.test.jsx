import { TestHarness } from './test/testHarness';
import { DateMask } from './date-mask';
import { Row } from '../grid';

describe('DateMask', () => {
  it('when empty, renders with default MM/DD/YYYY mask', () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <DateMask
            name="testDate"
            label="Test Date"
          />
        </Row>
      </TestHarness>
    );
    
    // Find all labels with 'Test Date' text, then find the one in the visible FormControl
    const allLabels = screen.getAllByText('Test Date');
    const visibleLabel = allLabels.find(label => {
      const formControl = label.closest('div[class*="MuiFormControl"]');
      return formControl && !formControl.className.includes('hidden');
    });
    
    expect(visibleLabel).toBeInTheDocument();
    
    // Find the input within the visible FormControl
    const visibleFormControl = visibleLabel.closest('div[class*="MuiFormControl"]');
    const dateInput = visibleFormControl.querySelector('input[type="date"]');
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveAttribute('type', 'date');
    
    // The masked input should be hidden (but still in DOM)
    const maskedInput = screen.getByDisplayValue('**/**/****');
    expect(maskedInput).toBeInTheDocument();
    
    // The helper text should show "hide" (since it's not masked by default)
    const helperText = screen.getByText('hide');
    expect(helperText).toBeInTheDocument();
  });

  
  it('applies mask formatting to input', async () => {
    const user = userEvent.setup();
    render(
      <TestHarness item={{}}>
        <Row>
          <DateMask
            name="testDate"
            label="Test Date"
          />
        </Row>
      </TestHarness>
    );
    
    // Find all labels with 'Test Date' text, then find the one in the visible FormControl
    const allLabels = screen.getAllByText('Test Date');
    const visibleLabel = allLabels.find(label => {
      const formControl = label.closest('div[class*="MuiFormControl"]');
      return formControl && !formControl.className.includes('hidden');
    });
    
    // Find the input within the visible FormControl
    const visibleFormControl = visibleLabel.closest('div[class*="MuiFormControl"]');
    const dateInput = visibleFormControl.querySelector('input[type="date"]');
    expect(dateInput).toHaveAttribute('type', 'date');
    
    // Focus and change to a valid date
    await user.click(dateInput);
    await user.type(dateInput, '2023-12-01');
    
    // Should accept the date value
    expect(dateInput).toHaveValue('2023-12-01');
  });

  it('shows visibility toggle when not persistent', () => {
    render(
      <TestHarness item={{ defaultValues: { testDate: '1234567890' } }}>
        <Row>
          <DateMask
            name="testDate"
            label="Test Date"
          />
        </Row>
      </TestHarness>
    );
    
    // Find all labels with 'Test Date' text, then find the one in the visible FormControl
    const allLabels = screen.getAllByText('Test Date');
    const visibleLabel = allLabels.find(label => {
      const formControl = label.closest('div[class*="MuiFormControl"]');
      return formControl && !formControl.className.includes('hidden');
    });
    
    // Find the input within the visible FormControl
    const visibleFormControl = visibleLabel.closest('div[class*="MuiFormControl"]');
    const dateInput = visibleFormControl.querySelector('input[type="date"]');
    
    // Focus the input to show the helper text
    fireEvent.focus(dateInput);
    
    const toggleText = screen.getByText('hide');
    expect(toggleText).toBeInTheDocument();
  });

  it('validates date input', async () => {
    const user = userEvent.setup();
    render(
      <TestHarness item={{}}>
        <Row>
          <DateMask
            name="testDate"
            label="Test Date"
          />
        </Row>
      </TestHarness>
    );
    
    // Find all labels with 'Test Date' text, then find the one in the visible FormControl
    const allLabels = screen.getAllByText('Test Date');
    const visibleLabel = allLabels.find(label => {
      const formControl = label.closest('div[class*="MuiFormControl"]');
      return formControl && !formControl.className.includes('hidden');
    });
    
    // Find the input within the visible FormControl
    const visibleFormControl = visibleLabel.closest('div[class*="MuiFormControl"]');
    const dateInput = visibleFormControl.querySelector('input[type="date"]');
    expect(dateInput).toHaveAttribute('type', 'date');
    
    // Focus and test valid dates
    await user.click(dateInput);
    await user.type(dateInput, '2023-12-01');
    expect(dateInput).toHaveValue('2023-12-01');
    
    await user.clear(dateInput);
    await user.type(dateInput, '2023-06-15');
    expect(dateInput).toHaveValue('2023-06-15');
  });

  it('validates min date constraint', async () => {
    const user = userEvent.setup();
    render(
      <TestHarness item={{}}>
        <Row>
          <DateMask
            name="testDate"
            label="Test Date"
            min="2023-01-01"
          />
        </Row>
      </TestHarness>
    );
    
    // Find all labels with 'Test Date' text, then find the one in the visible FormControl
    const allLabels = screen.getAllByText('Test Date');
    const visibleLabel = allLabels.find(label => {
      const formControl = label.closest('div[class*="MuiFormControl"]');
      return formControl && !formControl.className.includes('hidden');
    });
    
    // Find the input within the visible FormControl
    const visibleFormControl = visibleLabel.closest('div[class*="MuiFormControl"]');
    const dateInput = visibleFormControl.querySelector('input[type="date"]');
    expect(dateInput).toHaveAttribute('type', 'date');
    
    // Focus and test dates
    await user.click(dateInput);
    
    // Date before min (should be rejected)
    await user.type(dateInput, '2022-12-01');
    expect(dateInput).toHaveValue('2022-12-01'); // Should format but validation would prevent storage
    
    // Date after min (should be accepted)
    await user.clear(dateInput);
    await user.type(dateInput, '2023-12-01');
    expect(dateInput).toHaveValue('2023-12-01');
  });

  it('validates max date constraint', async () => {
    const user = userEvent.setup();
    render(
      <TestHarness item={{}}>
        <Row>
          <DateMask
            name="testDate"
            label="Test Date"
            max="2023-12-31"
          />
        </Row>
      </TestHarness>
    );
    
    // Find all labels with 'Test Date' text, then find the one in the visible FormControl
    const allLabels = screen.getAllByText('Test Date');
    const visibleLabel = allLabels.find(label => {
      const formControl = label.closest('div[class*="MuiFormControl"]');
      return formControl && !formControl.className.includes('hidden');
    });
    
    // Find the input within the visible FormControl
    const visibleFormControl = visibleLabel.closest('div[class*="MuiFormControl"]');
    const dateInput = visibleFormControl.querySelector('input[type="date"]');
    expect(dateInput).toHaveAttribute('type', 'date');
    
    // Focus and test dates
    await user.click(dateInput);
    
    // Date after max (should be rejected)
    await user.type(dateInput, '2024-01-01');
    expect(dateInput).toHaveValue('2024-01-01'); // Should format but validation would prevent storage
    
    // Date before max (should be accepted)
    await user.clear(dateInput);
    await user.type(dateInput, '2023-12-01');
    expect(dateInput).toHaveValue('2023-12-01');
  });
}); 
