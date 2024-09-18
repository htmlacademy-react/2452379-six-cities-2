import { User } from './user';

export type Review = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
}
