import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux.hook';
import auth from './auth-helper';

const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  const navigate = useNavigate();

  return auth.isAuthenticated() ? page : <Navigate replace to="/signin" />;;
};

export default PrivateRoute;
