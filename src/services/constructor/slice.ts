import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TConstructorItems } from '@utils-types';

export type TConstructorState = {
  constructorItems: TConstructorItems;
};

export const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredientType = action.payload.type;
        switch (ingredientType) {
          case 'bun':
            state.constructorItems.bun = action.payload;
            break;
          case 'main':
            state.constructorItems.ingredients.push(action.payload);
            break;
          case 'sauce':
            state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient) => {
        const id = nanoid();
        return { payload: { id: id, ...ingredient } };
      }
    },
    removeConstructorItem: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },
    moveConstructorItemUp: (state, action: PayloadAction<number>) => {
      [
        state.constructorItems.ingredients[action.payload - 1],
        state.constructorItems.ingredients[action.payload]
      ] = [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload - 1]
      ];
    },
    moveConstructorItemDown: (state, action: PayloadAction<number>) => {
      [
        state.constructorItems.ingredients[action.payload + 1],
        state.constructorItems.ingredients[action.payload]
      ] = [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload + 1]
      ];
    },
    clearConstructorItems: (state) => {
      state.constructorItems = { bun: null, ingredients: [] };
    }
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems
  }
});

export const {
  addConstructorItem,
  removeConstructorItem,
  moveConstructorItemUp,
  moveConstructorItemDown,
  clearConstructorItems
} = constructorSlice.actions;
export const { getConstructorItems } = constructorSlice.selectors;

export const constructorReducer = constructorSlice.reducer;
