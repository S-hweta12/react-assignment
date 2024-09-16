import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "./filter";
import vector from "../../assets/vector.svg";

describe("Filter Component", () => {
  const mockHandleFilter = jest.fn();

  const props = {
    label: "Test Label",
    values: ["Option 1", "Option 2"],
    handleFilter: mockHandleFilter,
    keyName: "category",
    initialFilterState: ["Option 1"],
  };

  it("renders filter options", () => {
    render(<Filter {...props} />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 2")).toBeInTheDocument();
  });

  it("toggles selection on option click", () => {
    render(<Filter {...props} />);

    // Click on "Option 2"
    fireEvent.click(screen.getByLabelText("Option 2"));

    expect(mockHandleFilter).toHaveBeenCalledWith("category", [
      "Option 1",
      "Option 2",
    ]);
  });

  it("renders correct sort order icon", () => {
    render(<Filter {...props} keyName="sortBy" />);

    // Click on "Option 1" to toggle sort order
    fireEvent.click(screen.getByLabelText("Option 1"));

    expect(screen.getByAltText("sort by icon")).toHaveAttribute("src", vector);
  });

  it("initially sets selected items from initialFilterState", () => {
    render(<Filter {...props} />);

    expect(screen.getByLabelText("Option 1")).toBeChecked();
    expect(screen.getByLabelText("Option 2")).not.toBeChecked();
  });

  it("does not render sort order icon for non-sortBy filters", () => {
    render(<Filter {...props} keyName="category" />);

    expect(screen.queryByAltText("sort by icon")).not.toBeInTheDocument();
  });
});
