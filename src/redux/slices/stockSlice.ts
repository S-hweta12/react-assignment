import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StocksState } from "../../interfaces";

const initialState: StocksState = {
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

export const getAllStocks = createAsyncThunk(
  "stocks/getAllStocks",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://dummy-rest-api.specbee.site/api/v1/news"
      );
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({
          error: error.response?.data || {
            message: "An error occurred",
            success: false,
          },
        });
      } else {
        return thunkAPI.rejectWithValue({
          error: { message: "Error", success: false },
        });
      }
    }
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setFilteredStocks: (state, action) => {
      state.filteredStocks = [...action.payload.stocks];
      state.currentPage = action.payload.page;
      state.itemsPerPage = action.payload.itemsPerPage;
      state.totalItems = action.payload.totalItems;
      state.totalPage = action.payload.totalPage;
      state.filteredTotalPage = action.payload.filteredTotalPage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllStocks.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = "";
    });
    builder.addCase(getAllStocks.fulfilled, (state, action) => {
      state.totalStocks = [...action.payload];
      state.message = action.payload.message || "Success";
      state.success = action.payload.success || true;
      state.loading = false;
    });
    builder.addCase(getAllStocks.rejected, (state, action) => {
      const payloadError = (
        action.payload as {
          error: {
            message: string;
            success: boolean;
          };
        }
      )?.error || { message: "An unknown error occurred", success: false };
      state.loading = false;
      state.success = payloadError.success;
      state.error = payloadError.message;
      state.message = "";
    });
  },
});

export const { setFilteredStocks } = stockSlice.actions;
export default stockSlice.reducer;
