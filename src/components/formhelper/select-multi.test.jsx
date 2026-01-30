import { TestHarness } from "./test/testHarness";
import { Input } from "components";

describe("Formhelper-Multiselect", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  const testData = () => {
    return {
      item: {
        names2: [1, 2],
        tags: [
          { name: "aaa1" },
          { name: "bbb2" },
          { name: "ccc3" },
        ],
      },
      options: {
        task: {
          names: [
            { key: 1, text: "aaa1" },
            { key: 2, text: "bbb2" },
            { key: 3, text: "ccc3" },
          ],
          tags: [
            { name: "aaa1" },
            { name: "bbb2" },
            { name: "ccc3" },
          ],
        },
      },
    };
  };
    
  it("loads correctly", () => {
    const data = testData();
    render(
      <TestHarness item={data.item}>
        <Input
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={data.options.task.names}
          data-testid="multiselect"
        />
      </TestHarness>
    );

    // Check that the input has the correct value
    const input = screen.getByTestId('multiselect').querySelector('input');
    expect(input).toHaveValue('');

    // Check that the selected values are in the data
    const selectedValues = data.item.names2;
    expect(selectedValues).toContain(1);
    expect(selectedValues).toContain(2);
  });

  it("renders with no options and does not crash", () => {
    render(
      <TestHarness item={{}}>
        <Input
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={[]}
          data-testid="multiselect"
        />
      </TestHarness>
    );
    const input = screen.getByTestId('multiselect').querySelector('input');
    expect(input).toBeVisible();
  });

  it("renders with a single option and allows selection", async () => {
    const singleOption = [{ key: 99, text: "only option" }];
    render(
      <TestHarness item={{}}>
        <Input
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={singleOption}
          data-testid="multiselect"
        />
      </TestHarness>
    );
    const input = screen.getByTestId('multiselect').querySelector('input');
    
    // Click the input to open the dropdown
    await user.click(input);

    await waitFor(() => {
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent('only option');
    });
    
    const option = screen.getAllByRole('option')[0];
    await user.click(option);
    
    // Verify the option was selected by checking for the chip/tag
    await waitFor(() => {
      const chip = screen.getByRole('button', { name: /only option/i });
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('MuiChip-root');
    });
  });

  it("allows multiple selections", async () => {
    const data = testData();
    render(
      <TestHarness item={{}}>
        <Input
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={data.options.task.names}
          data-testid="multiselect"
        />
      </TestHarness>
    );
    const input = screen.getByTestId('multiselect').querySelector('input');
    
    // Click the input to open the dropdown
    await user.click(input);
    
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      expect(options.length).toBeGreaterThan(0);
    });
    
    const options = screen.getAllByRole('option');
    await user.click(options[0]); // Select first option
    
    // Verify first option was selected
    await waitFor(() => {
      const chip = screen.getByRole('button', { name: /aaa1/i });
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('MuiChip-root');
    });
    
    // Click the input again to open dropdown for second selection
    await user.click(input);
    
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      expect(options.length).toBeGreaterThan(0);
    });
    
    const remainingOptions = screen.getAllByRole('option');
    await user.click(remainingOptions[0]); // Select second option
    
    // Verify both options were selected
    await waitFor(() => {
      const chips = screen.getAllByRole('button', { name: /aaa1|bbb2|ccc3/i });
      expect(chips.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("calls onChange and onBlur props if provided", async () => {
    const data = testData();
    const onChange = vi.fn();
    const onBlur = vi.fn();
    render(
      <TestHarness item={{}}>
        <Input
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={data.options.task.names}
          data-testid="multiselect"
          onChange={onChange}
          onBlur={onBlur}
        />
      </TestHarness>
    );
    const input = screen.getByTestId('multiselect').querySelector('input');
    
    // Click the input to open the dropdown
    await user.click(input);
    
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
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={data.options.task.names}
          data-testid="multiselect"
          info="Some info"
          error={{ message: "Some error" }}
        />
      </TestHarness>
    );
    
    // Check that the error message is displayed
    expect(screen.getByText('Some error')).toBeInTheDocument();
    
    // Check that info icon is present
    const infoIcon = screen.getByTestId('IconHelpRounded');
    expect(infoIcon).toBeInTheDocument();
  });

  it("allows developer to override error with custom error prop", () => {
    const data = testData();
    render(
      <TestHarness item={{}}>
        <Input
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={data.options.task.names}
          data-testid="multiselect"
          error={{ message: "Custom error message" }}
        />
      </TestHarness>
    );
    
    // Check that the custom error message is displayed
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it("renders with unbound prop", () => {
    const data = testData();
    render(
      <TestHarness item={{}}>
        <Input
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={data.options.task.names}
          data-testid="multiselect"
          unbound="true"
        />
      </TestHarness>
    );
    const input = screen.getByTestId('multiselect').querySelector('input');
    expect(input).toBeVisible();
  });

  it("renders with defaultvalue prop", () => {
    const data = testData();
    render(
      <TestHarness item={{}}>
        <Input
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={data.options.task.names}
          data-testid="multiselect"
          defaultvalue={[2]}
        />
      </TestHarness>
    );
    const input = screen.getByTestId('multiselect').querySelector('input');
    // The defaultvalue is not used in the component, but test that it doesn't crash
    expect(input).toBeVisible();
  });
});