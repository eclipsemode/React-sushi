import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import filter from './features/filterSlice';
import products from './features/productsSlice';
import cart, { CartStateType } from './features/cartSlice';

const persistedStateCart: CartStateType = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') || '')
    : {};

export const store = configureStore({
  reducer: {filter, products, cart},
  preloadedState: { cart: persistedStateCart },
});

store.subscribe(() => localStorage.setItem('cart', JSON.stringify(store.getState().cart)));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
