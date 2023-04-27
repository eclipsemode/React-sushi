import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import filterReducer from 'features/filter/api';
import productsReducer from 'entities/products';
import cartReducer from 'entities/cart';
import userReducer from 'entities/user';
import categoriesReducer from 'entities/categories';
import ordersReducer from 'widgets/Account/api';
import adaptiveServiceReducer from 'processes/services/adaptiveService/adaptiveService';
import cityReducer from 'entities/city';

import { cartListenerMiddleware } from 'entities/cart/middleware';
import adaptiveServiceListenerMiddleware from '../../processes/services/adaptiveService/adaptiveServiceListenerMiddleware';

const rootReducer = combineReducers({
    filterReducer,
    productsReducer,
    cartReducer,
    userReducer,
    categoriesReducer,
    ordersReducer,
    adaptiveServiceReducer,
    cityReducer,
});

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
        }).prepend(cartListenerMiddleware.middleware, adaptiveServiceListenerMiddleware.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
