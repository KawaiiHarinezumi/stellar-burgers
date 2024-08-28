import React, { forwardRef, useMemo } from 'react';
import { useSelector } from '../../services/store';

import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { getConstructorItems } from '../../services/constructor/slice';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  /** TODO: взять переменную из стора */
  const constructorItems = useSelector(getConstructorItems);

  const burgerConstructor = {
    bun: {
      _id: constructorItems.bun ? constructorItems.bun._id : 0
    },
    constructorIngredients: constructorItems.ingredients
  };

  const ingredientsCounters = useMemo(() => {
    const { bun, constructorIngredients } = burgerConstructor;
    const counters: { [key: string]: number } = {};
    constructorIngredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
