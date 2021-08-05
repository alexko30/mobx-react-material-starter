type Ids = { [key: string]: string };

export const normalizeIds = <T extends Ids>(prefix: string, ids: T): T => {
  return Object.keys(ids).reduce<Ids>((acc, key) => {
    const value = `${prefix}-${key}`;

    acc[key] = value;

    return acc;
  }, {}) as T;
};