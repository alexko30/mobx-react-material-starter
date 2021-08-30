import { BaseModel } from '@core/base-model';

export interface EntityNameCreateCommand {
  name: string;
}

export class EntityNameCreateModel extends BaseModel<EntityNameCreateCommand> {
  private name: string;

  constructor(data: EntityNameCreateCommand) {
    super();

    this.update(data);
  }

  get asJson(): EntityNameCreateCommand {
    return {
      name: this.name,
    };
  }
}