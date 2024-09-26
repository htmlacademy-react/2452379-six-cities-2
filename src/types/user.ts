import { Token } from '../services/token';

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type UserData = User & {
  email: string;
  token: Token;
}

export type UserLogIn = {
  email: string;
  password: string;
}
