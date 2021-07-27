export type Queries = { [query: string]: any };

export type MergeTypes<U, T> = Pick<U, Exclude<keyof U, keyof T>> & T;

export type Item = { [key: string]: any };

export type Id = string | number;
