import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import authReducer from "./slices/authSlice"
import globalReducer from './slices/globalSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
    global: globalReducer,
  }
});