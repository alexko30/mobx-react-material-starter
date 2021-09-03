import { appInject } from '@core/di/utils';
import { appMakeObservable, appObservable } from '@core/state-management/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { UserListModel } from '@shared/models/user/list-model';
import { IUsersService } from '@shared/types/users';

export class UserListViewModel {
  private usersService = appInject<IUsersService>(DI_TOKENS.usersService);
  @appObservable _users: Array<UserListModel> = [];
  @appObservable _loading = {
    users: false,
  };
  @appObservable _error = {
    usersGet: false,
  };

  // constructor() {
  //   appMakeObservable(this, {
  //     _users: appObservable,
  //     _loading: appObservable,
  //     _error: appObservable,
  //   });
  // }

  get users() {
    return this._users;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  getUsers = async () => {
    try {
      this._error.usersGet = false;
      this._loading.users = true;

      this._users = await this.usersService.getList();
    } catch (err) {
      this._error.usersGet = true;

      throw err;
    } finally {
      this._loading.users = false;
    }
  }
}