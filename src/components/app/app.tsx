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
import { CenteredLocation } from '../centered-location/centered-location';
import { checkUserAuth } from '../../services/auth/actions';
import { getIngredients } from '../../services/ingredients/actions';
import { getOrderInfoData } from '../../services/orderInfo/slice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  const orderNumber = useSelector(getOrderInfoData);

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
        <Route
          path='/ingredients/:id'
          element={<CenteredLocation title='Детали ингредиента'> <IngredientDetails/> </CenteredLocation> }
        />
        <Route 
          path='/feed'
          element={<Feed />} 
        />
        <Route 
          path='/feed/:number'
          element={
            <CenteredLocation title={`#${String(orderNumber ? orderNumber.number : 0).padStart(6, '0')}`} textStyle='digits-default'>
              <OrderInfo />
            </CenteredLocation>} 
        />
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
          path='/profile/orders/:number'
          element={
            <OnlyAuth>
              <CenteredLocation title={`#${String(orderNumber ? orderNumber.number : 0).padStart(6, '0')}`} textStyle='digits-default'>
                <OrderInfo/>
              </CenteredLocation>
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
          path='/profile'
          element={
            <OnlyAuth>
              <Profile />
            </OnlyAuth>
          }
        />
        <Route path='*' element={<CenteredLocation> <NotFound404 /> </CenteredLocation>} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={`#${String(orderNumber ? orderNumber.number : 0).padStart(6, '0')}`} onClose={closeModal} titleStyle='digits-default'>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <OnlyAuth>
                <Modal title={`#${String(orderNumber ? orderNumber.number : 0).padStart(6, '0')}`} onClose={closeModal} titleStyle='digits-default'>
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
