import * as actionTypes from './actionTypes'; 

export const fetchInventoryStart = () => ({
    type: actionTypes.FETCH_INVENTORY_START
})

export const fetchInventorySuccess = (inventory) => ({
    type: actionTypes.FETCH_INVENTORY_SUCCESS,
    inventory: inventory
})

export const fetchInventoryFail = (fetchError) => ({
    type: actionTypes.FETCH_INVENTORY_FAIL,
    fetchError: fetchError 
})

export const listItemStart = () => ({
    type: actionTypes.LIST_ITEM_START
})

export const listItemSuccess = () => ({
    type: actionTypes.LIST_ITEM_SUCCESS
})

export const listItemFail = (listError) => ({
    type: actionTypes.LIST_ITEM_FAIL,
    listError: listError 
})

export const clearListError = () => ({
    type: actionTypes.CLEAR_LIST_ERROR
})

export const fetchInventory = (token) => {
    return async dispatch => {
        dispatch(fetchInventoryStart()); 
        try {
            let response = await fetch('http://127.0.0.1:8000/fetch-inventory/', {
                method: 'GET',
                headers: new Headers({'Authorization': token})
            });
            let result = await response.json(); 
            if (response.status === 200) {
                dispatch(fetchInventorySuccess(result)); 
            }
            else {
                dispatch(fetchInventoryFail(result['fetchError'])); 
            }
        }
        catch {
            dispatch(fetchInventoryFail('Unexpected error')); 
        }
    }
}

export const listItem = (token, price, itemID) => {
    return async dispatch => {
        dispatch(listItemStart()); 
        const data = new FormData();
        data.append('price', price);  
        data.append('itemID', itemID);  
        try {
            let response = await fetch('http://127.0.0.1:8000/list-item/', {
                method: 'POST',
                headers: new Headers({'Authorization': token}),
                body: data 
            });
            let result = await response.json(); 
            if (response.status === 200) {
                dispatch(listItemSuccess()); 
            }
            else {
                dispatch(listItemFail(result['listError'])); 
            }
        }
        catch {
            dispatch(listItemFail('Unexpected error')); 
        }
    }
}
