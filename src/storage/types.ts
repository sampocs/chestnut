import Actions from "./Actions";

export interface PurchaseItem {
  id: string;
  name: string;
  price: number;
}

export interface Week {
  weekStartDate: string;
  weekStartDateFormatted: string;
}

export interface WeeklySpending {
  spent: number;
  budget: number;
  weeklyPurchases: {
    [day: string]: PurchaseItem[];
  };
}

export interface AppState {
  daysOfWeek: string[];
  currentWeek: string;
  currentWeekIndex: number;
  weeks: Week[];
  spending: {
    [weekStartDate: string]: WeeklySpending;
  };
}

// Action types
export interface SetWeekFromIndexAction {
  type: typeof Actions.SET_WEEK_FROM_INDEX;
  payload: {
    index: number;
  };
}

export interface SetWeekFromDateAction {
  type: typeof Actions.SET_WEEK_FROM_DATE;
  payload: {
    weekStartDate: string;
  };
}

export interface UpdateBudgetAction {
  type: typeof Actions.UPDATE_BUDGET;
  payload: {
    budget: number;
  };
}

export interface AddItemAction {
  type: typeof Actions.ADD_ITEM;
  payload: {
    item: PurchaseItem;
    dayOfWeek: string;
  };
}

export interface RemoveItemAction {
  type: typeof Actions.REMOVE_ITEM;
  payload: {
    itemId: string;
    dayOfWeek: string;
  };
}

export interface UpdateItemAction {
  type: typeof Actions.UPDATE_ITEM;
  payload: {
    item: PurchaseItem;
    dayOfWeek: string;
  };
}

export interface AddWeekAction {
  type: typeof Actions.ADD_WEEK;
  payload: null;
}

export interface SetStateAction {
  type: typeof Actions.SET_STATE;
  payload: {
    state: AppState;
  };
}

export type AppAction =
  | SetWeekFromIndexAction
  | SetWeekFromDateAction
  | UpdateBudgetAction
  | AddItemAction
  | RemoveItemAction
  | UpdateItemAction
  | AddWeekAction
  | SetStateAction;
