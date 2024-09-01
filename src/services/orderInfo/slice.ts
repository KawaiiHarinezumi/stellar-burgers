import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderInfoByNumber } from './actions';

interface TOrderInfoState {
  orderInfoData: TOrder | null;
}

const initialState: TOrderInfoState = {
  orderInfoData: null
};

export const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
  },
  selectors: {
    getOrderInfoData: (state) => state.orderInfoData,
    getOrderInfoNumber: (state) => state.orderInfoData?.number
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderInfoByNumber.pending, (state) => {
        state.orderInfoData = null;
      })
      .addCase(getOrderInfoByNumber.fulfilled, (state, action) => {
        state.orderInfoData = action.payload.orders[0] ?? null;
      });
      
      ;
  }
});

export const { getOrderInfoData, getOrderInfoNumber } = orderInfoSlice.selectors;

export const orderInfoReducer = orderInfoSlice.reducer;
