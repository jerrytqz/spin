import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'; 

const initialState = {
    inventory: null,
    fetchInventoryLoading: false,
    fetchInventoryError: null,
    listItemLoading: false, 
    listItemError: null 
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
        fetchInventoryError: null  
    });
};

const fetchInventoryFail = (state, action) => {
    return updateObject(state, {
        fetchInventoryError: action.fetchInventoryError, 
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
    const newInventory = { ...state.inventory }; 
    const rawInventory = Object.entries(state.inventory);
    for (const [itemName, info] of rawInventory) {
        if (info.inventoryID === action.inventoryID) {
            if (info.quantity > 1) {
                newInventory[itemName].quantity -= 1; 
            } else delete newInventory[itemName]; 
        }
    }
    return updateObject(state, {
        listItemLoading: false,
        listItemError: null,
        inventory: newInventory
    }); 
};

const listItemFail = (state, action) => {
    return updateObject(state, {
        listItemLoading: false,
        listItemError: action.listItemError
    });
};

const resetListItemError = (state) => {
    return updateObject(state, {
        listItemError: null 
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
        case actionTypes.RESET_LIST_ITEM_ERROR: 
            return resetListItemError(state); 
        default:
            return state;
    }
};

export default reducer; 
