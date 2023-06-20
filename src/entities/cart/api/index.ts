import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IProducts } from "entities/products";

export interface ICartState {
  items: IProducts[];
  totalPrice: number;
  finalPrice: number;
  deliveryPrice: number;
  totalAmount: number;
  orderType: 'delivery' | 'pickup' | null
}

const initialState: ICartState = {
  items: [],
  totalPrice: 0,
  finalPrice: 0,
  deliveryPrice: 0,
  totalAmount: 0,
  orderType: null
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
      state.finalPrice = 0;
      state.orderType = null;
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
    updateDeliveryPrice: (state) => {
      if (state.totalPrice === 0 || state.totalPrice >= 1200) {
        state.deliveryPrice = 0
      } else {
        state.deliveryPrice = 100
      }
    },
    setFinalPrice: (state, action: PayloadAction<number>) => {
      state.finalPrice = action.payload;
    },
    setOrderType: (state, action: PayloadAction<'delivery' | 'pickup' | null>) => {
      state.orderType = action.payload
    }
  },
});

export const selectCart = (state: RootState) => state.cartReducer;
export const { addItem, removeItem, removeAll, removeItemById, updateDeliveryPrice, setOrderType, setFinalPrice } = cartSlice.actions;
export default cartSlice.reducer;
