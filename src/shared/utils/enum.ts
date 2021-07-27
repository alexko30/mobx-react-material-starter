import { $enum } from 'ts-enum-util';

type EnumType<T> = Record<Extract<keyof T, string>, string | number>;

export const getEnumKeys = <T extends EnumType<T>>(enumLiteral: T) => {
  return $enum(enumLiteral).getKeys() as Array<keyof T>;
};

type EnumValue = number | string;

export const getEnumValues = <T extends EnumType<T>>(enumLiteral: T) => {
  return $enum<T>(enumLiteral).getValues() as Array<EnumValue>;
};