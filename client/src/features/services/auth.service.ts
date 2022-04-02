import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { IDecodedJwt, ILoginUser } from '../interfaces/auth.interface';

const API_URL = 'http://localhost:8000/api/auth/signin';

const login = async (user: ILoginUser): Promise<any> => {
  const response = await axios.post(API_URL, user);

  if (response.data) {
    localStorage.setItem('jwt', JSON.stringify(response.data));

    const decodedJwt: IDecodedJwt = jwt_decode(response.data.token);
    localStorage.setItem('user', JSON.stringify(decodedJwt.user));
  }
  return response.data;
};
