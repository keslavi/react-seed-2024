import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { Formhelper } from "./test/formhelper";
import { SelectAutocomplete } from "./select-autocomplete";

describe("Formhelper-SelectAutocomplete", () => {
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
      <Formhelper
        item={data.item}
        option={data.options}
      >
        <SelectAutocomplete
          name="status"
          label="Status"
          options={data.options.task.status}
          data-testid="status-select"
        />
      </Formhelper>
    );
    expect(screen.getByText(/formhelper tester/i)).toBeVisible();
    
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
      <Formhelper
        item={{}}
        option={data.options}
      >
        <SelectAutocomplete
          name="status"
          label="Status"
          options={data.options.task.status}
          data-testid="status-select"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('status-select').querySelector('input');
    expect(input).toHaveAttribute('placeholder', 'Please Select');
  });

  it("allows selecting a value", async () => {
    const data = testData();
    render(
      <Formhelper
        item={{}}
        option={data.options}
      >
        <SelectAutocomplete
          name="status"
          label="Status"
          options={data.options.task.status}
          data-testid="status-select"
        />
      </Formhelper>
    );

    const input = screen.getByTestId('status-select').querySelector('input');
    
    // Click to open dropdown and type to filter
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'completed' } });
    
    // Wait for and select the option
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      const option = options.find(opt => opt.textContent === 'completed');
      expect(option).toBeTruthy();
      fireEvent.click(option);
    });

    // Verify the value was selected
    expect(input).toHaveValue('completed');
  });

  it("allows clearing a value", async () => {
    const data = testData();
    render(
      <Formhelper
        item={data.item}
        option={data.options}
      >
        <SelectAutocomplete
          name="status"
          label="Status"
          options={data.options.task.status}
          data-testid="status-select"
        />
      </Formhelper>
    );

    const input = screen.getByRole('combobox', { name: /status/i });
    
    // Focus the field
    fireEvent.focus(input);
    
    // Look for the clear button
    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);

    // Verify the value was cleared
    expect(input).toHaveValue('');
  });

  it("maintains cleared state after blur", async () => {
    const data = testData();
    render(
      <Formhelper
        item={{}}
        option={data.options}
      >
        <SelectAutocomplete
          name="status"
          label="Status"
          options={data.options.task.status}
          data-testid="status-select"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('status-select').querySelector('input');
    
    // First select a value
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'completed' } });
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      const option = options.find(opt => opt.textContent === 'completed');
      expect(option).toBeTruthy();
      fireEvent.click(option);
    });
    
    // Now try to clear it
    fireEvent.click(input);
    await waitFor(() => {
      const clearButton = screen.getByRole('button', { name: /clear/i });
      fireEvent.click(clearButton);
    });
    
    fireEvent.blur(input);
    expect(input).toHaveValue('');
  });

  it("uses custom placeholder when provided", () => {
    const data = testData();
    render(
      <Formhelper
        item={{}}
        option={data.options}
      >
        <SelectAutocomplete
          name="status"
          label="Status"
          options={data.options.task.status}
          placeholder="Select a status"
          data-testid="status-select"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('status-select').querySelector('input');
    expect(input).toHaveAttribute('placeholder', 'Select a status');
  });
}); 