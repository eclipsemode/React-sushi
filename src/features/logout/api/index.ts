import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "processes/api";
import {setAuth, setUser} from "entities/user";

const fetchUserLogout = createAsyncThunk<void, void>(
  'logout/fetchUserLogout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await $api.get('api/user/logout');
      localStorage.removeItem('accessToken');
      dispatch(setAuth(false));
      dispatch(setUser(null));
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