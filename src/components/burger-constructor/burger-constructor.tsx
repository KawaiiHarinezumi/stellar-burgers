import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';

import { getUser } from '../../services/auth/slice';
import {
  getConstructorItems,
  clearConstructorItems
} from '../../services/constructor/slice';
import { createOrder } from '../../services/order/actions';
import {
  getOrderModalData,
  getOrderRequest,
  resetOrderModalData
} from '../../services/order/slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const closeOrderModal = () => {
    dispatch(resetOrderModalData());
    dispatch(clearConstructorItems());
    navigate('/');
  };

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (orderRequest) return;

    const order = [
      constructorItems.bun ? constructorItems.bun._id : '0',
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      ),
      constructorItems.bun ? constructorItems.bun._id : '0'
    ];
    dispatch(createOrder(order));
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
