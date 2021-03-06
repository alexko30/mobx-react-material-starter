import { appInjectable } from '@core/di/utils';
import { UserListModel } from '@shared/models/user/list-model';
import { UserRole } from '@shared/models/user/role';
import { IUsersService } from '@shared/types/users';

@appInjectable()
export class UsersService implements IUsersService {
  getList = async () => {
    await new Promise((r) => setTimeout(r, 1000));

    return [
      new UserListModel({
        id: '1',
        role: UserRole.admin,
        email: 'test@example.com',
      }),
      new UserListModel({
        id: '2',
        role: UserRole.admin,
        email: 'test2@example.com',
      }),
    ];
  };
}
