import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formhelper } from "./test/formhelper";
import { SelectMulti } from "./select-multi";

//note, not using mock here, but rather a formhelpertest component that uses the multiselect component.
// this is a good way to test the component in a more realistic scenario.
// also allows user to directly bench test.

describe("Formhelper-Multiselect", () => {
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
      <Formhelper
        item={data.item}
        option={data.options}
      >
        <SelectMulti
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={data.options.task.names}
          data-testid="multiselect"
        />
      </Formhelper>
    );

    // Check that the input has the correct value
    const input = screen.getByTestId('multiselect').querySelector('input');
    expect(input).toHaveValue('');

    // Check that the selected values are in the data
    const selectedValues = data.item.names2;
    expect(selectedValues).toContain(1);
    expect(selectedValues).toContain(2);
  });
});