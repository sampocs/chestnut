import {
  getCurrentWeekStartDate,
  addWeek,
  formatDateInternal,
  formatDateDisplayed
} from '../utils/DateUtils.js';

/**
 * Example:
 * 
 * {
 *      daysOfWeek: ["Sunday", ..., "Saturday"],
 *      currentWeek: "2022-01-01",
 *      currentWeekIndex: 0,
 *      weeks: [
 *        { weekStartDate: "2022-01-01", weekStartDateFormatted: "Jan 1" },
 *        { weekStartDate: "2022-01-08", weekStartDateFormatted: "Jan 8" },
 *        { weekStartDate: "2022-01-15", weekStartDateFormatted: "Jan 15" },
 *      ],
 *      spending: {
 *         2022-01-01: {
 *          spend: 100,
 *          budget: 400,
 *          weeklyPurchases: [
 *            {name: "Jimmy Johns", price: "20"},
 *            {name: "Jewel", price: "32"},
 *            ...
 *          ]
 *        },
 *        2022-01-08: {
 *          ...
 *        }
 *      }
 * }
 * 
 */

const firstWeekStartDate = getCurrentWeekStartDate();
const numWeeks = 10;
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let InitialState = {
  daysOfWeek: daysOfWeek,
  currentWeek: formatDateInternal(firstWeekStartDate),
  currentWeekIndex: 0,
  weeks: [],
  spending: {}
};
for (let weekNum = 0; weekNum < numWeeks; weekNum++) {
  const weekStartDate = addWeek(firstWeekStartDate, weekNum);
  const weekStartDateInternal = formatDateInternal(weekStartDate);
  const weekStartDateDisplayed = formatDateDisplayed(weekStartDate);

  InitialState.weeks.push({
    weekStartDate: weekStartDateInternal,
    weekStartDateFormatted: weekStartDateDisplayed
  });

  InitialState.spending[weekStartDateInternal] = {
    spent: 0,
    budget: 300,
    weeklyPurchases: daysOfWeek.reduce((purchaseObj, dow) => {
      purchaseObj[dow] = [];
      return purchaseObj;
    }, {})
  }
}

export default InitialState;