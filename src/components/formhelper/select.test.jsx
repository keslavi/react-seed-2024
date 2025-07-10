import { render, screen, waitFor } from '@testing-library/react';
import { Formhelper } from "./test/formhelper";
import { Select } from "./select";

describe("Formhelper-Select", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  const testData = () => {
    return {
      item: {
        status: 1, // Selected value
        result: 2,
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

  it("loads with initial selected value", () => {
    const data = testData();
    render(
      <Formhelper
        item={data.item}
        option={data.options}
      >
        <Select
          name="status"
          label="Status"
          options={data.options.task.status}
          data-testid="status-select"
        />
      </Formhelper>
    );

    // Check that the select shows the selected option text
    const select = screen.getByRole('combobox', { name: /status/i });
    expect(select).toHaveTextContent('in progress');
  });

  it("shows placeholder when no value is selected", () => {
    const data = testData();
    // Remove status from item to simulate empty state
    const itemWithoutStatus = { ...data.item };
    delete itemWithoutStatus.status;

    render(
      <Formhelper
        item={itemWithoutStatus}
        option={data.options}
      >
        <Select
          name="status"
          label="Status"
          options={data.options.task.status}
          placeholder="Select a status"
          data-testid="status-select"
        />
      </Formhelper>
    );

    // Check that the select shows the placeholder text
    const select = screen.getByRole('combobox', { name: /status/i });
    expect(select).toHaveTextContent('Select a status');
  });

  it("shows default placeholder when no custom placeholder is provided", () => {
    const data = testData();
    const itemWithoutStatus = { ...data.item };
    delete itemWithoutStatus.status;

    render(
      <Formhelper
        item={itemWithoutStatus}
        option={data.options}
      >
        <Select
          name="status"
          label="Status"
          options={data.options.task.status}
          data-testid="status-select"
        />
      </Formhelper>
    );

    // Check that the select shows the default placeholder text
    const select = screen.getByRole('combobox', { name: /status/i });
    expect(select).toHaveTextContent('Please Select');
  });

  it("does not show placeholder option in dropdown when opened", async () => {
    const data = testData();
    const itemWithoutStatus = { ...data.item };
    delete itemWithoutStatus.status;

    render(
      <Formhelper
        item={itemWithoutStatus}
        option={data.options}
      >
        <Select
          name="status"
          label="Status"
          options={data.options.task.status}
          placeholder="Select a status"
          data-testid="status-select"
        />
      </Formhelper>
    );

    // Open the dropdown
    const select = screen.getByRole('combobox', { name: /status/i });
    await user.click(select);

    // Wait for dropdown to open and check that placeholder is not in the options
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Check that only the actual options are present, not the placeholder
    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(screen.getByText('in progress')).toBeInTheDocument();
    expect(screen.getByText('completed')).toBeInTheDocument();
    expect(screen.getByText('cancelled')).toBeInTheDocument();
    
    // Placeholder should not be in the dropdown options list
    const listbox = screen.getByRole('listbox');
    expect(listbox).not.toHaveTextContent('Select a status');
  });

  it("allows user to select an option", async () => {
    const data = testData();
    const itemWithoutStatus = { ...data.item };
    delete itemWithoutStatus.status;

    render(
      <Formhelper
        item={itemWithoutStatus}
        option={data.options}
      >
        <Select
          name="status"
          label="Status"
          options={data.options.task.status}
          placeholder="Select a status"
          data-testid="status-select"
        />
      </Formhelper>
    );

    // Open the dropdown
    const select = screen.getByRole('combobox', { name: /status/i });
    await user.click(select);

    // Wait for dropdown to open and select an option
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Click on an option
    await user.click(screen.getByText('completed'));

    // Check that the select now shows the selected option
    await waitFor(() => {
      expect(select).toHaveTextContent('completed');
    });
  });

  it("handles empty options array", () => {
    render(
      <Formhelper item={{}} option={{}}>
        <Select
          name="status"
          label="Status"
          options={[]}
          placeholder="Select a status"
          data-testid="status-select"
        />
      </Formhelper>
    );

    // Check that the select shows the placeholder text
    const select = screen.getByRole('combobox', { name: /status/i });
    expect(select).toHaveTextContent('Select a status');
  });

  it("calls onChange and onBlur props if provided", async () => {
    const handleChange = vi.fn();
    const handleBlur = vi.fn();
    const data = testData();

    render(
      <Formhelper
        item={data.item}
        option={data.options}
      >
        <Select
          name="status"
          label="Status"
          options={data.options.task.status}
          onChange={handleChange}
          onBlur={handleBlur}
          data-testid="status-select"
        />
      </Formhelper>
    );

    const select = screen.getByRole('combobox', { name: /status/i });
    
    // Test onChange by opening dropdown and selecting an option
    await user.click(select);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    await user.click(screen.getByText('cancelled'));
    expect(handleChange).toHaveBeenCalled();

    // Test onBlur
    await user.tab(); // This will blur the select
    expect(handleBlur).toHaveBeenCalled();
  });

  it("renders with error state", () => {
    render(
      <Formhelper item={{}} option={{}}>
        <Select
          name="status"
          label="Status"
          options={testData().options.task.status}
          error={{ message: "This field is required" }}
          data-testid="status-select"
        />
      </Formhelper>
    );

    // Check that the error message is displayed
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it("renders with info tooltip", async () => {
    render(
      <Formhelper item={{}} option={{}}>
        <Select
          name="status"
          label="Status"
          options={testData().options.task.status}
          info="This is helpful information"
          data-testid="status-select"
        />
      </Formhelper>
    );

    // Click the info icon to open the popover
    const infoIcon = screen.getByTestId('HelpRoundedIcon');
    await user.click(infoIcon);

    // Wait for the popover to open and check for info text
    await waitFor(() => {
      expect(screen.getByText('This is helpful information')).toBeInTheDocument();
    });
  });
});