import Actions from './Actions.js';
import {
  addWeekToState
} from '../storage/InitialState.js';

/**
 * Confirm that the given week (e.g. "2022-01-01") and day of week (e.g. "Sunday") 
 * exist in the global state
 * @returns {boolean} Returns a boolean indicating if the week and day of week exist
 */
const validateDowInWeek = (state, week, dow) => {
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
}

/**
 * Helper function to calculate the total amount spent for a given week
 * (Sum of the prices of each purchased item)
 * @param {Array[string]} daysOfWeek List of days of week
 *  e.g. ["Sunday", ..., "Saturday"]
 * @param {object} weeklyPurchases Object mapping each day of week
 *  to a list containing the items purchased on that day of week
 *  The purchase items should contain both a "name" and "price" key
 */
const calculateTotalWeeklySpend = (daysOfWeek, weeklyPurchases) => {
  let spent = 0;
  for (let dowIndex = 0; dowIndex < daysOfWeek.length; dowIndex++) {

    let dow = daysOfWeek[dowIndex];
    let purchases = weeklyPurchases[dow];

    for (let purchaseIndex = 0; purchaseIndex < purchases.length; purchaseIndex++) {
      const spentAsInt = parseInt(purchases[purchaseIndex].price)
      if (!isNaN(spentAsInt)) {
        spent += spentAsInt;
      }
    }
  }

  return spent;
}

/**
 * Sets the current week displayed on the main screen using 
 * @param {number} index Index of week to snap to 
 */
const setWeek = (state, { index }) => {
  const newState = { ...state };
  const newWeek = state.weeks[index].weekStartDate;
  newState.currentWeek = newWeek;
  newState.currentWeekIndex = index;
  return newState
}

/**
 * Updates the budget for a given week
 * @param {string} startWeek Internal representation of week
 *  in format YYYY-MM-DD
 * @param {number} budget New budget for the wee 
 */
const updateBudget = (state, { startWeek, budget }) => {
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
}

/**
 * Add a blank item to the list of a given day
 * @param {string} week Internal representation of week
 *  in format YYYY-MM-DD
 * @param {string} dow Day of week (e.g. "Sunday")
 * @returns 
 */
const addItem = (state, { week, dow }) => {
  // If the week or day of week are invalid, just return the current state
  const dowInState = validateDowInWeek(state, week, dow);
  if (!dowInState) {
    return { ...state }
  }

  // Otherwise, add an empty item to the specified day
  const emptyItem = { name: "", price: "" }
  const newState = { ...state };
  const newItemList = [...state.spending[week].weeklyPurchases[dow], emptyItem];

  newState.spending[week].weeklyPurchases[dow] = newItemList;

  return newState
}

/**
 * Remove a purchase item from the list of times for a given day
 * @param {string} week Internal representation of week
 *  in format YYYY-MM-DD
 * @param {string} dow Day of week (e.g. "Sunday")
 * @param {number} itemIndex index of item in list of purchases for that day
 */
const removeItem = (state, { week, dow, itemIndex }) => {
  // Confirm valid week and day of week has been provided
  const dowInState = validateDowInWeek(state, week, dow);
  if (!dowInState) {
    return { ...state }
  }

  // Remove the item from the list for that week
  const newState = { ...state };
  newState.spending[week].weeklyPurchases[dow].splice(itemIndex, 1);

  // Recalculate the amount spent for the week
  const daysOfWeek = newState.daysOfWeek;
  const weeklyPurchases = newState.spending[week].weeklyPurchases;
  const spent = calculateTotalWeeklySpend(daysOfWeek, weeklyPurchases)

  newState.spending[week].spent = spent;

  return newState
}

/**
 * Updates the name or price of an item 
 * @param {string} week Internal representation of week
 *  in format YYYY-MM-DD
 * @param {string} dow Day of week (e.g. "Sunday")
 * @param {number} itemIndex index of item in list of purchases for that day
 * @param {string} itemName new name of item
 * @param {string} itemPrice new price of item
 */
const updateItem = (state, { week, dow, itemIndex, itemName, itemPrice }) => {
  // Confirm valid week and day of week has been provided
  const dowInState = validateDowInWeek(state, week, dow);
  if (!dowInState) {
    return { ...state }
  }

  // Update item
  const newState = { ...state };
  const newItem = newState.spending[week].weeklyPurchases[dow][itemIndex];

  newItem.name = itemName;
  newItem.price = itemPrice;

  // Recalculate the amount spent for the week
  const daysOfWeek = newState.daysOfWeek;
  const weeklyPurchases = newState.spending[week].weeklyPurchases;
  const spent = calculateTotalWeeklySpend(daysOfWeek, weeklyPurchases)

  newState.spending[week].spent = spent;

  return newState;
}

export const Reducer = (state, action) => {
  switch (action.type) {
    case Actions.SET_WEEK:
      return setWeek(state, action.payload);
    case Actions.UPDATE_BUDGET:
      return updateBudget(state, action.payload);
    case Actions.ADD_ITEM:
      return addItem(state, action.payload);
    case Actions.REMOVE_ITEM:
      return removeItem(state, action.payload);
    case Actions.UPDATE_ITEM:
      return updateItem(state, action.payload);
    case Actions.ADD_WEEK:
      return addWeekToState(state);
    default:
      return state;
  }
}