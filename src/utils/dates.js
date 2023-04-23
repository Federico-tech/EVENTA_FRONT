import { DateTime } from 'luxon';

export const DATE_FORMAT = 'dd/MM/yyyy';
export const TIME_FORMAT = 'HH:mm';
export const EVENT_DATE_FORMAT = 'ccc d LLL yyyy';
export const EVENT_DATE_FORMATR_NOYEAR = 'ccc d LLL';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

export const fromDateAndTimeToISODate = (date, time) => {
  const [day, month, year] = date.split('/');
  const [hour, minute] = time.split(':');
  return DateTime.fromObject({ year, month, day, minute, hour }).toISO();
};

export const formatDate = (data, format) => {
  const dateTime = DateTime.fromISO(data);
  const formDate = dateTime.toFormat(format);
  return formDate;
};

export const setTimeElapsed = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffTime = Math.abs(now - date);
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return `${diffSeconds}s`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  } else if (diffHours < 24) {
    return `${diffHours}h`;
  } else if (diffDays < 7) {
    return `${diffDays}d`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks}w`;
  } else if (diffMonths < 12) {
    return `${diffMonths}mh`;
  } else {
    return `${diffYears}year`;
  }
};
