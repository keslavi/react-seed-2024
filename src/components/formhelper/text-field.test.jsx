import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Formhelper } from "./test/formhelper";
import { TextField } from "./text-field";

describe("Formhelper-TextField", () => {
  const testData = () => {
    return {
      item: {
        subject: "Test Subject",
        body: "Test Body Content",
        email: "test@example.com",
        phone: "123-456-7890",
      },
      options: {
        task: {
          // TextField doesn't use options like SelectCheckbox, but keeping structure consistent
          categories: [
            { key: 0, text: "pending" },
            { key: 1, text: "in progress" },
            { key: 2, text: "completed" },
            { key: 3, text: "cancelled" },
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
        <TextField
          name="subject"
          label="Subject"
          data-testid="subject-field"
        />
      </Formhelper>
    );
    expect(screen.getByText(/formhelper tester/i)).toBeVisible();

    const input = screen.getByTestId('subject-field').querySelector('input');
    expect(input).toHaveValue('Test Subject');
  });

  it("renders with empty value and does not crash", () => {
    render(
      <Formhelper item={{}} option={{}}>
        <TextField
          name="subject"
          label="Subject"
          data-testid="subject-field"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('subject-field').querySelector('input');
    expect(input).toBeVisible();
    expect(input).toHaveValue('');
  });

  it("allows user input and updates value", async () => {
    render(
      <Formhelper item={{}} option={{}}>
        <TextField
          name="subject"
          label="Subject"
          data-testid="subject-field"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('subject-field').querySelector('input');

    // Type in the input field
    fireEvent.change(input, { target: { value: 'New Subject' } });

    await waitFor(() => {
      expect(input).toHaveValue('New Subject');
    });
  });

  it("handles different input types", () => {
    render(
      <Formhelper item={{}} option={{}}>
        <TextField
          name="email"
          label="Email"
          type="email"
          data-testid="email-field"
        />
        <TextField
          name="phone"
          label="Phone"
          type="tel"
          data-testid="phone-field"
        />
      </Formhelper>
    );

    const emailInput = screen.getByTestId('email-field').querySelector('input');
    const phoneInput = screen.getByTestId('phone-field').querySelector('input');

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(phoneInput).toHaveAttribute('type', 'tel');
  });


  it("calls onChange and onBlur props if provided", async () => {
    const handleChange = vi.fn();
    const handleBlur = vi.fn();
    render(
      <Formhelper item={{}} option={{}}>
        <TextField
          name="subject"
          label="Subject"
          data-testid="subject-field"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Formhelper>
    );
    const input = screen.getByTestId('subject-field').querySelector('input');

    // Test onChange
    fireEvent.change(input, { target: { value: 'Test Value' } });
    expect(handleChange).toHaveBeenCalled();

    // Test onBlur
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });


  it("renders info and error together", async () => {
    render(
      <Formhelper item={{}} option={{}}>
        <TextField
          name="subject"
          label="Subject"
          data-testid="subject-field"
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
    render(
      <Formhelper item={{}} option={{}}>
        <TextField
          name="subject"
          label="Subject"
          data-testid="subject-field"
          error={{ message: "Custom error message" }}
        />
      </Formhelper>
    );

    // Check that the custom error message is displayed
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it("renders with unbound prop", () => {
    render(
      <Formhelper item={{}} option={{}}>
        <TextField
          name="subject"
          label="Subject"
          data-testid="subject-field"
          unbound="true"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('subject-field').querySelector('input');
    expect(input).toBeVisible();
  });

  it("renders with defaultvalue prop", () => {
    render(
      <Formhelper item={{}} option={{}}>
        <TextField
          name="subject"
          label="Subject"
          data-testid="subject-field"
          defaultvalue="Default Value"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('subject-field').querySelector('input');
    // The defaultvalue is not used in the component, but test that it doesn't crash
    expect(input).toBeVisible();
  });

  /*
    it("handles placeholder text", () => {
      render(
        <Formhelper item={{}} option={{}}>
          <TextField
            name="subject"
            label="Subject"
            placeholder="Enter subject here"
            data-testid="subject-field"
          />
        </Formhelper>
      );
      const input = screen.getByTestId('subject-field').querySelector('input');
      expect(input).toHaveAttribute('placeholder', 'Enter subject here');
    });
  */
  /*
    it("handles multiline text input", () => { //textarea control for this
      render(
        <Formhelper item={{}} option={{}}>
          <TextField
            name="body"
            label="Body"
            multiline
            rows={4}
            data-testid="body-field"
          />
        </Formhelper>
      );
      const input = screen.getByTestId('body-field').querySelector('textarea');
      expect(input).toBeVisible();
    });
    */

  it("handles required field validation", () => {
    render(
      <Formhelper item={{}} option={{}}>
        <TextField
          name="subject"
          label="Subject"
          required
          data-testid="subject-field"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('subject-field').querySelector('input');
    expect(input).toHaveAttribute('required');
  });

  it("handles disabled state", () => {
    render(
      <Formhelper item={{}} option={{}}>
        <TextField
          name="subject"
          label="Subject"
          disabled
          data-testid="subject-field"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('subject-field').querySelector('input');
    expect(input).toBeDisabled();
  });

  it("handles readOnly state", () => {
    render(
      <Formhelper item={{}} option={{}}>
        <TextField
          name="subject"
          label="Subject"
          InputProps={{ readOnly: true }}
          data-testid="subject-field"
        />
      </Formhelper>
    );
    const input = screen.getByTestId('subject-field').querySelector('input');
    expect(input).toHaveAttribute('readonly');
  });


  it("handles size props", () => {
    render(
      <Formhelper item={{}} option={{}}>
        <TextField
          name="subject"
          label="Subject"
          size="small"
          data-testid="subject-field-small"
        />
        <TextField
          name="body"
          label="Body"
          size="large"
          data-testid="body-field-large"
        />
      </Formhelper>
    );

    const smallInput = screen.getByTestId('subject-field-small').querySelector('input');
    const largeInput = screen.getByTestId('body-field-large').querySelector('input');

    expect(smallInput).toBeVisible();
    expect(largeInput).toBeVisible();
  });

  it("handles form validation errors", async () => {
    // This test would require setting up form validation rules
    // For now, just test that the component renders with validation props
    render(
      <Formhelper item={{}} option={{}}>
        <TextField
          name="subject"
          label="Subject"
          data-testid="subject-field"
        />
      </Formhelper>
    );

    const input = screen.getByTestId('subject-field').querySelector('input');
    expect(input).toBeVisible();
  });
}); 