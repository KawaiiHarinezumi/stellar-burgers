import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

import { getAuthChecked, getUser } from '../../services/auth/slice';

import { Preloader } from '../ui/preloader';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: TProtectedRouteProps) => {
  const user = useSelector(getUser);
  const location = useLocation();
  const isAuthChecked = useSelector(getAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return children;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ children }: { children: React.JSX.Element }) => (
  <ProtectedRoute onlyUnAuth children={children} />
);
