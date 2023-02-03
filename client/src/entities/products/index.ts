import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { $api } from "processes/api";

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

interface IFetchParams {
  categoryNumber: number;
  sortType: string;
  sortOrder: string;
}

export const fetchProducts = createAsyncThunk<IProducts[], IFetchParams>(
  "products/fetchProducts",
  async ({ ...params }) => {
    const { categoryNumber, sortType, sortOrder } = await params;
    const { data } = await $api.get(`api/product?categoryId=${categoryNumber}&sortBy=${sortType}&sortOrder=${sortOrder}`);
    return data;
  }
);

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
