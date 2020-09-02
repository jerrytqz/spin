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
