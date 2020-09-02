import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/Functions/utility'; 

const initialState = {
    inventory: null,
    fetchInventoryLoading: false,
    fetchError: null 
}

const fetchInventoryStart = (state) => {
    return updateObject(state, {
        fetchInventoryLoading: true
    })
}

const fetchInventorySuccess = (state, action) => {
    return updateObject(state, {
        inventory: action.inventory,
        fetchInventoryLoading: false,
        fetchError: null  
    })
}

const fetchInventoryFail = (state, action) => {
    return updateObject(state, {
        fetchError: action.fetchError, 
        fetchInventoryLoading: false,
        inventory: null 
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INVENTORY_START:
            return fetchInventoryStart(state); 
        case actionTypes.FETCH_INVENTORY_SUCCESS:
            return fetchInventorySuccess(state, action); 
        case actionTypes.FETCH_INVENTORY_FAIL:
            return fetchInventoryFail(state, action); 
        default:
            return state;
    }
}

export default reducer; 
