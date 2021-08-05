import moment, { unitOfTime } from 'moment';

export const isAfter = (compareToDate: string, comparableDate: string, compareType?: unitOfTime.StartOf, utc?: boolean) => {
  const init = utc ? moment.utc : moment;

  return init(comparableDate).isAfter(compareToDate, compareType);
};

export const formatDate = (date: string | Date, format: string = 'll', utc: boolean = false) => {
  if (utc) {
    return moment.utc(date).format(format);
  }

  return moment(date).format(format);
};

export const dateUtils = moment;