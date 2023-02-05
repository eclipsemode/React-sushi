import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchOrderCreate = createAsyncThunk(
  'order/fetchOrderCreate',
  async (_, { rejectWithValue }) => {
    try {

    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export { fetchOrderCreate }