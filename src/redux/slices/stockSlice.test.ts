import { configureStore } from "@reduxjs/toolkit";
import stockReducer, { getAllStocks, setFilteredStocks } from "./stockSlice";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("stocksSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        stocks: stockReducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  });

  it("should return the initial state", () => {
    const initialState = {
      totalStocks: [],
      filteredStocks: [],
      filteredTotalPage: 0,
      loading: false,
      message: "",
      error: "",
      success: false,
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 20,
      totalPage: 1,
    };
    expect(store.getState().stocks).toEqual(initialState);
  });

  it("should handle setFilteredStocks", () => {
    const payload = {
      stocks: [{ title: "Stock 1" }],
      page: 2,
      itemsPerPage: 10,
      totalItems: 50,
      totalPage: 5,
      filteredTotalPage: 3,
    };

    store.dispatch(setFilteredStocks(payload));

    const state = store.getState().stocks;
    expect(state.filteredStocks).toEqual(payload.stocks);
    expect(state.currentPage).toEqual(payload.page);
    expect(state.itemsPerPage).toEqual(payload.itemsPerPage);
    expect(state.totalItems).toEqual(payload.totalItems);
    expect(state.totalPage).toEqual(payload.totalPage);
    expect(state.filteredTotalPage).toEqual(payload.filteredTotalPage);
  });

  it("should handle getAllStocks.pending", () => {
    store.dispatch(getAllStocks.pending(""));
    const state = store.getState().stocks;
    expect(state.loading).toBe(true);
    expect(state.message).toBe("");
    expect(state.error).toBe("");
  });

  it("should handle getAllStocks.fulfilled", async () => {
    const mockData = {
      data: [{ title: "Stock 1" }],
      message: "Success",
      success: true,
    };
    mockedAxios.get.mockResolvedValueOnce(mockData);

    await store.dispatch(getAllStocks());

    const state = store.getState().stocks;
    expect(state.totalStocks).toEqual(mockData.data);
    expect(state.message).toEqual(mockData.message);
    expect(state.success).toBe(mockData.success);
    expect(state.loading).toBe(false);
  });

  it("should handle getAllStocks.rejected", async () => {
    const error = {
      response: {
        data: {
          message: "Error",
          success: false,
        },
      },
    };
    mockedAxios.get.mockRejectedValueOnce(error);

    await store.dispatch(getAllStocks());

    const state = store.getState().stocks;
    expect(state.error).toEqual(error.response.data.message);
    expect(state.success).toBe(false);
    expect(state.loading).toBe(false);
  });
});
