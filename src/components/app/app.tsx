import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { useDispatch, useSelector } from '../../services/store';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';

import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/auth/actions';
import { getIngredients } from '../../services/ingredients/actions';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, []);

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route path=':number' element={<OrderInfo />} />
        </Route>
        <Route path='/login' element={<OnlyUnAuth children={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth children={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth children={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth children={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={
            <OnlyAuth>
              <Profile />
            </OnlyAuth>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <OnlyAuth>
              <ProfileOrders />
            </OnlyAuth>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <OnlyAuth>
              <OrderInfo />
            </OnlyAuth>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингридиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <OnlyAuth>
                <Modal title='Детали заказа' onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              </OnlyAuth>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
