import { BaseModel } from '@core/base-model';
import { UserRole } from './role';

export interface UserMeQuery {
  id: string;
  role: UserRole;
  email: string;
}

export class UserMeModel extends BaseModel<UserMeQuery> {
  private email: string;
  private id: string;
  private role: UserRole;

  constructor(data: UserMeQuery) {
    super();

    this.update(data);
  }

  get asJson(): UserMeQuery {
    return {
      id: this.id,
      role: this.role,
      email: this.email,
    };
  }
}