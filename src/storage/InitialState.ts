import {
  getCurrentWeekStartDate,
  formatDateInternal,
  formatDateDisplayed,
  getMomentDateFromString,
  addWeekToDate,
} from "../utils/DateUtils";
import { AppState, Week, WeeklySpending } from "./types";

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

export const NUM_WEEKS_IN_FUTURE = 10;
const firstWeekStartDate = getCurrentWeekStartDate();
const firstWeekInternal = formatDateInternal(firstWeekStartDate);
const firstWeekDisplayed = formatDateDisplayed(firstWeekStartDate);
const initialBudget = 300;
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Helper function to return an empty list of items for each day of week
 * E.g.
 *  {
 *    "Sunday": [],
 *    "Monday": [],
 *     ...
 *  }
 */
const getEmptyPurchaseItemList = (): { [key: string]: [] } => {
  return daysOfWeek.reduce((purchaseObj, dow) => {
    purchaseObj[dow] = [];
    return purchaseObj;
  }, {} as { [key: string]: [] });
};

/**
 * Helper function to add a new week to the end of the global state
 * @param {AppState} state Existing state
 * @returns {AppState} New state with added week
 */
export const addWeekToState = (state: AppState): AppState => {
  const newState = { ...state };

  // Get the budget from the week at the end of the list
  const lastWeek = newState.weeks[newState.weeks.length - 1].weekStartDate;
  const budget = newState.spending[lastWeek].budget;

  // Add the next week to the list of week start dates
  const newWeek = addWeekToDate(getMomentDateFromString(lastWeek), 1);
  const weekStartDateInternal = formatDateInternal(newWeek);
  const weekStartDateDisplayed = formatDateDisplayed(newWeek);

  const newWeekEntry: Week = {
    weekStartDate: weekStartDateInternal,
    weekStartDateFormatted: weekStartDateDisplayed,
  };

  newState.weeks = [...newState.weeks, newWeekEntry];

  // Add an empty list of purchases for that week
  const newWeekSpending: WeeklySpending = {
    spent: 0,
    budget: budget,
    weeklyPurchases: getEmptyPurchaseItemList() as { [key: string]: [] },
  };

  newState.spending[weekStartDateInternal] = newWeekSpending;

  return newState;
};

const baseInitialState: AppState = {
  daysOfWeek: daysOfWeek,
  currentWeek: formatDateInternal(firstWeekStartDate),
  currentWeekIndex: 0,
  weeks: [
    {
      weekStartDate: firstWeekInternal,
      weekStartDateFormatted: firstWeekDisplayed,
    },
  ],
  spending: {
    [firstWeekInternal]: {
      spent: 0,
      budget: initialBudget,
      weeklyPurchases: getEmptyPurchaseItemList() as { [key: string]: [] },
    },
  },
};

let InitialState: AppState = { ...baseInitialState };

for (let weekNum = 0; weekNum < NUM_WEEKS_IN_FUTURE; weekNum++) {
  InitialState = addWeekToState(InitialState);
}

export default InitialState;
