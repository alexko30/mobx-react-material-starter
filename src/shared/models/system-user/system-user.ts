import { BaseModel } from '@core/base-model';
import { SystemUserRole } from './role';

export interface SystemUserDTO {
  id: string;
  role: SystemUserRole;
  email: string;
}

export class SystemUser extends BaseModel<SystemUserDTO> {
  email: string;
  id: string;
  role: SystemUserRole;

  constructor(data: SystemUserDTO) {
    super();

    this.update(data);
  }

  get asJson(): SystemUserDTO {
    return {
      id: this.id,
      role: this.role,
      email: this.email,
    };
  }
}