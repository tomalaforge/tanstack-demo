export interface User {
  id: number;
  name: string;
  age: number;
}

export type UserCreate = Omit<User, 'id'>;
