import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import Navbar from ".";

describe("Navbar Component", () => {
  const mockToggleSidebar = jest.fn();

  it("renders the Navbar with the correct classes", () => {
    render(<Navbar toggleSidebar={mockToggleSidebar} isOpen={false} />);

    const buttonElement = screen.getByLabelText("Toggle Navigation");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toHaveClass("open");
  });

  it('applies the "open" class when isOpen is true', () => {
    render(<Navbar toggleSidebar={mockToggleSidebar} isOpen={true} />);

    const buttonElement = screen.getByLabelText("Toggle Navigation");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.querySelector(".hamburgerMenu")).toHaveClass("open");
  });

  it("calls toggleSidebar when the button is clicked", () => {
    render(<Navbar toggleSidebar={mockToggleSidebar} isOpen={false} />);

    const buttonElement = screen.getByLabelText("Toggle Navigation");
    fireEvent.click(buttonElement);
    expect(mockToggleSidebar).toHaveBeenCalled();
  });
});
