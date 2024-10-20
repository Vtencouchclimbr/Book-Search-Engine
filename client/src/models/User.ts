import type { Book } from './Book';

export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  savedBooks: Book[];
}
