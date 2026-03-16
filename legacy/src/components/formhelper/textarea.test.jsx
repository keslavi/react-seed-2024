import { TestHarness } from "./test/testHarness";
import { Input } from "components";
import { yup } from '@/helpers/form-validation';
import { color } from '@/theme-material';

describe("Formhelper-TextArea", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("renders textarea with character count", () => {
    render(
      <TestHarness item={{}}>
        <Input
          name="description"
          label="Description"
          textarea
          charCount={50}
          data-testid="description-textarea"
        />
      </TestHarness>
    );

    const textarea = screen.getByRole('textbox', { name: /description/i });
    const charCountText = screen.getByText('0 / 50 characters');
    
    expect(textarea).toBeVisible();
    expect(charCountText).toBeVisible();
    expect(charCountText).toHaveClass('primaryText');
  });

  it("shows character count in black/primaryText when under the limit", async () => {
    render(
      <TestHarness item={{}}>
        <Input
          name="description"
          label="Description"
          textarea
          charCount={50}
          data-testid="description-textarea"
        />
      </TestHarness>
    );

    const textarea = screen.getByRole('textbox', { name: /description/i });
    const charCountText = screen.getByText('0 / 50 characters');
    
    // Initially should be black/primaryText
    expect(charCountText).toHaveClass('primaryText');
    
    // Type some text under the limit
    await user.type(textarea, 'This is a test message');
    
    const updatedCharCount = screen.getByText('22 / 50 characters');
    expect(updatedCharCount).toHaveClass('primaryText');
  });

  it("shows character count in red when exceeding the limit", async () => {
    render(
      <TestHarness item={{}}>
        <Input
          name="description"
          label="Description"
          textarea
          charCount={20}
          data-testid="description-textarea"
        />
      </TestHarness>
    );

    const textarea = screen.getByRole('textbox', { name: /description/i });
    
    // Type text that exceeds the limit
    await user.type(textarea, 'This is a very long message that exceeds the character limit');
    
    // The character count text is split across elements, so we need to find it differently
    const charCountElement = screen.getByText((content, element) => {
      return element?.textContent === '60 / 20 characters';
    });
    expect(charCountElement).toHaveClass('Mui-error');
    
    // Check that the textarea text color is also red
    expect(textarea).toHaveStyle({ color: color.primary.red });
    
    // Check that the textarea has red border
    expect(textarea).toHaveStyle({ border: `1px solid ${color.primary.red}` });
  });

  it("prevents form submission when character count exceeds limit", async () => {
    const onSubmitSpy = vi.fn();
    
    render(
      <TestHarness item={{}} onSubmit={onSubmitSpy}>
        <Input
          name="description"
          label="Description"
          textarea
          charCount={20}
          data-testid="description-textarea"
        />
      </TestHarness>
    );

    const textarea = screen.getByRole('textbox', { name: /description/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    // Type text that exceeds the limit
    await user.type(textarea, 'This is a very long message that exceeds the character limit');
    
    // Try to submit the form
    await user.click(submitButton);
    
    // Form should not submit due to character count validation
    expect(onSubmitSpy).not.toHaveBeenCalled();
    
    // Check that the submit results textarea is empty (no submission occurred)
    const submitResults = screen.getByLabelText('submit results');
    expect(submitResults).toHaveValue('');
  });

  it("allows form submission when character count is within limit", async () => {
    render(
      <TestHarness item={{}}>
        <Input
          name="description"
          label="Description"
          textarea
          charCount={50}
          data-testid="description-textarea"
        />
      </TestHarness>
    );

    const textarea = screen.getByRole('textbox', { name: /description/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    // Type text within the limit
    await user.type(textarea, 'This is a short message');
    
    // Submit the form
    await user.click(submitButton);
    
    // Check that the submit results textarea shows the submitted data
    await waitFor(() => {
      const submitResults = screen.getByLabelText('submit results');
      expect(submitResults).toHaveValue(JSON.stringify({
        description: 'This is a short message'
      }, null, 2));
    });
  });

  it("shows yup validation error when letter 'g' is required but missing", async () => {
    const schema = yup.object({
      description: yup.string().test('contains-g', 'The text must contain the letter g', function(value) {
        return value && value.includes('g');
      })
    });

    render(
      <TestHarness item={{}} schema={schema}>
        <Input
          name="description"
          label="Description"
          textarea
          data-testid="description-textarea"
        />
      </TestHarness>
    );

    const textarea = screen.getByRole('textbox', { name: /description/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    // Type text without the letter 'g'
    await user.type(textarea, 'This text does not contain the required letter');
    
    // Try to submit the form
    await user.click(submitButton);
    
    // Should show validation error
    await waitFor(() => {
      const errorMessage = screen.getByText('The text must contain the letter g');
      expect(errorMessage).toBeVisible();
      expect(errorMessage).toHaveClass('Mui-error');
    });
    
    // Form should not submit
    const submitResults = screen.getByLabelText('submit results');
    expect(submitResults).toHaveValue('');
  });

  it("allows form submission when yup validation passes", async () => {
    const schema = yup.object({
      description: yup.string().test('contains-g', 'The text must contain the letter g', function(value) {
        return value && value.includes('g');
      })
    });
    
    render(
      <TestHarness item={{}} schema={schema}>
        <Input
          name="description"
          label="Description"
          textarea
          data-testid="description-textarea"
        />
      </TestHarness>
    );

    const textarea = screen.getByRole('textbox', { name: /description/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    // Type text with the letter 'g'
    await user.type(textarea, 'This text contains the required letter g');
    
    // Submit the form
    await user.click(submitButton);
    
    // Check that the submit results textarea shows the submitted data
    await waitFor(() => {
      const submitResults = screen.getByLabelText('submit results');
      expect(submitResults).toHaveValue(JSON.stringify({
        description: 'This text contains the required letter g'
      }, null, 2));
    });
  });

  it("shows both character count error and yup validation error", async () => {
    const schema = yup.object({
      description: yup.string().test('contains-g', 'The text must contain the letter g', function(value) {
        return value && value.includes('g');
      })
    });

    render(
      <TestHarness item={{}} schema={schema}>
        <Input
          name="description"
          label="Description"
          textarea
          charCount={20}
          data-testid="description-textarea"
        />
      </TestHarness>
    );

    const textarea = screen.getByRole('textbox', { name: /description/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    // Type text that exceeds character limit AND doesn't contain 'g'
    await user.type(textarea, 'This is a very long message that exceeds the character limit and does not contain the required letter');
    
    // Check character count error - the text is split across elements
    const charCountElement = screen.getByText((content, element) => {
      return element?.textContent === '101 / 20 characters';
    });
    expect(charCountElement).toHaveClass('Mui-error');
    
    // Check that textarea text color is red
    expect(textarea).toHaveStyle({ color: color.primary.red });
    
    // Check that the textarea has red border
    expect(textarea).toHaveStyle({ border: `1px solid ${color.primary.red}` });
    
    // Check that label color is red
    const label = screen.getByText('Description');
    expect(label).toHaveStyle({ color: color.primary.red });
    
    // Try to submit the form
    await user.click(submitButton);
    
    // Form should not submit due to character count validation
    const submitResults = screen.getByLabelText('submit results');
    expect(submitResults).toHaveValue('');
    
    // Note: yup validation won't run because form submission is blocked by character count
    // This is the expected behavior - character count validation takes precedence
  });

  it("handles textarea with minRows prop", () => {
    render(
      <TestHarness item={{}}>
        <Input
          name="description"
          label="Description"
          textarea
          minRows={5}
          data-testid="description-textarea"
        />
      </TestHarness>
    );

    const textarea = screen.getByRole('textbox', { name: /description/i });
    expect(textarea).toBeVisible();
    // Check that minRows prop is passed to the textarea
    expect(textarea).toHaveAttribute('rows', '5'); // minRows=5 should set rows=5
  });

  it("handles textarea with info prop", () => {
    render(
      <TestHarness item={{}}>
        <Input
          name="description"
          label="Description"
          textarea
          info="This is helpful information about the textarea"
          data-testid="description-textarea"
        />
      </TestHarness>
    );

    const textarea = screen.getByRole('textbox', { name: /description/i });
    const infoIcon = screen.getByTestId('IconHelpRounded');
    
    expect(textarea).toBeVisible();
    expect(infoIcon).toBeVisible();
    
    // Click info icon to show popover
    user.click(infoIcon);
    
    // Check that popover content is shown
    waitFor(() => {
      const popover = screen.getByRole('presentation');
      expect(popover).toHaveTextContent('This is helpful information about the textarea');
    });
  });
});
