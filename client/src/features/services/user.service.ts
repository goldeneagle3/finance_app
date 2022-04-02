import axios from 'axios';
import { IDisplayUser, INewUser } from '../interfaces/user.interface';

const API_URL = 'http://localhost:8000/api/users';

const createUser = async (userData: INewUser): Promise<IDisplayUser | null> => {
  const response = await axios.post(API_URL, userData);

  return response.data;
};

const userService = {
  createUser,
};

export default userService;
