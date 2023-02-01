import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "processes/http";

export const fetchCategories = createAsyncThunk<ICategoriesState, void, { rejectValue: string }>(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await $api.get("api/category");
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

type CategoriesStatusType = 'fulfilled' | 'pending' | 'rejected';

export interface ICategoriesState {
  categories: { id: number, name: string }[];
  categoriesStatus: CategoriesStatusType
}

const initialState: ICategoriesState = {
  categories: [],
  categoriesStatus: 'pending'
};

export const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload as any;
        state.categoriesStatus = 'fulfilled';
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = 'pending';
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = 'rejected';
      });
  }
});

export default categoriesSlice.reducer;