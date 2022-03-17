const moment = require('moment');

const DATE_INTERNAL_FORMAT = "YYYY-MM-DD"
const DATE_DISPLAYED_FORMAT = "MMM D"

/**
 * Returns the current week as a moment date object
 * @returns {moment}
 */
export const getCurrentWeekStartDate = () => {
  const sunday = new moment();
  const dowOffset = sunday.day();
  sunday.subtract(dowOffset, 'days');

  return sunday
}

/**
 * Given a date string in the format YYYY-MM-DD,
 * returns a moment date
 * @param {string} dateString 
 * @returns {moment}
 */
export const getMomentDateFromString = (dateString) => {
  return new moment(dateString)
}
/**
 * Given a moment date, returns the date formatted as YYYY-MM-DDD 
 * (e.g. "2022-01-01")
 * @param {moment} date 
 * @returns {string}
 */
export const formatDateInternal = (date) => {
  return date.format(DATE_INTERNAL_FORMAT)
}

/**
 * Given a moment date, returns the date formatted as MMM D 
 * (e.g. "Jan 1")
 * @param {moment} date 
 * @returns {string}
 */
export const formatDateDisplayed = (date) => {
  return date.format(DATE_DISPLAYED_FORMAT)
}

/**
 * Returns the start date of the week that's {numWeeks} after a provided date
 * @param {moment} startWeek First day of week (acts as starting point)
 * @param {number} numWeeks Number of weeks to add to {startWeek} 
 * @returns {moment} Start date of the new week
 */
export const addWeekToDate = (startWeek, numWeeks) => {
  const newDate = new moment(startWeek.format(DATE_INTERNAL_FORMAT));
  newDate.add(numWeeks * 7, 'days');
  return newDate
}

/**
 * Returns the number of weeks between the two dates
 * @param {string} startDate Start date in format YYYY-MM-DD
 * @param {string} endDate End date in format YYYY-MM-DD
 */
export const getWeekDifference = (startDate, endDate) => {
  const end =  new moment(endDate)
  const start = new moment(startDate);
  const dateDiff = moment.duration(end.diff(start)).asDays();
  return (dateDiff / 7);
}
