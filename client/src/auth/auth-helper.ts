import { IDisplayUser } from '../features/interfaces/user.interface';

const auth = {
  // Check if token is stored
  isAuthenticated() {
    if (typeof window === 'undefined') {
      return false;
    }
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } else {
      return false;
    }
  },
};

export default auth;
