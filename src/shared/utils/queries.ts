import qs, { IParseOptions } from 'qs';
import { LocationDescriptorObject } from 'history';
import omitBy from 'lodash/omitBy';

import { history } from '@shared/utils/history';

export const getQueries = (options?: IParseOptions): Queries => qs.parse(
  history.location.search,
  { ignoreQueryPrefix: true, arrayLimit: Infinity, ...options }
);

export const parseQueries = (queries: string): Queries => qs.parse(queries, { ignoreQueryPrefix: true, interpretNumericEntities: true });

export const getQueriesAsSearch = (queries?: Queries): string =>
  qs.stringify({ ...(queries || getQueries()) }, { addQueryPrefix: true, encode: true });

export const setQueries = (queries: Queries, replace?: boolean, locationArgs?: Partial<LocationDescriptorObject>) => {
  const args = {
    search: qs.stringify(omitBy(queries, (value) => !value), { addQueryPrefix: true }),
    ...locationArgs
  };

  if (replace) {
    return history.replace(args);
  }

  return history.push(args);
};

export const deleteQueries = (queriesToDelete?: Array<string>, replace?: boolean, locationArgs?: Partial<LocationDescriptorObject>) => {
  if (!queriesToDelete) {
    return setQueries({}, replace, locationArgs);
  }

  const currentQueries = getQueries();
  const finalQueries = omitBy(currentQueries, (value, key) => queriesToDelete.includes(key));

  setQueries(finalQueries, replace, locationArgs);
};