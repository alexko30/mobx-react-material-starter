import { BaseModel } from '@core/base-model';
import { EntityType } from './type';

export interface EntityNameReadQuery {
  id: string;
  name: string;
  type: EntityType;
}

export class EntityNameReadModel extends BaseModel<EntityNameReadQuery> {
  private id: string;
  private name: string;
  private type: EntityType;

  constructor(data: EntityNameReadQuery) {
    super();

    this.update(data);
  }

  get asJson(): EntityNameReadQuery {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
    };
  }
}