import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res;
  }
);
