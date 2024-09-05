import React, { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { getIngredientsList } from '../../services/ingredients/slice';
import { getOrderInfoByNumber } from '../../services/orderInfo/actions';
import { getOrderInfoData } from '../../services/orderInfo/slice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const params = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (typeof params.number === 'string') {
      dispatch(getOrderInfoByNumber(+params.number));
    }
  }, []);

  const orderData = useSelector(getOrderInfoData);
  const ingredients = useSelector(getIngredientsList);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      }, 
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
