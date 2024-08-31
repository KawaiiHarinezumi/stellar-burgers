import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderInfoByNumber = createAsyncThunk(
  'getOrderInfo',
  async (number: number) => getOrderByNumberApi(number)
);
