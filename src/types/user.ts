import { Token } from '../services/token';

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type UserAuth = User & {
  email: string;
  token: Token;
}
