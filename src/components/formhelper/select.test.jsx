import { TestHarness } from "./test/testHarness";
import { Input, Row } from "components";

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

  it("loads with initial selected value", async () => {
    const data = testData();
    render(
      <TestHarness item={data.item}>
        <Row>
          <Input
            name="status"
            label="Status"
            select
            options={data.options.task.status}
            data-testid="status-select"
          />
        </Row>
      </TestHarness>
    );

    // Wait for the component to fully render and initialize
    await waitFor(() => {
      expect(screen.getByText('in progress')).toBeVisible();
    });
  });

  it("shows placeholder when no value is selected", () => {
    const data = testData();
    const itemWithoutStatus = { ...data.item };
    delete itemWithoutStatus.status;

    render(
      <TestHarness item={itemWithoutStatus}>
        <Row>
          <Input
            name="status"
            label="Status"
            select
            options={data.options.task.status}
            placeholder="Select a status"
            data-testid="status-select"
          />
        </Row>
      </TestHarness>
    );

    const select = screen.getByRole('combobox', { name: /status/i });
    expect(select).toHaveTextContent('Select a status');
  });

  it("shows default placeholder when no custom placeholder is provided", () => {
    const data = testData();
    const itemWithoutStatus = { ...data.item };
    delete itemWithoutStatus.status;

    render(
      <TestHarness item={itemWithoutStatus}>
        <Row>
          <Input
            name="status"
            label="Status"
            select
            options={data.options.task.status}
            data-testid="status-select"
          />
        </Row>
      </TestHarness>
    );

    const select = screen.getByRole('combobox', { name: /status/i });
    expect(select).toHaveTextContent('Please Select');
  });

  it("does not show placeholder option in dropdown when opened", async () => {
    const data = testData();
    const itemWithoutStatus = { ...data.item };
    delete itemWithoutStatus.status;

    render(
      <TestHarness item={itemWithoutStatus}>
        <Row>
          <Input
            name="status"
            label="Status"
            select
            options={data.options.task.status}
            placeholder="Select a status"
            data-testid="status-select"
          />
        </Row>
      </TestHarness>
    );

    const select = screen.getByRole('combobox', { name: /status/i });
    await user.click(select);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(screen.getByText('in progress')).toBeInTheDocument();
    expect(screen.getByText('completed')).toBeInTheDocument();
    expect(screen.getByText('cancelled')).toBeInTheDocument();
    
    const listbox = screen.getByRole('listbox');
    expect(listbox).not.toHaveTextContent('Select a status');
  });

  it("allows user to select an option", async () => {
    const data = testData();
    const itemWithoutStatus = { ...data.item };
    delete itemWithoutStatus.status;

    render(
      <TestHarness item={itemWithoutStatus}>
        <Row>
          <Input
            name="status"
            label="Status"
            select
            options={data.options.task.status}
            placeholder="Select a status"
            data-testid="status-select"
          />
        </Row>
      </TestHarness>
    );

    const select = screen.getByRole('combobox', { name: /status/i });
    await user.click(select);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    await user.click(screen.getByText('completed'));

    await waitFor(() => {
      expect(select).toHaveTextContent('completed');
    });
  });

  it("handles empty options array", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="status"
            label="Status"
            select
            options={[]}
            placeholder="Select a status"
            data-testid="status-select"
          />
        </Row>
      </TestHarness>
    );

    // When there are no options, MUI 7 renders as a text input instead of combobox
    const input = screen.getByRole('textbox', { name: /status/i });
    expect(input).toHaveAttribute('placeholder', 'Select a status');
  });

  it("calls onChange and onBlur props if provided", async () => {
    const onChange = vi.fn();
    const onBlur = vi.fn();
    const data = testData();

    render(
      <TestHarness item={data.item}>
        <Row>
          <Input
            name="status"
            label="Status"
            select
            options={data.options.task.status}
            onChange={onChange}
            onBlur={onBlur}
            data-testid="status-select"
          />
        </Row>
      </TestHarness>
    );

    const select = screen.getByRole('combobox', { name: /status/i });
    
    await user.click(select);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    await user.click(screen.getByText('cancelled'));
    expect(onChange).toHaveBeenCalled();

    await user.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  it("renders with error state", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="status"
            label="Status"
            select
            options={testData().options.task.status}
            error={{ message: "This field is required" }}
            data-testid="status-select"
          />
        </Row>
      </TestHarness>
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it("renders with info tooltip", async () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="status"
            label="Status"
            select
            options={testData().options.task.status}
            info="This is helpful information"
            data-testid="status-select"
          />
        </Row>
      </TestHarness>
    );

    // Find the help icon anywhere in the document (not just within the select container)
    const infoIcon = screen.getByTestId('IconHelpRounded');
    expect(infoIcon).toBeInTheDocument();
    
    // Click the info icon
    await user.click(infoIcon);

    // In MUI 7, the popover content might be rendered in a portal
    // Let's check if the popover is open by looking for the popover element
    await waitFor(() => {
      const popover = document.querySelector('[role="presentation"]');
      expect(popover).toBeInTheDocument();
      expect(popover).toHaveTextContent('This is helpful information');
    });
  });
});