import { BaseModel } from '@core/base-model';
import { SystemUserRole } from './role';

export interface SystemUserDTO {
  id: string;
  role: SystemUserRole;
  email: string;
}

export class SystemUser extends BaseModel<SystemUserDTO> {
  email: string = '';
  id: string = '';
  role: SystemUserRole = SystemUserRole.businessOwner;

  constructor(dto: SystemUserDTO) {
    super(dto);

    this.update(dto);
  }

  get asJson(): SystemUserDTO {
    return {
      id: this.id,
      role: this.role,
      email: this.email,
    };
  }
}