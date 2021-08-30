import { BaseModel } from '@core/base-model';
import { EntityType } from './type';

export interface EntityNameUpdateCommand {
  name: string;
  type: EntityType;
}

export class EntityNameUpdateModel extends BaseModel<EntityNameUpdateCommand> {
  private name: string;
  private type: EntityType;

  constructor(data: EntityNameUpdateCommand) {
    super();

    this.update(data);
  }

  get asJson(): EntityNameUpdateCommand {
    return {
      name: this.name,
      type: this.type,
    };
  }
}