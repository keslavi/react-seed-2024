import { render, screen } from "@testing-library/react";
import { FormHelperTester } from "./test/formhelpertest";

import { SelectCheckbox } from "./select-checkbox";
it("loads correctly", () => {
//  render(<SelectCheckbox name="sc" label="sctest" optioncheckbox={"aaa","bbb","ccc"} />);
  render(<FormHelperTester />);
  expect(screen.getByText(/formhelper tester/i)).toBeVisible(); 
});
