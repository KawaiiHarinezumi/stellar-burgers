import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk('ingredients/get', async () => {
  const res = await getIngredientsApi();
  return res;
});
