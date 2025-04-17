import { render, screen } from "@testing-library/react";
import { FormHelperTester } from "./formhelpertest";

it("renders without crashing", () => {
  render(<FormHelperTester />);
  expect(screen.getByText(/formhelper tester/i)).toBeVisible(); 
});
