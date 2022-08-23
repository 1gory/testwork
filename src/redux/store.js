import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo';
import authReducer from './auth';

export default configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer,
  },
});
