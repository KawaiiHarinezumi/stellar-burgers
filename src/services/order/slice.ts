import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrder } from './actions';

interface TOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderRequest: (state: TOrderState, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    resetOrderModalData: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    },
    setOrderModalData: (state, action) => {
      state.orderModalData = action.payload;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  }
});

export const { setOrderRequest, setOrderModalData, resetOrderModalData } =
  orderSlice.actions;

export const { getOrderModalData, getOrderRequest } = orderSlice.selectors;

export const orderReducer = orderSlice.reducer;
