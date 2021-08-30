import qs, { IParseOptions } from 'qs';
import omitBy from 'lodash/omitBy';

import { appHistory, AppLocationDescriptorObject } from '@shared/utils/history';

export const getQueries = (options?: IParseOptions): Queries => qs.parse(
  appHistory.location.search,
  { ignoreQueryPrefix: true, arrayLimit: Infinity, ...options }
);

export const parseQueries = (queries: string): Queries => qs.parse(queries, { ignoreQueryPrefix: true, interpretNumericEntities: true });

export const getQueriesAsSearch = (queries?: Queries): string =>
  qs.stringify({ ...(queries || getQueries()) }, { addQueryPrefix: true, encode: true });

export const setQueries = (queries: Queries, replace?: boolean, locationArgs?: Partial<AppLocationDescriptorObject>) => {
  const args = {
    search: qs.stringify(omitBy(queries, (value) => !value), { addQueryPrefix: true }),
    ...locationArgs
  };

  if (replace) {
    return appHistory.replace(args);
  }

  return appHistory.push(args);
};

export const deleteQueries = (queriesToDelete?: Array<string>, replace?: boolean, locationArgs?: Partial<AppLocationDescriptorObject>) => {
  if (!queriesToDelete) {
    return setQueries({}, replace, locationArgs);
  }

  const currentQueries = getQueries();
  const finalQueries = omitBy(currentQueries, (value, key) => queriesToDelete.includes(key));

  setQueries(finalQueries, replace, locationArgs);
};