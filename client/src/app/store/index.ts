import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import filterReducer from 'features/filter/api';
import productsReducer from 'entities/products';
import cartReducer from "entities/cart";
import userReducer from "entities/user";
import categoriesReducer from "entities/categories";

import { cartListenerMiddleware } from "entities/cart/middleware";

const rootReducer = combineReducers({
  filterReducer,
  productsReducer,
  cartReducer,
  userReducer,
  categoriesReducer
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cartReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  }).prepend(cartListenerMiddleware.middleware)
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
