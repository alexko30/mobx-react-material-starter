export abstract class BaseModel<T> {
  abstract get asJson(): T;

  update(newData: Partial<T>): T {
    const allData = { ...this.asJson, ...newData };
    
    Object.assign(this, allData);
    
    return this.asJson;
  }
}