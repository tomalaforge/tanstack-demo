import { User } from '../user/user.model';

export interface UserPage {
  users: User[];
  hasMore: boolean;
}
