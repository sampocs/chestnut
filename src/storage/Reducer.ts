import { addWeekToState } from "./InitialState";
import Actions from "./Actions";
import { AppAction, AppState, PurchaseItem } from "./types";

/**
 * Confirm that the given week (e.g. "2022-01-01") and day of week (e.g. "Sunday")
 * exist in the global state
 * @returns {boolean} Returns a boolean indicating if the week and day of week exist
 */
const validateDowInWeek = (
  state: AppState,
  week: string,
  dow: string
): boolean => {
  const weekInState = state.spending.hasOwnProperty(week);
  if (!weekInState) {
    console.log(`Week (${week}) not found in state.`);
    return false;
  }
  const dowInState = state.spending[week].weeklyPurchases.hasOwnProperty(dow);
  if (!dowInState) {
    console.log(`Day of week (${week}, ${dow}) not found in state.`);
    return false;
  }
  return true;
};

/**
 * Helper function to calculate the total amount spent for a given week
 * (Sum of the prices of each purchased item)
 * @param {string[]} daysOfWeek List of days of week
 *  e.g. ["Sunday", ..., "Saturday"]
 * @param {object} weeklyPurchases Object mapping each day of week
 *  to a list containing the items purchased on that day of week
 *  The purchase items should contain both a "name" and "price" key
 */
const calculateTotalWeeklySpend = (
  daysOfWeek: string[],
  weeklyPurchases: { [key: string]: PurchaseItem[] }
): number => {
  let spent = 0;

  for (let dowIndex = 0; dowIndex < daysOfWeek.length; dowIndex++) {
    const dow = daysOfWeek[dowIndex];
    const purchases = weeklyPurchases[dow];

    for (
      let purchaseIndex = 0;
      purchaseIndex < purchases.length;
      purchaseIndex++
    ) {
      const price = purchases[purchaseIndex].price;
      if (typeof price === "number" && !isNaN(price)) {
        spent += price;
      } else if (typeof price === "string") {
        const priceAsNumber = parseInt(price);
        if (!isNaN(priceAsNumber)) {
          spent += priceAsNumber;
        }
      }
    }
  }

  return spent;
};

/**
 * Sets the current week displayed on the main screen
 * using the index into the array of weeks
 * @param {number} index Index of week to snap to
 */
const setWeekFromIndex = (
  state: AppState,
  { index }: { index: number }
): AppState => {
  const newState = { ...state };
  const newWeek = state.weeks[index].weekStartDate;
  newState.currentWeek = newWeek;
  newState.currentWeekIndex = index;
  return newState;
};

/**
 * Sets the current week displayed on the main screen using
 * the start date of the week
 * @param {string} weekStartDate First day of week in format YYYY-MM-DD
 */
const setWeekFromDate = (
  state: AppState,
  { weekStartDate }: { weekStartDate: string }
): AppState => {
  const newState = { ...state };
  for (let index = 0; index < state.weeks.length; index++) {
    if (state.weeks[index].weekStartDate === weekStartDate) {
      newState.currentWeek = weekStartDate;
      newState.currentWeekIndex = index;
    }
  }
  return newState;
};

/**
 * Updates the budget for a given week
 * @param {string} startWeek Internal representation of week
 *  in format YYYY-MM-DD
 * @param {number} budget New budget for the week
 */
const updateBudget = (
  state: AppState,
  { startWeek, budget }: { startWeek: string; budget: number }
): AppState => {
  const newState = { ...state };
  // Loop through and update the budget for every week
  // from the current week, moving forward indefinitely
  for (let i = 0; i < state.weeks.length; i++) {
    const currWeek = state.weeks[i].weekStartDate;
    if (currWeek >= startWeek) {
      newState.spending[currWeek].budget = budget;
    }
  }
  return newState;
};

/**
 * Add a new item to the list of a given day
 * @param {AppState} state Current app state
 * @param {object} payload Action payload
 * @returns {AppState} Updated state with new item
 */
const addItem = (
  state: AppState,
  { item, dayOfWeek }: { item: PurchaseItem; dayOfWeek: string }
): AppState => {
  const week = state.currentWeek;
  // If the week or day of week are invalid, just return the current state
  const dowInState = validateDowInWeek(state, week, dayOfWeek);
  if (!dowInState) {
    return { ...state };
  }

  // Otherwise, add the item to the specified day
  const newState = { ...state };
  const newItemList = [
    ...state.spending[week].weeklyPurchases[dayOfWeek],
    item,
  ];

  newState.spending[week].weeklyPurchases[dayOfWeek] = newItemList;

  // Recalculate the amount spent for the week
  const daysOfWeek = newState.daysOfWeek;
  const weeklyPurchases = newState.spending[week].weeklyPurchases;
  const spent = calculateTotalWeeklySpend(daysOfWeek, weeklyPurchases);

  newState.spending[week].spent = spent;

  return newState;
};

/**
 * Remove a purchase item from the list of times for a given day
 * @param {AppState} state Current app state
 * @param {object} payload Action payload
 * @returns {AppState} Updated state with item removed
 */
const removeItem = (
  state: AppState,
  { itemId, dayOfWeek }: { itemId: string; dayOfWeek: string }
): AppState => {
  const week = state.currentWeek;
  // Confirm valid week and day of week has been provided
  const dowInState = validateDowInWeek(state, week, dayOfWeek);
  if (!dowInState) {
    return { ...state };
  }

  // Remove the item from the list for that week
  const newState = { ...state };
  const itemIndex = newState.spending[week].weeklyPurchases[
    dayOfWeek
  ].findIndex((item) => item.id === itemId);

  if (itemIndex === -1) {
    return { ...state };
  }

  newState.spending[week].weeklyPurchases[dayOfWeek].splice(itemIndex, 1);

  // Recalculate the amount spent for the week
  const daysOfWeek = newState.daysOfWeek;
  const weeklyPurchases = newState.spending[week].weeklyPurchases;
  const spent = calculateTotalWeeklySpend(daysOfWeek, weeklyPurchases);

  newState.spending[week].spent = spent;

  return newState;
};

/**
 * Updates an existing item
 * @param {AppState} state Current app state
 * @param {object} payload Action payload
 * @returns {AppState} Updated state with modified item
 */
const updateItem = (
  state: AppState,
  { item, dayOfWeek }: { item: PurchaseItem; dayOfWeek: string }
): AppState => {
  const week = state.currentWeek;
  // Confirm valid week and day of week has been provided
  const dowInState = validateDowInWeek(state, week, dayOfWeek);
  if (!dowInState) {
    return { ...state };
  }

  // Update item
  const newState = { ...state };
  const itemIndex = newState.spending[week].weeklyPurchases[
    dayOfWeek
  ].findIndex((existingItem) => existingItem.id === item.id);

  if (itemIndex === -1) {
    return { ...state };
  }

  newState.spending[week].weeklyPurchases[dayOfWeek][itemIndex] = item;

  // Recalculate the amount spent for the week
  const daysOfWeek = newState.daysOfWeek;
  const weeklyPurchases = newState.spending[week].weeklyPurchases;
  const spent = calculateTotalWeeklySpend(daysOfWeek, weeklyPurchases);

  newState.spending[week].spent = spent;

  return newState;
};

const Reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case Actions.SET_WEEK_FROM_INDEX:
      return setWeekFromIndex(state, action.payload);
    case Actions.SET_WEEK_FROM_DATE:
      return setWeekFromDate(state, action.payload);
    case Actions.UPDATE_BUDGET:
      return updateBudget(state, {
        startWeek: state.currentWeek,
        budget: action.payload.budget,
      });
    case Actions.ADD_ITEM:
      return addItem(state, action.payload);
    case Actions.REMOVE_ITEM:
      return removeItem(state, action.payload);
    case Actions.UPDATE_ITEM:
      return updateItem(state, action.payload);
    case Actions.ADD_WEEK:
      return addWeekToState(state);
    case Actions.SET_STATE:
      return { ...action.payload.state };
    default:
      return state;
  }
};

export default Reducer;
