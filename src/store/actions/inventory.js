import * as actionTypes from './actionTypes'; 
import { BACKEND_BASE_DIR } from '../../shared/utility'; 

export const fetchInventoryStart = () => ({
    type: actionTypes.FETCH_INVENTORY_START
});

export const fetchInventorySuccess = (inventory) => ({
    type: actionTypes.FETCH_INVENTORY_SUCCESS,
    inventory: inventory
});

export const fetchInventoryFail = (fetchError) => ({
    type: actionTypes.FETCH_INVENTORY_FAIL,
    fetchError: fetchError 
});

export const listItemStart = () => ({
    type: actionTypes.LIST_ITEM_START
});

export const listItemSuccess = (itemID) => ({
    type: actionTypes.LIST_ITEM_SUCCESS,
    itemID: itemID
});

export const listItemFail = (listError) => ({
    type: actionTypes.LIST_ITEM_FAIL,
    listError: listError 
});

export const clearListError = () => ({
    type: actionTypes.CLEAR_LIST_ERROR
});

export const fetchInventory = (token) => {
    return async dispatch => {
        dispatch(fetchInventoryStart()); 
        try {
            const response = await fetch(`${BACKEND_BASE_DIR}fetch-inventory/`, {
                method: 'GET',
                headers: new Headers({'Authorization': token})
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(fetchInventorySuccess(result)); 
            } else {
                dispatch(fetchInventoryFail(result['fetchError'])); 
            }
        } catch {
            dispatch(fetchInventoryFail('Unexpected error')); 
        }
    };
};

export const listItem = (token, price, itemID) => {
    return async dispatch => {
        dispatch(listItemStart()); 
        const data = new FormData();
        data.append('price', price);  
        data.append('itemID', itemID);  
        try {
            const response = await fetch(`${BACKEND_BASE_DIR}list-item/`, {
                method: 'POST',
                headers: new Headers({'Authorization': token}),
                body: data
            });
            const result = await response.json();
            if (response.status === 200) {
                dispatch(listItemSuccess(itemID));
            } else {
                dispatch(listItemFail(result['listError']));
            }
        } catch {
            dispatch(listItemFail('Unexpected error')); 
        }
    };
};
