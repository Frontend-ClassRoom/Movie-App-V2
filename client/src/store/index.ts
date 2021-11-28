import storage from 'redux-persist/lib/storage/session';
import persistReducer from 'redux-persist/es/persistReducer';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '~/api/auth';
import rootReducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

const combineApiMiddleWare = [authApi.middleware];

const store = configureStore({
  reducer: enhancedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(combineApiMiddleWare),
});

setupListeners(store.dispatch);

export default store;
