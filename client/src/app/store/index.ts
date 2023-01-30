// @ts-nocheck
import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
// import {
//   isAsyncThunkAction,
//   isPending,
//   isRejected,
//   isFulfilled,
//   isAnyOf,
//   createListenerMiddleware,
// } from '@reduxjs/toolkit'
// import { fetchUserRegistration } from "features/registration";

import filter from 'entities/filterSlice';
import products from 'entities/productsSlice';
import cart, { ICartState } from "entities/cartSlice";
import user from "entities/userSlice";
import category from 'entities/categoriesSlice';
// import jwtDecode from "jwt-decode";

const persistedStateCart: ICartState = localStorage.getItem('cart') !== null
  ? JSON.parse(localStorage.getItem('cart') || '')
  : null;

// const persistedStateUser: IUser | null | string = localStorage.getItem('token') && jwtDecode(localStorage.getItem('token') ? localStorage.getItem('token') as string : '');

// const sessionListenerMiddleware = createListenerMiddleware()
//
// sessionListenerMiddleware.startListening({
//   matcher: isAnyOf(isAsyncThunkAction(fetchUserRegistration)), // execute middleware every time "me" is dispatched
//   effect: (action, listenerApi) => {
//     // listenerApi.getState() // You can also access state using this function
//
//     const shouldSaveSession = isFulfilled(fetchUserRegistration) // save session every time async thunk "me" is fulfilled
//
//     if (shouldSaveSession(action)) {
//       // Middleware is executed after reducer, so we can assume state is already updated
//       localStorage.setItem('accessToken', JSON.stringify(action.payload))
//     }
//   },
// })

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
    // user: {
    //   isAuth: !!persistedStateUser,
    //   user: !!persistedStateUser ? persistedStateUser : {},
    //   error: null
    // }
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
    // .concat(sessionListenerMiddleware.middleware)
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
