import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";

import filter from './features/filterSlice';
import products from './features/productsSlice';
import cart, { CartStateType } from './features/cartSlice';
import user from './features/userSlice';

const persistedStateCart: CartStateType = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') || '')
    : {};

const rootReducer = combineReducers({
  filter,
  products,
  cart,
  user
})

export const store = configureStore({
  reducer: rootReducer,
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
