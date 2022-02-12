import Actions from './Actions.js';

const setWeek = (state, { index }) => {
    const newState = {...state};
    const newWeek = state.weeks[index].weekStartDate;
    newState.currentWeek = newWeek;
    newState.currentWeekIndex = index;
    return newState
}

const updateBudget = (state, { startWeek, budget }) => {
    const newState = {...state};
    for (let i = 0; i < state.weeks.length; i++) {
        const currWeek = state.weeks[i].weekStartDate;
        if (currWeek >= startWeek) {
            newState[currWeek].budget = budget;
        }
    }
    return newState;
}

const validateDowInWeek = (state, week, dow) => {
    const weekInState = state.hasOwnProperty(week);
    if (!weekInState) {
        console.log(`Week (${week}) not found in state.`);
        return false;
    }
    const dowInState = state[week].weeklyPurchases.hasOwnProperty(dow);
    if (!dowInState) {
        console.log(`Day of week (${week}, ${dow}) not found in state.`);
        return false;
    }
    return true;
}

const addItem = (state, {week, dow}) => {
    const dowInState = validateDowInWeek(state, week, dow);
    if (!dowInState) {
        return {...state}
    }

    const emptyItem = {name: "", price: ""}
    const newState = {...state};
    const newItemList = [...state[week].weeklyPurchases[dow], emptyItem];

    newState[week].weeklyPurchases[dow] = newItemList;

    return newState
}

const removeItem = (state, {week, dow, itemIndex}) => {
    const dowInState = validateDowInWeek(state, week, dow);
    if (!dowInState) {
        return {...state}
    }

    const newState = {...state};
    const removedItem = newState[week].weeklyPurchases[dow].splice(itemIndex, 1);
    if (removeItem.validEntry) {
        newState[week].spent -=  parseInt(removedItem.price)
    }

    return newState
}

const updateItem = (state, { week, dow, itemIndex, itemName, itemPrice }) => {
    const dowInState = validateDowInWeek(state, week, dow);
    if (!dowInState) {
        return {...state}
    }

    const newState = {...state};
    const newItem = newState[week].weeklyPurchases[dow][itemIndex];

    newItem.name = itemName;
    newItem.price = itemPrice;

    const daysOfWeek = newState.daysOfWeek;

    let spent = 0;
    for (let dowIndex = 0; dowIndex < daysOfWeek.length; dowIndex++) {

        let purchases = newState[week].weeklyPurchases[daysOfWeek[dowIndex]];
        for (let purchaseIndex = 0; purchaseIndex < purchases.length; purchaseIndex++) {
            const spentAsInt = parseInt(purchases[purchaseIndex].price)
            if (!isNaN(spentAsInt)) {
                spent += spentAsInt
            }
        }
    }

    newState[week].spent = spent;

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
        default:
            return state;
    }
}