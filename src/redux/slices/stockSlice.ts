import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Stock {
  title: string;
  url: string;
  image: string;
  date: Date;
  body: HTMLBodyElement;
  source: string;
  author: string;
}

interface StocksState {
  totalStocks: Stock[]
  filteredStocks: Stock[]
  loading?: boolean
  message?: string
  error?: string
  success?: boolean
}

const initialState: StocksState = {
  totalStocks: [],
  filteredStocks: [],
  loading: false,
  message: '',
  error: '',
  success: false,
};

export const getAllStocks = createAsyncThunk(
  "stocks",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("https://dummy-rest-api.specbee.site/api/v1/news");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({
          error: error.response?.data,
        });
      } else {
        return "An error occurred";
      }
    }
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStocks.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = "";
    });
    builder.addCase(getAllStocks.fulfilled, (state, action) => {
      state.totalStocks = { ...action.payload.stocks };
      state.message = action.payload.message;
      state.success = action.payload.success;
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
      )?.error;
      state.loading = false;
      state.success = payloadError.success;
      state.error = payloadError.message;
      state.message = "";
    });
  },
});

export const stockActions = stockSlice.actions;
export default stockSlice.reducer;
