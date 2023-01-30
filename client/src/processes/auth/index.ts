import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $authHost } from "processes/http";
import { setAuth, setUser } from "entities/userSlice";

// const accessToken = localStorage.getItem("accessToken")
//   ? localStorage.getItem("accessToken")
//   : null;

interface IInitialState {
  loading: boolean,
  error: any,
}

const initialState: IInitialState = {
  loading: false,
  error: null,
};

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await $authHost.get('api/user/refresh');
      localStorage.setItem('accessToken', response.data.accessToken)
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user))
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAuth.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default userAuthSlice.reducer;