import { UserListModel } from '@shared/models/user/list-model';

export interface IUsersService {
  getList: () => Promise<Array<UserListModel>>;
}