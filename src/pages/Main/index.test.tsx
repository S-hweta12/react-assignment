import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { render } from "../../JestReduxWrapper";
import "@testing-library/jest-dom/extend-expect";
import App from ".";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../redux/store", () => ({
  ...jest.requireActual("../../redux/store"),
  useAppDispatch: () => jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockAppState = {
  Stock: {
    filteredStocks: [],
    totalStocks: [],
    loading: false,
    filteredTotalPage: 1,
    itemsPerPage: 5,
    currentPage: 1,
  },
};

beforeEach(() => {
  (require("../../redux/store").useAppSelector as jest.Mock).mockImplementation((selector) => selector(mockAppState));
});

describe("App Component", () => {
  const renderWithRouterAndRedux = (route: string) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
  };

  it("renders the Sidebar, StockCards, and Pagination when stocks are available", async () => {
    mockAppState.Stock.filteredStocks = [
      {
        title: "Stock 1",
        url: "http://example.com/stock1",
        image: "http://example.com/image1.jpg",
        date: "2024-09-16",
        body: "Description of Stock 1",
        source: "Source 1",
        author: "Author 1",
      },
    ];
    mockAppState.Stock.loading = false;

    renderWithRouterAndRedux("/stocks");

    await waitFor(() => expect(screen.getByText("Stock 1")).toBeInTheDocument());

    expect(screen.getByText("Source 1")).toBeInTheDocument();
    expect(screen.getByText("Author 1")).toBeInTheDocument();
  });
});
