import { createSlice, createSelector } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';
import { RootState } from '../store';

type TIngredientsState = {
  isLoading: boolean;
  ingredients: TIngredient[];
};

export const initialState: TIngredientsState = {
  isLoading: false,
  ingredients: []
};

export const getIngredientsByType = (type: string) =>
  createSelector(
    (state: RootState) => state.ingredients.ingredients,
    (ingredients) =>
      ingredients ? ingredients.filter((item) => item.type === type) : []
  );

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredientsList: (state, action) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    },
    setIsLoading: (state) => {
      state.isLoading = false;
    }
  },
  selectors: {
    getIngredientsList: (state) => state.ingredients,
    getLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
        state.ingredients = [];
      });
  }
});

export const { setIngredientsList, setIsLoading } = ingredientsSlice.actions;

export const { getIngredientsList, getLoading } = ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer;
