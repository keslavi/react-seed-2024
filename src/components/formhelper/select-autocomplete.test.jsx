import { TestHarness } from "./test/testHarness";
import { Input } from "components";

describe("Formhelper-SelectAutocomplete", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  const testData = () => {
    return {
      item: {
        status: "3", // cancelled
        result: 2,   // not good
      },
      options: {
        task: {
          status: [
            { key: 0, text: "pending" },
            { key: 1, text: "in progress" },
            { key: 2, text: "completed" },
            { key: 3, text: "cancelled" },
          ],
          result: [
            { key: 0, text: "whoops" },
            { key: 1, text: "good" },
            { key: 2, text: "not good" },
            { key: 3, text: "who knows" },
          ],
        },
      },
    };
  };

  it("loads with initial value", async () => {
    const data = testData();
    render(
      <TestHarness item={data.item}>
        <Input
          name="status"
          label="Status"
          options={data.options.task.status}
          data-testid="status-select"
        />
      </TestHarness>
    );
    
    const input = screen.getByTestId('status-select').querySelector('input');
    
    // Wait for react-hook-form to initialize and populate the form values
    await waitFor(() => {
      const selectedOption = data.options.task.status.find(opt => opt.key == parseInt(data.item.status));
      expect(selectedOption).toBeTruthy();
      expect(input).toHaveValue(selectedOption.text);
    }, { 
      timeout: 5000,
      interval: 100 // Check more frequently
    });
  });

  it("shows placeholder when no value selected", () => {
    const data = testData();
    render(
      <TestHarness item={{}}>
        <Input
          name="status"
          label="Status"
          options={data.options.task.status}
          data-testid="status-select"
        />
      </TestHarness>
    );
    const input = screen.getByTestId('status-select').querySelector('input');
    expect(input).toHaveAttribute('placeholder', 'Please Select');
  });

  it("allows selecting a value", async () => {
    const data = testData();
    render(
      <TestHarness item={{}}>
        <Input
          name="status"
          label="Status"
          options={data.options.task.status}
          data-testid="status-select"
        />
      </TestHarness>
    );

    const input = screen.getByTestId('status-select').querySelector('input');
    
    // Click to open dropdown and type to filter
    await user.click(input);
    await user.type(input, 'completed');
    
    // Wait for and select the option
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      const option = options.find(opt => opt.textContent === 'completed');
      expect(option).toBeTruthy();
    });
    
    const option = screen.getAllByRole('option').find(opt => opt.textContent === 'completed');
    await user.click(option);

    // Verify the value was selected
    expect(input).toHaveValue('completed');
  });

  it("allows clearing a value", async () => {
    const data = testData();
    render(
      <TestHarness item={data.item}>
        <Input
          name="status"
          label="Status"
          options={data.options.task.status}
          data-testid="status-select"
        />
      </TestHarness>
    );

    const input = screen.getByRole('combobox', { name: /status/i });
    
    // Focus the field
    await user.click(input);
    
    // Look for the clear button
    const clearButton = screen.getByRole('button', { name: /clear/i });
    await user.click(clearButton);

    // Verify the value was cleared
    expect(input).toHaveValue('');
  });

  it("maintains cleared state after blur", async () => {
    const data = testData();
    render(
      <TestHarness item={{}}>
        <Input
          name="status"
          label="Status"
          options={data.options.task.status}
          data-testid="status-select"
        />
      </TestHarness>
    );
    const input = screen.getByTestId('status-select').querySelector('input');
    
    // First select a value
    await user.click(input);
    await user.type(input, 'completed');
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      const option = options.find(opt => opt.textContent === 'completed');
      expect(option).toBeTruthy();
    });
    
    const option = screen.getAllByRole('option').find(opt => opt.textContent === 'completed');
    await user.click(option);
    
    // Now try to clear it
    await user.click(input);
    await waitFor(() => {
      const clearButton = screen.getByRole('button', { name: /clear/i });
    });
    
    const clearButton = screen.getByRole('button', { name: /clear/i });
    await user.click(clearButton);
    
    await user.tab(); // This will blur the input
    expect(input).toHaveValue('');
  });

  it("clears form field value properly without reverting to initial values", async () => {
    const data = testData();
    render(
      <TestHarness item={data.item}>
        <Input
          name="status"
          label="Status"
          options={data.options.task.status}
          data-testid="status-select"
        />
      </TestHarness>
    );

    const input = screen.getByRole('combobox', { name: /status/i });
    
    // Verify initial value is loaded
    await waitFor(() => {
      expect(input).toHaveValue('cancelled'); // Should show the initial value
    });
    
    // Focus the field and clear it
    await user.click(input);
    const clearButton = screen.getByRole('button', { name: /clear/i });
    await user.click(clearButton);

    // Verify the value was cleared
    expect(input).toHaveValue('');
    
    // Blur the field and verify it stays cleared
    await user.tab(); // This will blur the input
    expect(input).toHaveValue('');
    
    // Focus again and verify it's still cleared
    await user.click(input);
    expect(input).toHaveValue('');
  });

  it("uses custom placeholder when provided", async () => {
    const data = testData();
    render(
      <TestHarness item={{}}>
        <Input
          name="status"
          label="Status"
          options={data.options.task.status}
          placeholder="Select a status"
          data-testid="status-select"
        />
      </TestHarness>
    );
    
    const input = screen.getByTestId('status-select').querySelector('input');
    
    // Check the placeholder attribute is set correctly
    expect(input).toHaveAttribute('placeholder', 'Select a status');
    
    // Check that the input is empty (showing placeholder)
    expect(input).toHaveDisplayValue('');
    
    // Verify the input is visible and accessible
    expect(input).toBeVisible();
    expect(input).toBeEnabled();
    
    // Test that placeholder behavior works correctly when focusing
    await user.click(input);
    expect(input).toHaveDisplayValue('');
    
    // Test that placeholder disappears when typing
    await user.type(input, 'test');
    expect(input).toHaveDisplayValue('test');
    
    // Test that placeholder reappears when clearing
    await user.clear(input);
    expect(input).toHaveDisplayValue('');
    
    // Test that the placeholder text is actually rendered and visible
    // This checks that the input shows the placeholder text when empty
    expect(input).toHaveAttribute('placeholder', 'Select a status');
  });
}); 