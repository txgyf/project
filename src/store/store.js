// import { configureStore } from '@reduxjs/toolkit';
import { configureStore } from '../rtk-nut/index';
import counterReducer from './counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
