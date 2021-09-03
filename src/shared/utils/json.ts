export const serialize = <T = unknown>(data: T) => {
  return JSON.stringify(data);
};

export const deserialize = <T = unknown>(str: null | string, defaultValue: T) => {
  try {
    return JSON.parse(str || '');
  } catch {
    return defaultValue;
  }
};