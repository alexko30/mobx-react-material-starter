import { BaseModel } from '@core/base-model';

export interface EntityNameCreateDTO {
  name: string;
}

export class EntityNameCreateModel extends BaseModel<EntityNameCreateDTO> {
  private name: string;

  constructor(dto: EntityNameCreateDTO) {
    super(dto);

    this.update(dto);
  }

  get asJson(): EntityNameCreateDTO {
    return {
      name: this.name,
    };
  }
}