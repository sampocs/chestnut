const moment = require('moment');

const DATE_INTERNAL_FORMAT = "YYYY-MM-DD"
const DATE_DISPLAYED_FORMAT = "MMM D"

export const getCurrentWeekStartDate = () => {
    const sunday = new moment();
    const dowOffset = sunday.day();
    sunday.subtract(dowOffset, 'days');
    
    return sunday
}

export const formatDateInternal = (date) => {
    return date.format(DATE_INTERNAL_FORMAT)
}

export const formatDateDisplayed = (date) => {
    return date.format(DATE_DISPLAYED_FORMAT)
}

export const addWeek = (startDate, numWeeks) => {
    const newDate = new moment(startDate.format(DATE_INTERNAL_FORMAT));
    newDate.add(numWeeks * 7, 'days');
    return newDate
}