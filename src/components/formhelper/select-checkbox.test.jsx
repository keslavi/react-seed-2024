import { TestHarness } from "./test/testHarness";
import { Input } from "components";

describe("SelectCheckbox", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

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
      <TestHarness item={data.item}>
        <Input
          name="categories"
          label="Categories"
          optionsCheckbox={data.options.task.categories}
          data-testid="categories-select"
        />
      </TestHarness>
    );
    
    // Wait for the component to fully render and initialize
    await waitFor(() => {
      expect(screen.getByText(/in progress/i)).toBeVisible();
    });
  });

  it("renders with no options and does not crash", () => {
    render(
      <TestHarness item={{}}>
        <Input
          name="categories"
          label="Categories"
          optionsCheckbox={[]}
          data-testid="categories-select"
        />
      </TestHarness>
    );
    const input = screen.getByTestId('categories-select').querySelector('input');
    expect(input).toBeVisible();
    //expect(input).toHaveAttribute('placeholder', 'Please Select');
  });

  it("renders with a single option and allows selection", async () => {
    const singleOption = [{ key: 99, text: "only option" }];
    render(
      <TestHarness item={{}}>
        <Input
          name="categories"
          label="Categories"
          optionsCheckbox={singleOption}
          data-testid="categories-select"
        />
      </TestHarness>
    );
    const input = screen.getByTestId('categories-select').querySelector('input');
    
    // Click the input to open the dropdown (MUI v7 Autocomplete behavior)
    await user.click(input);

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
    });
    
    const checkbox = screen.getAllByRole('option')[0].querySelector('input[type="checkbox"]');
    await user.click(checkbox);
    
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
      <TestHarness item={{}}>
        <Input
          name="categories"
          label="Categories"
          optionsCheckbox={data.options.task.categories}
          data-testid="categories-select"
        />
      </TestHarness>
    );
    const input = screen.getByTestId('categories-select').querySelector('input');
    
    // Click the input to open the dropdown (MUI v7 Autocomplete behavior)
    await user.click(input);
    
    // Wait for the dropdown to open (MUI v7 might not set aria-expanded immediately)
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      expect(options.length).toBeGreaterThan(0);
    });
    
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      const inProgressOption = options.find(opt => opt.textContent.includes('in progress'));
      expect(inProgressOption).toBeTruthy();
    });
    
    const options = screen.getAllByRole('option');
    const inProgressOption = options.find(opt => opt.textContent.includes('in progress'));
    await user.click(inProgressOption);
    // Try clicking again to deselect
    await user.click(inProgressOption);
    expect(input).toHaveValue('');
  });

  it("calls onChange and onBlur props if provided", async () => {
    const data = testData();
    const onChange = vi.fn();
    const onBlur = vi.fn();
    render(
      <TestHarness item={{}}>
        <Input
          name="categories"
          label="Categories"
          optionsCheckbox={data.options.task.categories}
          data-testid="categories-select"
          onChange={onChange}
          onBlur={onBlur}
        />
      </TestHarness>
    );
    const input = screen.getByTestId('categories-select').querySelector('input');
    
    // Click the input to open the dropdown (MUI v7 Autocomplete behavior)
    await user.click(input);
    
    // Wait for the dropdown to open (MUI v7 might not set aria-expanded immediately)
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      expect(options.length).toBeGreaterThan(0);
    });
    
    const options = screen.getAllByRole('option');
    await user.click(options[0]);
    expect(onChange).toHaveBeenCalled();
    await user.tab(); // This will blur the input
    expect(onBlur).toHaveBeenCalled();
  });

  it("renders info and error together", async () => {
    const data = testData();
    render(
      <TestHarness item={{}}>
        <Input
          name="categories"
          label="Categories"
          optionsCheckbox={data.options.task.categories}
          data-testid="categories-select"
          info="Some info"
          error={{ message: "Some error" }}
        />
      </TestHarness>
    );
    
    // Click the info icon to open the popover
    const infoIcon = screen.getByTestId('HelpRoundedIcon');
    await user.click(infoIcon);
    
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
      <TestHarness item={{}}>
        <Input
          name="categories"
          label="Categories"
          optionsCheckbox={data.options.task.categories}
          data-testid="categories-select"
          error={{ message: "Custom error message" }}
        />
      </TestHarness>
    );
    
    // Check that the custom error message is displayed as helper text
    // Material-UI renders helper text in a p element with role="alert"
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    
    // Alternative: Check if it's rendered as helper text
    const helperText = screen.getByText('Custom error message');
    expect(helperText).toBeVisible();
  });

  it("renders with unbound prop", () => {
    const data = testData();
    render(
      <TestHarness item={{}}>
        <Input
          name="categories"
          label="Categories"
          optionsCheckbox={data.options.task.categories}
          data-testid="categories-select"
          unbound="true"
        />
      </TestHarness>
    );
    const input = screen.getByTestId('categories-select').querySelector('input');
    expect(input).toBeVisible();
  });

  it("renders with defaultvalue prop", () => {
    const data = testData();
    render(
      <TestHarness item={{}}>
        <Input
          name="categories"
          label="Categories"
          optionsCheckbox={data.options.task.categories}
          data-testid="categories-select"
          defaultvalue={[2]}
        />
      </TestHarness>
    );
    const input = screen.getByTestId('categories-select').querySelector('input');
    // The defaultvalue is not used in the component, but test that it doesn't crash
    expect(input).toBeVisible();
  });
});
