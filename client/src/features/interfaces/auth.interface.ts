import { IDisplayUser } from './user.interface';

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IDecodedJwt {
  user: IDisplayUser;
  exp: number;
  iat: number;
}
