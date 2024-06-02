import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { $api } from '@services/api';
import { TAsyncThunkStatus } from '@store/model/asyncThunkModel';
import {
  ICategory,
  IChangeCategory,
  ICreateCategory,
} from '@store/features/categories/model';

export const getCategories = createAsyncThunk<
  ICategory[],
  void,
  { rejectValue: string }
>('categories/getCategories', async (_, { rejectWithValue }) => {
  try {
    const res = await $api.get('api/category');
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const createCategory = createAsyncThunk<void, ICreateCategory>(
  'categories/createCategory',
  async ({ name, image }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      const res = await $api.post('api/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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

export const deleteCategory = createAsyncThunk<void, ICategory['id']>(
  'categories/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`api/category/${categoryId}`);
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

export const changeCategory = createAsyncThunk<void, IChangeCategory>(
  'categories/changeCategory',
  async ({ id, name, image }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (image) {
        formData.append('image', image);
      }
      const res = await $api.patch(`api/category/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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

export const changeCategoryOrder = createAsyncThunk<void, string[]>(
  'categories/changeCategoryOrder',
  async (categoryArr, { rejectWithValue }) => {
    try {
      const res = await $api.patch('api/category/change-order', {
        data: categoryArr,
      });
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

export interface ICategoryState {
  categories: ICategory[];
  categoriesStatus: TAsyncThunkStatus;
}

const initialState: ICategoryState = {
  categories: [],
  categoriesStatus: 'pending',
};

const categoriesSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
      state.categoriesStatus = 'fulfilled';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.categories = action.payload;
          state.categoriesStatus = 'fulfilled';
        }
      )
      .addCase(getCategories.pending, (state) => {
        state.categoriesStatus = 'pending';
      })
      .addCase(getCategories.rejected, (state) => {
        state.categoriesStatus = 'rejected';
      });
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
