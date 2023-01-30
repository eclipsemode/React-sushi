import { createAsyncThunk } from "@reduxjs/toolkit";
import { $host } from "processes/http";

interface ILogin {
  login: string,
  password: string
}

const fetchUserLogin = createAsyncThunk<void, ILogin>(
  'login/fetchLogin',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await $host.post("api/user/login", { email: login, password });
      localStorage.setItem("accessToken", response.data.user.accessToken);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export { fetchUserLogin };