import React from 'react';
import { useNavigate } from 'react-router-dom';

import auth from '../auth/auth-helper';
import { useAppSelector } from '../hooks/redux.hook';

const Home = () => {
  const navigate = useNavigate();

  const { jwt } = useAppSelector((state) => state.auth);

  let user = auth.isAuthenticated();

  return (
    <div>
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/signin')}>Login</button>
      <p>{user?.username} </p>
    </div>
  );
};

export default Home;
