import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";

import filter from './features/filterSlice';
import products from './features/productsSlice';
import cart, { ICartState } from "./features/cartSlice";
import user, { IUser } from "./features/userSlice";
import category from './features/categoriesSlice';
import jwtDecode from "jwt-decode";

const persistedStateCart: ICartState = localStorage.getItem('cart') !== null
  ? JSON.parse(localStorage.getItem('cart') || '')
  : null;

const persistedStateUser: IUser | null | string = localStorage.getItem('token') && jwtDecode(localStorage.getItem('token') ? localStorage.getItem('token') as string : '');

const rootReducer = combineReducers({
  filter,
  products,
  cart,
  user,
  category
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

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
