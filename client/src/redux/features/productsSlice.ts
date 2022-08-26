import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export enum ProductsStatus {
    PENDING,
    FULFILLED,
    REJECTED,
}

export type ProductsType = {
    category: number[];
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    amount: number;
};

type ProductsStateType = {
    products: ProductsType[];
    productsStatus: ProductsStatus;
};

type FetchParamsType = {
    categoryNumber: number;
    sortType: string;
    sortOrder: string;
    searchValue: string | undefined;
};

export const fetchProducts = createAsyncThunk<ProductsType[], FetchParamsType>(
    'products/fetchProducts',
    async ({ ...params }) => {
        const { categoryNumber, sortType, sortOrder, searchValue } = params;
        const { data } = await axios.get<ProductsType[]>(
            'https://62d7c93949c87ff2af3cd25a.mockapi.io/products?' +
                (categoryNumber ? 'category=' + categoryNumber + '&' : '') +
                'sortBy=' +
                sortType +
                '&order=' +
                sortOrder +
                (searchValue ? '&search=' + searchValue : ''),
        );
        return data;
    },
);

const initialState: ProductsStateType = {
    products: [],
    productsStatus: ProductsStatus.PENDING,
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.productsStatus = ProductsStatus.PENDING;
            state.products = [];
        });
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductsType[]>) => {
            state.products = action.payload;
            state.productsStatus = ProductsStatus.FULFILLED;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.productsStatus = ProductsStatus.REJECTED;
            state.products = [];
        });
    },
});

export const selectProducts = (state: RootState) => state.products;
export default productsSlice.reducer;
