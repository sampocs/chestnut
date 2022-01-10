export const Actions = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_ITEM: 'UPDATE_ITEM',
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

    const emptyItem = {name: "", price: "", validEntry: false}
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
        newState[week].total -=  parseInt(removedItem.price)
    }

    return newState
}

const updateItem = (state, {week, dow, itemIndex, item: {name, price}}) => {
    const dowInState = validateDowInWeek(state, week, dow);
    if (!dowInState) {
        return {...state}
    }

    const newState = {...state};
    const newPurchases = [...newState[week].weeklyPurchases[dow]];

    const oldItem = newPurchases[itemIndex];
    const oldPrice = oldItem.price;
    const oldValidStatus = oldItem.validEntry;

    const newItem = {...oldItem};

    newItem.name = name;
    newItem.price = price;
    newItem.validEntry = (name !== '' && price !== '');

    if (oldValidStatus) {
        const priceChange = price - oldPrice;
        newState[week].total += priceChange;
    }

    return newState;
}


export const Reducer = (state, action) => {
    switch (action.type) {
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