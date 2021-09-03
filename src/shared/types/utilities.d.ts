declare type Queries = { [query: string]: unknown };

declare type MergeTypes<U, T> = Pick<U, Exclude<keyof U, keyof T>> & T;

declare type Item = { [key: string]: unknown };

declare type Id = string | number;
