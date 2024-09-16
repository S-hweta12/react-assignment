import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";   
import Navbar from ".";

describe("Navbar component", () => {
  const toggleSidebarMock = jest.fn();

  const setup = (isOpen: boolean) => {
    return render(<Navbar toggleSidebar={toggleSidebarMock} isOpen={isOpen} />);
  };

  beforeEach(() => {
    toggleSidebarMock.mockClear();
  });

  it("renders the Navbar component", () => {
    const { getByRole } = setup(false);
    const button = getByRole("button", { name: /Toggle Navigation/i });

    expect(button).toBeInTheDocument();
  });

  it("shows hamburger menu in closed state when isOpen is false", () => {
    const { container } = setup(false);

    const hamburgerMenu = container.querySelector(".hamburgerMenu");
    expect(hamburgerMenu).not.toHaveClass("open");
  });

  it("shows hamburger menu in open state when isOpen is true", () => {
    const { container } = setup(true);

    const hamburgerMenu = container.querySelector(".hamburgerMenu");
    expect(hamburgerMenu).toHaveClass("open");
  });

  it("calls toggleSidebar when the button is clicked", () => {
    const { getByRole } = setup(false);

    const button = getByRole("button", { name: /Toggle Navigation/i });
    fireEvent.click(button);

    expect(toggleSidebarMock).toHaveBeenCalledTimes(1);
  });

  it("should render three span elements inside the hamburger menu", () => {
    const { container } = setup(false);

    const spans = container.querySelectorAll(".hamburgerMenu span");
    expect(spans.length).toBe(3);
  });
});
