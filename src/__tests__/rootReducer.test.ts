import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../services/auth/slice';
import { ingredientsSlice } from '../services/ingredients/slice';
import { constructorSlice } from '../services/constructor/slice';
import { feedSlice } from '../services/feed/slice';
import { orderSlice } from '../services/order/slice';
import { orderInfoSlice } from '../services/orderInfo/slice';

describe('проверка rootReducer', () => {
  test('правильная инициализация rootReducer', () => {
    const rootReducer = combineReducers({
        [authSlice.reducerPath]: authSlice.reducer,
        [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
        [constructorSlice.reducerPath]: constructorSlice.reducer,
        [feedSlice.reducerPath]: feedSlice.reducer,
        [orderSlice.reducerPath]: orderSlice.reducer,
        [orderInfoSlice.reducerPath]: orderInfoSlice.reducer
      });

    const store = configureStore({
      reducer: rootReducer
    });

    expect(store.getState()).toEqual(
        rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
  });
});