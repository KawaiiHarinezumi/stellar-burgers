import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { getFeed } from '../../services/feed/actions';
import { getFeedOrders } from '../../services/feed/slice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeedOrders);

  useEffect(() => {
    dispatch(getFeed());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
