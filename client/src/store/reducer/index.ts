import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from '~/api/auth';
import userSlice from '../slices/user';

const rootReducer = combineReducers({
  // API Reducer
  [authApi.reducerPath]: authApi.reducer,
  // State Reducer
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
