import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import filterReducer from '@store/features/filter/api';
import productsReducer from '@store/features/products/api';
import cartReducer from '@store/features/cart/api';
import userReducer from '@store/features/user';
import categoriesReducer from '@store/features/categories';
import ordersReducer from '@store/features/account/api';
import adaptiveServiceReducer from '@store/features/adaptive';
import authReducer from '@store/features/auth'
import cityReducer from '@store/features/city';
import materialDialogReducer from '@store/features/materialDialog/api'
import orderCreateReducer from '@store/features/order/api'

import { cartListenerMiddleware } from '@store/features/cart/middleware';
import { promoCodeMiddleware } from "@store/features/order/middleware";
import adaptiveServiceListenerMiddleware from '@store/features/adaptive/adaptiveServiceListenerMiddleware';

const rootReducer = combineReducers({
    filterReducer,
    productsReducer,
    cartReducer,
    userReducer,
    categoriesReducer,
    ordersReducer,
    adaptiveServiceReducer,
    cityReducer,
    authReducer,
    materialDialogReducer,
    orderCreateReducer
});

const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['cartReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).prepend(cartListenerMiddleware.middleware, promoCodeMiddleware.middleware, adaptiveServiceListenerMiddleware.middleware),
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
