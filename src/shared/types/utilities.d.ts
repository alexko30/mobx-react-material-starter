declare type Queries = { [query: string]: any };

declare type MergeTypes<U, T> = Pick<U, Exclude<keyof U, keyof T>> & T;

declare type Item = { [key: string]: any };

declare type Id = string | number;
