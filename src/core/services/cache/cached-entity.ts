import { dateUtils } from '@shared/utils/date';

export class CachedEntity<T> {
  private _expiredAt: string;
  private _data: T;

  constructor({ expiredAt, data }: { expiredAt: string; data: T }) {
    this._expiredAt = expiredAt;
    this._data = data;
  }

  get expired() {
    const currentTime = dateUtils.utc();

    return currentTime.isAfter(this._expiredAt);
  }

  toJson() {
    return {
      expiredAt: this._expiredAt,
      data: this._data,
    };
  }
}