import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';

import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../services/auth/actions';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
