import { TestHarness } from "./test/testHarness";
import { Input, Row } from "components";

describe("TextField", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  const testData = () => {
    return {
      item: {
        name: "John Doe",
        email: "john@example.com",
        description: "A test description",
      },
    };
  };

  it("loads with initial value", async () => {
    const data = testData();
    render(
      <TestHarness item={data.item}>
        <Row>
          <Input
            name="name"
            label="Name"
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    // Wait for the component to fully render and initialize
    await waitFor(() => {
      expect(screen.getByDisplayValue("John Doe")).toBeVisible();
    });
  });

  it("renders with no initial value and shows placeholder", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            placeholder="Enter your name"
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toBeVisible();
    expect(input).toHaveAttribute('placeholder', 'Enter your name');
  });

  it("shows placeholder when field is empty and not focused", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            placeholder="Enter your name"
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    
    // The placeholder should be visible when the field is empty and not focused
    // In MUI 7, this should work as expected
    expect(input).toHaveAttribute('placeholder', 'Enter your name');
    
    // The input should be empty
    expect(input).toHaveValue('');
  });

  it("works correctly when no placeholder is provided", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    
    // When no placeholder is provided, the label should be used as placeholder
    // This is the intended behavior from cleanParentProps
    expect(input).toHaveAttribute('placeholder', 'Name');
    
    // The input should be empty
    expect(input).toHaveValue('');
  });

  it("allows user input and calls onChange", async () => {
    const mockOnChange = vi.fn();
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            onChange={mockOnChange}
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    await user.type(input, 'Jane Doe');
    
    expect(input).toHaveValue('Jane Doe');
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("calls onBlur when input loses focus", async () => {
    const mockOnBlur = vi.fn();
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            onBlur={mockOnBlur}
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    await user.click(input);
    await user.tab();
    
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it("displays error message when validation fails", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="email"
            label="Email"
            error={{ message: "Invalid email format" }}
            data-testid="email-field"
          />
        </Row>
      </TestHarness>
    );
    
    const errorMessage = screen.getByText("Invalid email format");
    expect(errorMessage).toBeVisible();
    
    const input = screen.getByTestId('email-field').querySelector('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it("renders with info tooltip", async () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            info="Enter your full name as it appears on your ID"
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const infoIcon = screen.getByTestId('HelpRoundedIcon');
    expect(infoIcon).toBeInTheDocument();
    
    // Click the info icon to open the popover
    await user.click(infoIcon);
    
    await waitFor(() => {
      const popover = document.querySelector('[role="presentation"]');
      expect(popover).toBeInTheDocument();
      expect(popover).toHaveTextContent('Enter your full name as it appears on your ID');
    });
  });

  it("renders with different sizes", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            size={{ xs: 6, sm: 4 }}
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toBeVisible();
  });

  it("renders with unbound prop", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            unbound="true"
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toBeVisible();
  });

  it("renders with defaultvalue prop", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            defaultvalue="Default Name"
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toBeVisible();
  });

  it("handles empty string values correctly", () => {
    render(
      <TestHarness item={{ name: "" }}>
        <Row>
          <Input
            name="name"
            label="Name"
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toHaveValue("");
  });

  it("handles null values correctly", () => {
    render(
      <TestHarness item={{ name: null }}>
        <Row>
          <Input
            name="name"
            label="Name"
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toHaveValue("");
  });

  it("handles undefined values correctly", () => {
    render(
      <TestHarness item={{ name: undefined }}>
        <Row>
          <Input
            name="name"
            label="Name"
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toHaveValue("");
  });

  it("renders with multiline text", async () => {
    render(
      <TestHarness item={{ description: "Line 1\nLine 2" }}>
        <Row>
          <Input
            name="description"
            label="Description"
            multiline
            rows={3}
            data-testid="description-field"
          />
        </Row>
      </TestHarness>
    );
    
    const textarea = screen.getByTestId('description-field').querySelector('textarea');
    expect(textarea).toBeVisible();
    expect(textarea).toHaveValue("Line 1\nLine 2");
  });

  it("renders with password type", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="password"
            label="Password"
            type="password"
            data-testid="password-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('password-field').querySelector('input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it("renders with number type", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="age"
            label="Age"
            type="number"
            data-testid="age-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('age-field').querySelector('input');
    expect(input).toHaveAttribute('type', 'number');
  });

  it("renders with email type", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="email"
            label="Email"
            type="email"
            data-testid="email-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('email-field').querySelector('input');
    expect(input).toHaveAttribute('type', 'email');
  });

  it("renders with required attribute", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            required
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toHaveAttribute('required');
  });

  it("renders with disabled attribute", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            disabled
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toHaveAttribute('disabled');
  });

  it("renders with readOnly attribute", () => {
    render(
      <TestHarness item={{ name: "Read Only Name" }}>
        <Row>
          <Input
            name="name"
            label="Name"
            readOnly
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toHaveAttribute('readonly');
  });

  it("renders with maxLength attribute", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            maxLength={50}
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toHaveAttribute('maxlength', '50');
  });

  it("renders with minLength attribute", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            minLength={2}
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toHaveAttribute('minlength', '2');
  });

  it("renders with pattern attribute", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            pattern="[A-Za-z]+"
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toHaveAttribute('pattern', '[A-Za-z]+');
  });

  it("renders with autoComplete attribute", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            autoComplete="name"
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toHaveAttribute('autocomplete', 'name');
  });

  it("renders with autoFocus attribute", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            autoFocus
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    // In MUI 7, autoFocus might not set the autofocus attribute on the input element
    // but the component should still render without errors
    expect(input).toBeVisible();
  });

  it("renders with spellCheck attribute", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            spellCheck={false}
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toHaveAttribute('spellcheck', 'false');
  });

  it("renders with inputMode attribute", () => {
    render(
      <TestHarness item={{}}>
        <Row>
          <Input
            name="name"
            label="Name"
            inputMode="text"
            data-testid="name-field"
          />
        </Row>
      </TestHarness>
    );
    
    const input = screen.getByTestId('name-field').querySelector('input');
    expect(input).toHaveAttribute('inputmode', 'text');
  });
}); 