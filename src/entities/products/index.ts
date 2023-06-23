import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import {$api} from "processes/api";

export enum ProductsStatus {
  PENDING,
  FULFILLED,
  REJECTED,
}

export interface IProducts {
  category: number[];
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  amount: number;
}

export interface IProductsState {
  products: IProducts[];
  productsStatus: ProductsStatus;
}

export interface ICreateProduct {
  name: string,
  price: number | number[],
  rating: number,
  description: string,
  image: File,
  categoryId: number
}

export interface IProductCreated extends Omit<ICreateProduct, 'image'> {
  id: number,
  image: string
}

export const fetchProducts = createAsyncThunk<IProducts[], void, { state: RootState }>(
  "products/fetchProducts",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { filterReducer } = getState();
      const { data } = await $api.get(`api/product?categoryId=${filterReducer.categoryNumber}&sortBy=${filterReducer.sortType}&sortOrder=${filterReducer.sortOrder}`);
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createProduct = createAsyncThunk<IProductCreated, ICreateProduct>(
    'products/createProduct',
    async ({name, price, rating, description, image, categoryId}, {rejectWithValue}) => {
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', String(price));
        formData.append('rating', String(rating));
        formData.append('description', description);
        formData.append('image', image);
        formData.append('categoryId', String(categoryId));
        const response = await $api.post('api/product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
)

const initialState: IProductsState = {
  products: [],
  productsStatus: ProductsStatus.PENDING
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.productsStatus = ProductsStatus.PENDING;
      state.products = [];
    })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProducts[]>) => {
        state.products = action.payload;
        state.productsStatus = ProductsStatus.FULFILLED;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.productsStatus = ProductsStatus.REJECTED;
        state.products = [];
      });
  }
});

export const selectProducts = (state: RootState) => state.productsReducer;
export default productsSlice.reducer;
