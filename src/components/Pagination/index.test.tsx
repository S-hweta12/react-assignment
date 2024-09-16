import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Pagination from ".";

describe("Pagination component", () => {
  const onPageChangeMock = jest.fn();

  const setup = (currentPage: number, totalPages: number) => {
    return render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChangeMock}
      />
    );
  };

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  it("renders pagination buttons", () => {
    const { getByText } = setup(2, 5);

    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
  });

  it("calls onPageChange when a page number is clicked", () => {
    const { getByText } = setup(2, 5);

    fireEvent.click(getByText("3"));
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it("does not call onPageChange if previous button is clicked on first page", () => {
    const { getByText } = setup(1, 5);

    fireEvent.click(getByText("<"));
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it("calls onPageChange when next button is clicked", () => {
    const { getByText } = setup(2, 5);

    fireEvent.click(getByText(">"));
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it("does not call onPageChange if next button is clicked on last page", () => {
    const { getByText } = setup(5, 5);

    fireEvent.click(getByText(">"));
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it("disables the previous button on the first page", () => {
    const { getByText } = setup(1, 5);

    const prevButton = getByText("<");
    expect(prevButton).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    const { getByText } = setup(5, 5);

    const nextButton = getByText(">");
    expect(nextButton).toBeDisabled();
  });

  it("renders correct page numbers when currentPage is the first page", () => {
    const { getByText, queryByText } = setup(1, 5);

    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(queryByText("4")).not.toBeInTheDocument(); 
  });

  it("renders correct page numbers when currentPage is the last page", () => {
    const { getByText } = setup(5, 5);

    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
  });

  it("renders correct page numbers when currentPage is a middle page", () => {
    const { getByText } = setup(3, 5);

    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument();
  });

  it("handles single page case correctly", () => {
    const { getByText } = setup(1, 1);

    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("<")).toBeDisabled();
    expect(getByText(">")).toBeDisabled();
  });
});
