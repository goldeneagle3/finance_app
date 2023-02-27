import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux.hook';
import auth from './auth-helper';

const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  const { jwt } = useAppSelector((state) => state.auth);

  const isAuth = auth.isAuthenticated() && jwt?.auth_token;
  return isAuth ? page : <Navigate replace to="/signin" />;
};

export default PrivateRoute;
