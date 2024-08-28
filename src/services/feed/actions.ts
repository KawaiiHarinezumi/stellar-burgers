import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeed = createAsyncThunk('feed/get', async () => {
  const res = await getFeedsApi();
  return res;
});

export const getUserOrders = createAsyncThunk('feed/getOrder', async () => {
  const res = await getOrdersApi();
  return res;
});
