import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Formhelper } from "./test/formhelper";
import { Radio } from "./radio";

describe("Formhelper-Radio", () => {
  const testData = () => {
    return {
      item: {
        status: "1", // selected status: "in progress"
        priority: "2", // selected priority: "high"
      },
      options: {
        task: {
          status: [
            { key: 0, value: "0", text: "pending" },
            { key: 1, value: "1", text: "in progress" },
            { key: 2, value: "2", text: "completed" },
            { key: 3, value: "3", text: "cancelled" },
          ],
          priority: [
            { key: 0, value: "0", text: "low" },
            { key: 1, value: "1", text: "medium" },
            { key: 2, value: "2", text: "high" },
            { key: 3, value: "3", text: "urgent" },
          ],
        },
      },
    };
  };

  it("loads with initial values", async () => {
    const data = testData();
    render(
      <Formhelper
        item={data.item}
        option={data.options}
      >
        <Radio
          name="status"
          label="Status"
          optionsRadio={data.options.task.status}
          data-testid="status-radio"
        />
      </Formhelper>
    );
    expect(screen.getByText(/formhelper tester/i)).toBeVisible();
    
    // Check that the selected option is visible
    expect(screen.getByText(/in progress/i)).toBeVisible();
    
    // Check that the radio button is selected
    const radioGroup = screen.getByTestId('status-radio');
    const selectedRadio = radioGroup.querySelector('input[type="radio"]:checked');
    expect(selectedRadio).toHaveValue('1');
  });

  it("renders with no options and does not crash", () => {
    render(
      <Formhelper item={{}} option={{}}>
        <Radio
          name="status"
          label="Status"
          optionsRadio={[]}
          data-testid="status-radio"
        />
      </Formhelper>
    );
    const radioGroup = screen.getByTestId('status-radio');
    expect(radioGroup).toBeVisible();
  });

  it("allows user selection and updates value", async () => {
    const data = testData();
    render(
      <Formhelper item={{}} option={data.options}>
        <Radio
          name="status"
          label="Status"
          optionsRadio={data.options.task.status}
          data-testid="status-radio"
        />
      </Formhelper>
    );
    
    // Click on the "completed" option
    const completedRadio = screen.getByLabelText(/completed/i);
    fireEvent.click(completedRadio);
    
    await waitFor(() => {
      expect(completedRadio).toBeChecked();
    });
  });

  it("renders options in a row when row prop is true", () => {
    const data = testData();
    render(
      <Formhelper item={{}} option={data.options}>
        <Radio
          name="status"
          label="Status"
          optionsRadio={data.options.task.status}
          row={true}
          data-testid="status-radio"
        />
      </Formhelper>
    );
    
    const radioGroup = screen.getByTestId('status-radio');
    expect(radioGroup).toBeVisible();
    
    // Check that all options are rendered
    expect(screen.getByText(/pending/i)).toBeVisible();
    expect(screen.getByText(/in progress/i)).toBeVisible();
    expect(screen.getByText(/completed/i)).toBeVisible();
    expect(screen.getByText(/cancelled/i)).toBeVisible();
  });

  it("calls onChange prop if provided", async () => {
    const data = testData();
    const handleChange = vi.fn();
    render(
      <Formhelper item={{}} option={data.options}>
        <Radio
          name="status"
          label="Status"
          optionsRadio={data.options.task.status}
          data-testid="status-radio"
          onChange={handleChange}
        />
      </Formhelper>
    );
    
    // Click on the "completed" option
    const completedRadio = screen.getByLabelText(/completed/i);
    fireEvent.click(completedRadio);
    
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders with label", () => {
    const data = testData();
    render(
      <Formhelper item={{}} option={data.options}>
        <Radio
          name="status"
          label="Task Status"
          optionsRadio={data.options.task.status}
          data-testid="status-radio"
        />
      </Formhelper>
    );
    
    expect(screen.getByText('Task Status')).toBeVisible();
  });

  it("renders without label", () => {
    const data = testData();
    render(
      <Formhelper item={{}} option={data.options}>
        <Radio
          name="status"
          optionsRadio={data.options.task.status}
          data-testid="status-radio"
        />
      </Formhelper>
    );
    
    // Should not have a label
    expect(screen.queryByText('Status')).not.toBeInTheDocument();
    
    // But should still render the radio options
    expect(screen.getByText(/pending/i)).toBeVisible();
  });

  it("handles multiple radio groups on the same form", () => {
    const data = testData();
    render(
      <Formhelper item={data.item} option={data.options}>
        <Radio
          name="status"
          label="Status"
          optionsRadio={data.options.task.status}
          data-testid="status-radio"
        />
        <Radio
          name="priority"
          label="Priority"
          optionsRadio={data.options.task.priority}
          data-testid="priority-radio"
        />
      </Formhelper>
    );
    
    // Check that both radio groups are rendered
    const statusRadioGroup = screen.getByTestId('status-radio');
    const priorityRadioGroup = screen.getByTestId('priority-radio');
    
    expect(statusRadioGroup).toBeVisible();
    expect(priorityRadioGroup).toBeVisible();
    
    // Check that the correct options are selected
    const statusSelected = statusRadioGroup.querySelector('input[type="radio"]:checked');
    const prioritySelected = priorityRadioGroup.querySelector('input[type="radio"]:checked');
    
    expect(statusSelected).toHaveValue('1'); // in progress
    expect(prioritySelected).toHaveValue('2'); // high
  });

  it("handles empty value selection", async () => {
    const data = testData();
    render(
      <Formhelper item={{}} option={data.options}>
        <Radio
          name="status"
          label="Status"
          optionsRadio={data.options.task.status}
          data-testid="status-radio"
        />
      </Formhelper>
    );
    
    // Initially no option should be selected
    const radioGroup = screen.getByTestId('status-radio');
    const selectedRadio = radioGroup.querySelector('input[type="radio"]:checked');
    expect(selectedRadio).toBeNull();
    
    // Click on an option
    const pendingRadio = screen.getByLabelText(/pending/i);
    fireEvent.click(pendingRadio);
    
    await waitFor(() => {
      expect(pendingRadio).toBeChecked();
    });
  });

  it("handles disabled state", () => {
    const data = testData();
    render(
      <Formhelper item={{}} option={data.options}>
        <Radio
          name="status"
          label="Status"
          optionsRadio={data.options.task.status}
          data-testid="status-radio"
          disabled
        />
      </Formhelper>
    );
    
    const radioGroup = screen.getByTestId('status-radio');
    const radioInputs = radioGroup.querySelectorAll('input[type="radio"]');
    
    // All radio inputs should be disabled
    radioInputs.forEach(input => {
      expect(input).toBeDisabled();
    });
  });

  it("handles readOnly state", () => {
    const data = testData();
    render(
      <Formhelper item={{}} option={data.options}>
        <Radio
          name="status"
          label="Status"
          optionsRadio={data.options.task.status}
          data-testid="status-radio"
          readOnly
        />
      </Formhelper>
    );
    
    const radioGroup = screen.getByTestId('status-radio');
    const radioInputs = radioGroup.querySelectorAll('input[type="radio"]');
    
    // All radio inputs should be read-only
    radioInputs.forEach(input => {
      expect(input).toHaveAttribute('readonly');
    });
  });

  it("handles form validation errors", async () => {
    // This test would require setting up form validation rules
    // For now, just test that the component renders with validation props
    const data = testData();
    render(
      <Formhelper item={{}} option={data.options}>
        <Radio
          name="status"
          label="Status"
          optionsRadio={data.options.task.status}
          data-testid="status-radio"
        />
      </Formhelper>
    );
    
    const radioGroup = screen.getByTestId('status-radio');
    expect(radioGroup).toBeVisible();
  });

  it("handles options with different value types", () => {
    const mixedOptions = [
      { key: 0, value: "0", text: "zero" },
      { key: 1, value: 1, text: "one" },
      { key: 2, value: "two", text: "two" },
      { key: 3, value: true, text: "true" },
    ];
    
    render(
      <Formhelper item={{ status: "1" }} option={{}}>
        <Radio
          name="status"
          label="Mixed Types"
          optionsRadio={mixedOptions}
          data-testid="mixed-radio"
        />
      </Formhelper>
    );
    
    const radioGroup = screen.getByTestId('mixed-radio');
    expect(radioGroup).toBeVisible();
    
    // Check that all options are rendered
    expect(screen.getByText(/zero/i)).toBeVisible();
    expect(screen.getByText(/one/i)).toBeVisible();
    expect(screen.getByText(/two/i)).toBeVisible();
    expect(screen.getByText(/true/i)).toBeVisible();
  });

  it("handles large number of options", () => {
    const manyOptions = Array.from({ length: 20 }, (_, i) => ({
      key: i,
      value: i.toString(),
      text: `Option ${i + 1}`
    }));
    
    render(
      <Formhelper item={{}} option={{}}>
        <Radio
          name="many"
          label="Many Options"
          optionsRadio={manyOptions}
          data-testid="many-radio"
        />
      </Formhelper>
    );
    
    const radioGroup = screen.getByTestId('many-radio');
    expect(radioGroup).toBeVisible();
    
    // Check that some options are rendered
    expect(screen.getByText(/Option 1/i)).toBeVisible();
    expect(screen.getByText(/Option 10/i)).toBeVisible();
    expect(screen.getByText(/Option 20/i)).toBeVisible();
  });
}); 