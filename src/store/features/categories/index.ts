import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { $api } from "@services/api";

type CategoriesStatusType = 'fulfilled' | 'pending' | 'rejected';

export interface ICategories {
  id: number,
  name: string
}

export interface ICategoryState {
  categories: ICategories[];
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
  reducers: {
    setCategories: (state, action: PayloadAction<ICategories[]>) => {
      state.categories = action.payload;
      state.categoriesStatus = 'fulfilled';
    }
  },
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

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;