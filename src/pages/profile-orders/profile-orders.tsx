import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { getUserOrders } from '../../services/feed/actions';
import { getFeedOrders } from '../../services/feed/slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeedOrders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
