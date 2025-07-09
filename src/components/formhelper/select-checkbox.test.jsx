import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Formhelper } from "./test/formhelper";
import { SelectCheckbox } from "./select-checkbox";

describe("Formhelper-SelectCheckbox", () => {
  const testData = () => {
    return {
      item: {
        categories: [1, 3], // selected categories: "in progress" and "cancelled"
        tags: [0, 2],       // selected tags: "whoops" and "not good"
      },
      options: {
        task: {
          categories: [
            { key: 0, text: "pending" },
            { key: 1, text: "in progress" },
            { key: 2, text: "completed" },
            { key: 3, text: "cancelled" },
          ],
          tags: [
            { key: 0, text: "whoops" },
            { key: 1, text: "good" },
            { key: 2, text: "not good" },
            { key: 3, text: "who knows" },
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
        <SelectCheckbox
          name="categories"
          label="Categories"
          optionscheckbox={data.options.task.categories}
          data-testid="categories-select"
        />
      </Formhelper>
    );
    expect(screen.getByText(/formhelper tester/i)).toBeVisible();
    
    expect(screen.getByText(/in progress/i)).toBeVisible();
  });

  it("renders with no options and does not crash", () => {
    render(
      <Formhelper item={{}} option={{}}>
        <SelectCheckbox
          name="categories"
          label="Categories"
          optionscheckbox={[]}
          data-testid="categories-select"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('categories-select').querySelector('input');
    expect(input).toBeVisible();
    //expect(input).toHaveAttribute('placeholder', 'Please Select');
  });
  it("renders with a single option and allows selection", async () => {
    const singleOption = [{ key: 99, text: "only option" }];
    render(
      <Formhelper item={{}} option={{singleOption}}>
        <SelectCheckbox
          name="categories"
          label="Categories"
          optionscheckbox={singleOption}
          data-testid="categories-select"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('categories-select').querySelector('input');
    
    // Click the dropdown arrow button to open the dropdown
    const dropdownButton = screen.getByRole('button', { name: /open/i });
    fireEvent.click(dropdownButton);

    // Add a 2-second delay for debugging
    // await new Promise(resolve => setTimeout(resolve, 2000));
    //  screen.debug();
    
    await waitFor(() => {
      // MUI Autocomplete renders options as li elements with role="option"
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent('only option');
      
      // Click the checkbox input inside the option to select it
      const checkbox = options[0].querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
      fireEvent.click(checkbox);
    });
    
    // Verify the option was selected by checking for the chip/tag
    await waitFor(() => {
      const chip = screen.getByRole('button', { name: /only option/i });
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('MuiChip-root');
    });
    
    // Verify the input placeholder is now empty (indicating selection)
    expect(input).toHaveAttribute('placeholder', '');
  });

  it("does not allow duplicate selection", async () => {
    const data = testData();
    render(
      <Formhelper item={{}} option={data.options}>
        <SelectCheckbox
          name="categories"
          label="Categories"
          optionscheckbox={data.options.task.categories}
          data-testid="categories-select"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('categories-select').querySelector('input');
    
    // Click the dropdown arrow button to open the dropdown
    const dropdownButton = screen.getByRole('button', { name: /open/i });
    fireEvent.click(dropdownButton);
    
    // Wait for the dropdown to open
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
    
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      const inProgressOption = options.find(opt => opt.textContent.includes('in progress'));
      fireEvent.click(inProgressOption);
      // Try clicking again to deselect
      fireEvent.click(inProgressOption);
    });
    expect(input).toHaveValue('');
  });

  it("calls onChange and onBlur props if provided", async () => {
    const data = testData();
    const handleChange = vi.fn();
    const handleBlur = vi.fn();
    render(
      <Formhelper item={{}} option={data.options}>
        <SelectCheckbox
          name="categories"
          label="Categories"
          optionscheckbox={data.options.task.categories}
          data-testid="categories-select"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Formhelper>
    );
    const input = screen.getByTestId('categories-select').querySelector('input');
    
    // Click the dropdown arrow button to open the dropdown
    const dropdownButton = screen.getByRole('button', { name: /open/i });
    fireEvent.click(dropdownButton);
    
    // Wait for the dropdown to open
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
    
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      fireEvent.click(options[0]);
    });
    expect(handleChange).toHaveBeenCalled();
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it("renders info and error together", async () => {
    const data = testData();
    render(
      <Formhelper item={{}} option={data.options}>
        <SelectCheckbox
          name="categories"
          label="Categories"
          optionscheckbox={data.options.task.categories}
          data-testid="categories-select"
          info="Some info"
          error={{ message: "Some error" }}
        />
      </Formhelper>
    );
    
    // Click the info icon to open the popover
    const infoIcon = screen.getByTestId('HelpRoundedIcon');
    fireEvent.click(infoIcon);
    
    // Wait for the popover to open and check for info text
    await waitFor(() => {
      expect(screen.getByText('Some info')).toBeInTheDocument();
    });
    
    // Check for error text (this should be visible without clicking)
    expect(screen.getByText('Some error')).toBeInTheDocument();
  });

  it("allows developer to override error with custom error prop", () => {
    const data = testData();
    render(
      <Formhelper item={{}} option={data.options}>
        <SelectCheckbox
          name="categories"
          label="Categories"
          optionscheckbox={data.options.task.categories}
          data-testid="categories-select"
          error={{ message: "Custom error message" }}
        />
      </Formhelper>
    );
    
    // Check that the custom error message is displayed
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it("renders with unbound prop", () => {
    const data = testData();
    render(
      <Formhelper item={{}} option={data.options}>
        <SelectCheckbox
          name="categories"
          label="Categories"
          optionscheckbox={data.options.task.categories}
          data-testid="categories-select"
          unbound="true"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('categories-select').querySelector('input');
    expect(input).toBeVisible();
  });

  it("renders with defaultvalue prop", () => {
    const data = testData();
    render(
      <Formhelper item={{}} option={data.options}>
        <SelectCheckbox
          name="categories"
          label="Categories"
          optionscheckbox={data.options.task.categories}
          data-testid="categories-select"
          defaultvalue={[2]}
        />
      </Formhelper>
    );
    const input = screen.getByTestId('categories-select').querySelector('input');
    // The defaultvalue is not used in the component, but test that it doesn't crash
    expect(input).toBeVisible();
  });
});
