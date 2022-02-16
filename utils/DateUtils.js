const moment = require('moment');

const DATE_INTERNAL_FORMAT = "YYYY-MM-DD"
const DATE_DISPLAYED_FORMAT = "MMM D"

/**
 * Returns the current week as a moment date object
 */
export const getCurrentWeekStartDate = () => {
    const sunday = new moment();
    const dowOffset = sunday.day();
    sunday.subtract(dowOffset, 'days');
    
    return sunday
}

/**
 * Given a moment date, returns the date formatted as YYYY-MM-DDD 
 * (e.g. "2022-01-01")
 * @param {moment} date 
 */
export const formatDateInternal = (date) => {
    return date.format(DATE_INTERNAL_FORMAT)
}

/**
 * Given a moment date, returns the date formatted as MMM D 
 * (e.g. "Jan 1")
 * @param {moment} date 
 */
export const formatDateDisplayed = (date) => {
    return date.format(DATE_DISPLAYED_FORMAT)
}

/**
 * Given a moment date, adds {numWeeks} and returns that date
 * @param {moment} startDate First day of week as starting point
 * @param {number} numWeeks Number of week sto add
 * @returns {moment}
 */
export const addWeek = (startDate, numWeeks) => {
    const newDate = new moment(startDate.format(DATE_INTERNAL_FORMAT));
    newDate.add(numWeeks * 7, 'days');
    return newDate
}