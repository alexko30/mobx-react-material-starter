import { BaseModel } from '@core/base-model';
import { UserRole } from './role';

export interface UserListQuery {
  id: string;
  role: UserRole;
  email: string;
}

export class UserListModel extends BaseModel<UserListQuery> {
  private email: string;
  private id: string;
  private role: UserRole;

  constructor(data: UserListQuery) {
    super();

    this.update(data);
  }

  get asJson(): UserListQuery {
    return {
      id: this.id,
      role: this.role,
      email: this.email,
    };
  }
}