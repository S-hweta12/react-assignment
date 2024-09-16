import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from ".";
import { Stock } from "../../interfaces";

const mockStocks: Stock[] = [
  {
    title: "Stock 1",
    url: "/stock-1",
    image: "stock1.jpg",
    date: "2024-09-16T10:00:00.000Z",
    body: "<p>Details about stock 1.</p>",
    source: "Source 1",
    author: "Author 1",
  },
  // Add more mock stocks if needed
];

const mockHandleSearch = jest.fn();

describe("Sidebar Component", () => {
  it("renders all filter options", async () => {
    render(
      <MemoryRouter>
        <Sidebar
          isOpen={true}
          handleSearch={mockHandleSearch}
          stocks={mockStocks}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Category")).toBeInTheDocument();
      expect(screen.getByText("Author")).toBeInTheDocument();
      expect(screen.getByText("Sort By")).toBeInTheDocument();
    });
  });

  it("handles category filter change", async () => {
    render(
      <MemoryRouter>
        <Sidebar
          isOpen={true}
          handleSearch={mockHandleSearch}
          stocks={mockStocks}
        />
      </MemoryRouter>
    );

    // Simulate filter change by clicking on a checkbox
    const checkbox = screen.getByLabelText("Source 1");
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(mockHandleSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          category: ["Source 1"],
          page: 1,
        })
      );
    });
  });

  it("handles author filter change", async () => {
    render(
      <MemoryRouter>
        <Sidebar
          isOpen={true}
          handleSearch={mockHandleSearch}
          stocks={mockStocks}
        />
      </MemoryRouter>
    );

    // Simulate filter change by clicking on a checkbox
    const checkbox = screen.getByLabelText("Author 1");
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(mockHandleSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          author: ["Author 1"],
          page: 1,
        })
      );
    });
  });

  it("handles sortBy filter change", async () => {
    render(
      <MemoryRouter>
        <Sidebar
          isOpen={true}
          handleSearch={mockHandleSearch}
          stocks={mockStocks}
        />
      </MemoryRouter>
    );

    // Simulate filter change by clicking on a checkbox
    const checkbox = screen.getByLabelText("date"); // Example sortBy value
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(mockHandleSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          sort: ["date desc"],
          page: 1,
        })
      );
    });
  });
});
