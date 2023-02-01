import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "processes/http";

const fetchUserLogout = createAsyncThunk<void, void>(
  'logout/fetchUserLogout',
  async (_, { rejectWithValue }) => {
    try {
      await $api.get('api/user/logout');
      localStorage.removeItem('accessToken');
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export { fetchUserLogout };