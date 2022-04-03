import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux.hook';

const Home = () => {
  const navigate = useNavigate();

  const { jwt } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!jwt?.auth_token) return navigate('/register');
  }, [jwt]);

  return (
    <div>
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/signin')}>Login</button>
      <p>{jwt?.auth_token} </p>
    </div>
  );
};

export default Home;
