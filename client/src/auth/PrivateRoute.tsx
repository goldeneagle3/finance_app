import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux.hook';

const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  const { isSuccess, isAuthenticated, jwt } = useAppSelector(
    (state) => state.user,
  );

  useEffect(() => {
    if (!jwt || !jwt?.auth_token) return;
  }, [jwt, isSuccess]);

  return isAuthenticated ? page : <Navigate replace to="/signin" />;
};

export default PrivateRoute;
