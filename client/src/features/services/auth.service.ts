import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { IDecodedJwt, ILoginUser } from '../interfaces/auth.interface';

const API_URL = 'http://localhost:8000/api/auth';

const login = async (user: ILoginUser): Promise<any> => {
  const response = await axios.post(`${API_URL}/signin`, user);

  if (response.data) {
    localStorage.setItem('jwt', JSON.stringify(response.data));

    const decodedJwt: IDecodedJwt = jwt_decode(response.data.auth_token);
    localStorage.setItem('user', JSON.stringify(decodedJwt.user));
  }
  return response.data;
};

const authService = {
  login,
};

export default authService;
