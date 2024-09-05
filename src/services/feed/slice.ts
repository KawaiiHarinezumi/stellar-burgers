import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeed, getUserOrders } from './actions';

interface TFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
}

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeedOrders: (state, action) => {
      state.orders = action.payload;
    },
    setFeedTotal: (state, action) => {
      state.total = action.payload;
    },
    setFeedTotalToday: (state, action) => {
      state.total = action.payload;
    },
    setFeedLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getFeedTotal: (state) => state.total,
    getFeedTotalToday: (state) => state.totalToday,
    getFeedLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.rejected, (state) => {
        state.total = 0;
        state.totalToday = 0;
        state.orders = [];
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export const {
  setFeedOrders,
  setFeedTotal,
  setFeedTotalToday,
  setFeedLoading
} = feedSlice.actions;

export const {
  getFeedOrders,
  getFeedTotal,
  getFeedTotalToday,
  getFeedLoading
} = feedSlice.selectors;

export const feedReducer = feedSlice.reducer;
