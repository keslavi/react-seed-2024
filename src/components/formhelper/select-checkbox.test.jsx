import { render, screen } from "@testing-library/react";
import { Formhelper } from "./test/formhelper";

it("loads correctly", () => {
//  render(<SelectCheckbox name="sc" label="sctest" optioncheckbox={"aaa","bbb","ccc"} />);
  render(<Formhelper />);
  expect(screen.getByText(/formhelper tester/i)).toBeVisible(); 
});
