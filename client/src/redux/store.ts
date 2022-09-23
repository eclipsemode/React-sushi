import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

import filter from './features/filterSlice';
import products from './features/productsSlice';
import cart, { ICartState } from "./features/cartSlice";
import user, { IUser } from "./features/userSlice";

const persistedStateCart: ICartState = localStorage.getItem('cart') !== null
  ? JSON.parse(localStorage.getItem('cart') || '')
  : null;

const persistedStateUser: IUser | null | string = localStorage.getItem('token') && jwtDecode(localStorage.getItem('token') ? localStorage.getItem('token') as string : '');

console.log(!!persistedStateUser)

const rootReducer = combineReducers({
  filter,
  products,
  cart,
  user
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    cart: {
      items: persistedStateCart?.items || [],
      totalPrice: persistedStateCart?.totalPrice || 0,
      totalAmount: persistedStateCart?.totalAmount || 0
    },
    user: {
      isAuth: !!persistedStateUser,
      user: !!persistedStateUser ? persistedStateUser : {},
      error: null
    }
  },
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
