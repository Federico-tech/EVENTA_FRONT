import { DateTime } from 'luxon';

export const DATE_FORMAT = 'dd/MM/yyyy';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

export const fromDateAndTimeToISODate = (date, time) => {
  const [day, month, year] = date.split('/');
  const [hour, minute] = time.split(':');
  return DateTime.fromObject({ year, month, day, minute, hour }).toISO();
};