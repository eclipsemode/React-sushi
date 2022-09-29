import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $host } from "../../http";

export const fetchCategories = createAsyncThunk<ICategoriesState, void, { rejectValue: string }>(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await $host.get("api/category");
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

export interface ICategoriesState {
  categories: { id: number, name: string }[];
}

const initialState: ICategoriesState = {
  categories: []
};

export const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<any>) => {
        state.categories = action.payload;
      });
  }
});

export default categoriesSlice.reducer;