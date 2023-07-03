import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "@services/api";

type CategoriesStatusType = 'fulfilled' | 'pending' | 'rejected';

export interface ICategoryState {
  categories: { id: number, name: string }[];
  categoriesStatus: CategoriesStatusType;
}

const fetchCategories = createAsyncThunk<ICategoryState, void, { rejectValue: string }>(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await $api.get("api/categories");
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState: ICategoryState = {
  categories: [],
  categoriesStatus: 'pending'
}

const categoriesSlice = createSlice({
  name: 'category',
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
})

export { fetchCategories };

export default categoriesSlice.reducer;