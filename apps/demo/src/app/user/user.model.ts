export interface User {
  id: number;
  name: string;
  age: number;
}

export type UserCreate = Omit<User, 'id'>;
export type UserUpdate = Partial<UserCreate>;

export interface UserPage {
  users: User[];
  hasMore: boolean;
}
