import { TestHarness } from './test/testHarness';
import { DateMask } from './date-mask';
import { Row } from '../grid';

/** Helper: find the visible FormControl for a label text (DateMask renders 3 fields) */
const getVisibleInput = (labelText: string, type: string) => {
  const allLabels = screen.getAllByText(labelText);
  const visibleLabel = allLabels.find(label => {
    const fc = label.closest('div[class*="MuiFormControl"]');
    return fc && !fc.className.includes('hidden');
  });
  const fc = visibleLabel!.closest('div[class*="MuiFormControl"]')!;
  return fc.querySelector(`input[type="${type}"]`);
};

describe('DateMask', () => {
  it('when empty, renders date input visible and masked as hidden', () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <DateMask name="testDate" label="Test Date" />
        </Row>
      </TestHarness>
    );

    const dateInput = getVisibleInput('Test Date', 'date');
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveAttribute('type', 'date');

    const maskedInput = screen.getByDisplayValue('**/**/****');
    expect(maskedInput).toBeInTheDocument();

    expect(screen.getByText('Hide')).toBeInTheDocument();
  });

  it('accepts a date value', async () => {
    const user = userEvent.setup();
    render(
      <TestHarness item={{}}>
        <Row>
          <DateMask name="testDate" label="Test Date" />
        </Row>
      </TestHarness>
    );
    const dateInput = getVisibleInput('Test Date', 'date') as HTMLInputElement;
    await user.click(dateInput);
    await user.type(dateInput, '2023-12-01');
    expect(dateInput).toHaveValue('2023-12-01');
  });

  it('toggles Show/Hide on helper text click', async () => {
    const user = userEvent.setup();
    render(
      <TestHarness item={{}}>
        <Row>
          <DateMask name="testDate" label="Test Date" />
        </Row>
      </TestHarness>
    );
    // initially date input is visible (Hide shown)
    expect(screen.getByText('Hide')).toBeInTheDocument();

    await user.click(screen.getByText('Hide'));
    await waitFor(() => {
      expect(screen.getByText('Show')).toBeInTheDocument();
    });
  });

  it('applies min date attribute', async () => {
    const user = userEvent.setup();
    render(
      <TestHarness item={{}}>
        <Row>
          <DateMask name="testDate" label="Test Date" min="2023-01-01" />
        </Row>
      </TestHarness>
    );
    const dateInput = getVisibleInput('Test Date', 'date') as HTMLInputElement;
    await user.click(dateInput);
    await user.type(dateInput, '2023-12-01');
    expect(dateInput).toHaveValue('2023-12-01');
  });

  it('applies max date attribute', async () => {
    const user = userEvent.setup();
    render(
      <TestHarness item={{}}>
        <Row>
          <DateMask name="testDate" label="Test Date" max="2023-12-31" />
        </Row>
      </TestHarness>
    );
    const dateInput = getVisibleInput('Test Date', 'date') as HTMLInputElement;
    expect(dateInput).toHaveAttribute('max', '2023-12-31');
    await user.click(dateInput);
    await user.type(dateInput, '2023-06-15');
    expect(dateInput).toHaveValue('2023-06-15');
  });
});
