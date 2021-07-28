import { BaseModel } from '@core/base-model';
import { EntityType } from './type';

export interface EntityNameReadDTO {
  id: string;
  name: string;
  type: EntityType;
}

export class EntityNameReadModel extends BaseModel<EntityNameReadDTO> {
  private id: string;
  private name: string;
  private type: EntityType;

  constructor(dto: EntityNameReadDTO) {
    super(dto);

    this.update(dto);
  }

  get asJson(): EntityNameReadDTO {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
    };
  }
}