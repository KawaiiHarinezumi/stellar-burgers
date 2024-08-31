import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { authSlice } from './auth/slice';
import { ingredientsSlice } from './ingredients/slice';
import { constructorSlice } from './constructor/slice';
import { feedSlice } from './feed/slice';
import { orderSlice } from './order/slice';
import { orderInfoSlice } from './orderInfo/slice';

const rootReducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [constructorSlice.reducerPath]: constructorSlice.reducer,
  [feedSlice.reducerPath]: feedSlice.reducer,
  [orderSlice.reducerPath]: orderSlice.reducer,
  [orderInfoSlice.reducerPath]: orderInfoSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
