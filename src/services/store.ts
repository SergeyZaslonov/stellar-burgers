import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { userSlice } from './slices/userSlice';
import { feedSlice } from './slices/feedSlice';
import { ordersHistorySlice } from './slices/ordersHistorySlice';
import { orderBurgerSlice } from './slices/burgerConstructorSlice';

const rootReducer = combineSlices(
  userSlice,
  ingredientsSlice,
  feedSlice,
  ordersHistorySlice,
  orderBurgerSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
