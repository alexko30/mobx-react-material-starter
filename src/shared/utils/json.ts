export const serialize = (data: any) => {
  return JSON.stringify(data);
};

export const deserialize = (str: null | string, defaultValue: any = {}) => {
  try {
    return JSON.parse(str || '');
  } catch {
    return defaultValue;
  }
};