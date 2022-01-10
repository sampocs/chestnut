import { formatDate, getCurrentWeek, addWeek } from './DateUtils.js';

const firstWeek = getCurrentWeek();
const numWeeks = 10;
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let InitialState = {
    daysOfWeek: daysOfWeek,
    weeks: []
};
for (let weekNum = 0; weekNum < numWeeks; weekNum++) {
    const week = formatDate(addWeek(firstWeek, weekNum));
    InitialState.weeks.push(week);
    InitialState[week] = { 
        total: 0,
        weeklyPurchases: daysOfWeek.reduce((purchaseObj, dow) => {
            purchaseObj[dow] = [];
            return purchaseObj;
        }, {})
    }
}

export default InitialState;