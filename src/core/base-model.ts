export abstract class BaseModel<T> {
  constructor(dto: T) {
    this.update(dto);
  }
  
  abstract get asJson(): T;

  update(newData: Partial<T>): T {
    const allData = { ...this.asJson, ...newData };
    
    Object.assign(this, allData);
    
    return this.asJson;
  }
}