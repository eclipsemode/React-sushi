import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { IProducts } from "redux/features/productsSlice";

export interface ICartState {
    items: IProducts[];
    totalPrice: number;
    totalAmount: number;
}

const initialState: ICartState = {
    items: [],
    totalPrice: 0,
    totalAmount: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IProducts>) => {
            const foundItem = state.items.find((obj) => obj.id === action.payload.id);

            foundItem
                ? foundItem.amount++
                : state.items.push({
                      ...action.payload,
                      amount: 1,
                  });

            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.amount + sum, 0);

            state.totalAmount = state.items.reduce((value, obj) => value + obj.amount, 0);
        },

        removeItem: (state, action: PayloadAction<string>) => {
            const foundItem = state.items.find((obj) => Number(obj.id === action.payload));

            if (!foundItem) return;

            foundItem.amount > 1
                ? foundItem.amount--
                : (state.items = state.items.filter((obj) => obj.id !== action.payload));

            state.totalPrice = state.items.reduce((value, obj) => value + obj.price * obj.amount, 0);
            state.totalAmount = state.items.reduce((value, obj) => value + obj.amount, 0);
        },

        removeAll: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.totalPrice = 0;
        },

        removeItemById: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((obj) => Number(obj.id !== action.payload));
            state.totalPrice = state.items.reduce((value, obj) => {
                return value + obj.price;
            }, 0);
            state.totalAmount = state.items.reduce((value, obj) => {
                return value + obj.amount;
            }, 0);
        },
    },
});

export const selectCart = (state: RootState) => state.cart;
export const { addItem, removeItem, removeAll, removeItemById } = cartSlice.actions;
export default cartSlice.reducer;
