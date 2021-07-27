export type ObjectLike = { [key: string]: any };

declare type PickRequired<T, K extends keyof T> = 
  {
    [Key in keyof T]: T[Key];
  } &
  {
    [P in K]-?: T[P];
  };

type ValueOf<T> = T extends any[] ? T[number] : T[keyof T];

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};