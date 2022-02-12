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
    currentWeek: formatDateInternal(firstWeekStartDate),
    currentWeekIndex: 0,
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
        spent: 0,
        budget: 300,
        weeklyPurchases: daysOfWeek.reduce((purchaseObj, dow) => {
            purchaseObj[dow] = [];
            return purchaseObj;
        }, {})
    }
}

InitialState[formatDateInternal(firstWeekStartDate)].weeklyPurchases = daysOfWeek.reduce((purchaseObj, dow) => {
    purchaseObj[dow] = [
        {name: "The Crepe Shop", price: 8},
        {name: "Marianos", price: 32},
    ];
    return purchaseObj;
}, {})

export default InitialState;