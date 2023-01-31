import { DateTime } from 'luxon';

export const DATE_FORMAT = 'dd/MM/yyyy';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

export const fromDateAndTimeToISODate = (date, time) => {
  const [day, month, year] = date.split('/');
  const [hour, minute] = time.split(':');
  return DateTime.fromObject({ year, month, day, minute, hour }).toISO();
};

export const formatDate = (data) => {
  const dateTime = DateTime.fromISO(data);
  const formDate = dateTime.toFormat('ccc d LLL');
  return formDate;
};

export const formatTime = (data) => {
  const dateTime = DateTime.fromISO(data);
  const formTime = dateTime.toFormat('HH:mm');
  return formTime;
};
