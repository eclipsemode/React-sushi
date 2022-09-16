import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import filter from './features/filterSlice';
import products from './features/productsSlice';
import cart, { CartStateType } from './features/cartSlice';
import user from './features/userSlice';

const persistedStateCart: CartStateType = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') || '')
    : {};

export const store = configureStore({
  reducer: {filter, products, cart, user},
  preloadedState: { cart: persistedStateCart },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
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
