import { BaseModel } from '@core/base-model';
import { EntityType } from './type';

export interface EntityNameUpdateDTO {
  name: string;
  type: EntityType;
}

export class EntityNameUpdateModel extends BaseModel<EntityNameUpdateDTO> {
  private name: string;
  private type: EntityType;

  constructor(dto: EntityNameUpdateDTO) {
    super(dto);

    this.update(dto);
  }

  get asJson(): EntityNameUpdateDTO {
    return {
      name: this.name,
      type: this.type,
    };
  }
}