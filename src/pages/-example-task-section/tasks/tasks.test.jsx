import { Tasks } from "./tasks";
import {MemoryRouter} from "react-router-dom";

describe("Tasks Component", () => {
  it("should display data with options", async () => {
    render(<MemoryRouter><Tasks /></MemoryRouter>);

    
    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    // Since we're using MSW, the actual API call will be intercepted
    await waitFor(() => {
      expect(screen.getByText("Tasks")).toBeInTheDocument();
    });

    const task1Link = screen.getByRole("link", { name: "1" });
    expect(task1Link).toBeInTheDocument();
    expect(task1Link).toHaveAttribute("href", "/dev/tasks/1");
    //option task.status displays
    expect(screen.getByText("pending")).toBeInTheDocument();
  });
});
