import { injectable } from './utils';

@injectable()
export abstract class BaseIocEntity {
  static diToken: symbol;
} 