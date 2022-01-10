import { 
    getCurrentWeekStartDate, 
    addWeek, 
    formatDateInternal, 
    formatDateDisplayed 
} from './DateUtils.js';

const firstWeekStartDate = getCurrentWeekStartDate();
const numWeeks = 10;
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let InitialState = {
    currentWeek: firstWeekStartDate,
    daysOfWeek: daysOfWeek,
    weeks: []
};
for (let weekNum = 0; weekNum < numWeeks; weekNum++) {
    const weekStartDate = addWeek(firstWeekStartDate, weekNum);
    const weekStartDateInternal = formatDateInternal(weekStartDate);
    const weekStartDateDisplayed = formatDateDisplayed(weekStartDate);

    InitialState.weeks.push({
        weekStartDate: weekStartDateInternal, 
        weekStartDateFormatted: weekStartDateDisplayed
    });

    InitialState[weekStartDateInternal] = { 
        total: 0,
        weeklyPurchases: daysOfWeek.reduce((purchaseObj, dow) => {
            purchaseObj[dow] = [];
            return purchaseObj;
        }, {})
    }
}

export default InitialState;