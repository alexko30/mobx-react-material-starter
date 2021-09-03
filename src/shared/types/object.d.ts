export type ObjectLike = { [key: string]: unknown };

declare type PickRequired<T, K extends keyof T> = 
  {
    [Key in keyof T]: T[Key];
  } &
  {
    [P in K]-?: T[P];
  };

type ValueOf<T> = T extends unknown[] ? T[number] : T[keyof T];

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};