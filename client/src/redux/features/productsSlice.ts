import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { $host } from "../../http";

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

type ProductsStateType = {
  products: IProducts[];
  productsStatus: ProductsStatus;
};

type FetchParamsType = {
  categoryNumber: number;
  sortType: string;
  sortOrder: string;
};

export const fetchProducts = createAsyncThunk<IProducts[], FetchParamsType>(
  "products/fetchProducts",
  async ({ ...params }) => {
    const { categoryNumber, sortType, sortOrder } = await params;
    const { data } = await $host.get(`api/product?categoryId=${categoryNumber}&sortBy=${sortType}&sortOrder=${sortOrder}`);
    return data;
  }
);

const initialState: ProductsStateType = {
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

export const selectProducts = (state: RootState) => state.products;
export default productsSlice.reducer;
