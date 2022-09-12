import * as actionTypes from './actionTypes'; 
import { BACKEND_BASE_DIR } from '../../shared/utility'; 

export const fetchInventoryStart = () => ({
    type: actionTypes.FETCH_INVENTORY_START
});

export const fetchInventorySuccess = (inventory) => ({
    type: actionTypes.FETCH_INVENTORY_SUCCESS,
    inventory: inventory
});

export const fetchInventoryFail = (fetchInventoryError) => ({
    type: actionTypes.FETCH_INVENTORY_FAIL,
    fetchInventoryError: fetchInventoryError 
});

export const listItemStart = () => ({
    type: actionTypes.LIST_ITEM_START
});

export const listItemSuccess = (inventoryID) => ({
    type: actionTypes.LIST_ITEM_SUCCESS,
    inventoryID: inventoryID
});

export const listItemFail = (listItemError) => ({
    type: actionTypes.LIST_ITEM_FAIL,
    listItemError: listItemError 
});

export const resetListItemError = () => ({
    type: actionTypes.RESET_LIST_ITEM_ERROR
});

export const fetchInventory = (token) => {
    return async dispatch => {
        dispatch(fetchInventoryStart()); 
        try {
            const response = await fetch(`${BACKEND_BASE_DIR}/fetch-inventory/`, {
                method: 'POST',
                headers: new Headers({'Authorization': token})
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(fetchInventorySuccess(result)); 
            } else {
                dispatch(fetchInventoryFail(result['fetchInventoryError'])); 
            }
        } catch {
            dispatch(fetchInventoryFail('Unexpected error')); 
        }
    };
};

export const listItem = (token, price, inventoryID) => {
    return async dispatch => {
        dispatch(listItemStart()); 
        const data = new FormData();
        data.append('price', price);  
        data.append('inventoryID', inventoryID);  
        try {
            const response = await fetch(`${BACKEND_BASE_DIR}/list-item/`, {
                method: 'POST',
                headers: new Headers({'Authorization': token}),
                body: data
            });
            const result = await response.json();
            if (response.status === 200) {
                dispatch(listItemSuccess(inventoryID));
            } else {
                dispatch(listItemFail(result['listItemError']));
            }
        } catch {
            dispatch(listItemFail('Unexpected error')); 
        }
    };
};
