import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'; 

const initialState = {
    inventory: null,
    fetchInventoryLoading: false,
    fetchError: null,
    listItemLoading: false, 
    listError: null 
};

const fetchInventoryStart = (state) => {
    return updateObject(state, {
        fetchInventoryLoading: true
    });
};

const fetchInventorySuccess = (state, action) => {
    return updateObject(state, {
        inventory: action.inventory,
        fetchInventoryLoading: false,
        fetchError: null  
    });
};

const fetchInventoryFail = (state, action) => {
    return updateObject(state, {
        fetchError: action.fetchError, 
        fetchInventoryLoading: false,
        inventory: null 
    });
};

const listItemStart = (state) => {
    return updateObject(state, {
        listItemLoading: true
    });
};

const listItemSuccess = (state, action) => {
    let newInventory = { ...state.inventory }; 
    const rawInventory = Object.entries(state.inventory);
    for (const [item, info] of rawInventory) {
        if (info.itemID === action.itemID) {
            if (info.quantity > 1) {
                newInventory[item].quantity -= 1; 
            } else delete newInventory[item]; 
        }
    }
    return updateObject(state, {
        listItemLoading: false,
        listError: null,
        inventory: newInventory
    }); 
};

const listItemFail = (state, action) => {
    return updateObject(state, {
        listItemLoading: false,
        listError: action.listError
    });
};

const clearListError = (state) => {
    return updateObject(state, {
        listError: null 
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INVENTORY_START:
            return fetchInventoryStart(state); 
        case actionTypes.FETCH_INVENTORY_SUCCESS:
            return fetchInventorySuccess(state, action); 
        case actionTypes.FETCH_INVENTORY_FAIL:
            return fetchInventoryFail(state, action); 
        case actionTypes.LIST_ITEM_START: 
            return listItemStart(state); 
        case actionTypes.LIST_ITEM_SUCCESS: 
            return listItemSuccess(state, action); 
        case actionTypes.LIST_ITEM_FAIL: 
            return listItemFail(state, action);
        case actionTypes.CLEAR_LIST_ERROR: 
            return clearListError(state); 
        default:
            return state;
    }
};

export default reducer; 
