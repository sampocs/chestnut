import moment from "moment";

const DATE_INTERNAL_FORMAT = "YYYY-MM-DD";
const DATE_DISPLAYED_FORMAT = "MMM D";

/**
 * Returns the current week as a moment date object
 * @returns {moment.Moment}
 */
export const getCurrentWeekStartDate = (): moment.Moment => {
  const sunday = moment();
  const dowOffset = sunday.day();
  sunday.subtract(dowOffset, "days");

  return sunday;
};

/**
 * Given a date string in the format YYYY-MM-DD,
 * returns a moment date
 * @param {string} dateString
 * @returns {moment.Moment}
 */
export const getMomentDateFromString = (dateString: string): moment.Moment => {
  return moment(dateString);
};

/**
 * Given a moment date, returns the date formatted as YYYY-MM-DDD
 * (e.g. "2022-01-01")
 * @param {moment.Moment} date
 * @returns {string}
 */
export const formatDateInternal = (date: moment.Moment): string => {
  return date.format(DATE_INTERNAL_FORMAT);
};

/**
 * Given a moment date, returns the date formatted as MMM D
 * (e.g. "Jan 1")
 * @param {moment.Moment} date
 * @returns {string}
 */
export const formatDateDisplayed = (date: moment.Moment): string => {
  return date.format(DATE_DISPLAYED_FORMAT);
};

/**
 * Returns the start date of the week that's {numWeeks} after a provided date
 * @param {moment.Moment} startWeek First day of week (acts as starting point)
 * @param {number} numWeeks Number of weeks to add to {startWeek}
 * @returns {moment.Moment} Start date of the new week
 */
export const addWeekToDate = (
  startWeek: moment.Moment,
  numWeeks: number
): moment.Moment => {
  const newDate = moment(startWeek.format(DATE_INTERNAL_FORMAT));
  newDate.add(numWeeks * 7, "days");
  return newDate;
};

/**
 * Returns the number of weeks between the two dates
 * @param {string} startDate Start date in format YYYY-MM-DD
 * @param {string} endDate End date in format YYYY-MM-DD
 * @returns {number} Number of weeks between the dates
 */
export const getWeekDifference = (
  startDate: string,
  endDate: string
): number => {
  const end = moment(endDate);
  const start = moment(startDate);
  const dateDiff = moment.duration(end.diff(start)).asDays();
  return dateDiff / 7;
};
