import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/Functions/utility'; 

const initialState = {
    SP: 0,
    fetchError: null,
    purchaseError: null  
}

const setSP = (state, action) => {
    return updateObject(state, {
        SP: action.SP,
        fetchError: null 
    })
}

const setSPFail = (state, action) => {
    return updateObject(state, {
        fetchError: action.fetchError,
        SP: 0  
    })
}

const purchaseSpinClient = (state, action) => {
    return updateObject(state, {
        SP: action.SP,
        purchaseError: null 
    })
}

const purchaseSpinFail = (state, action) => {
    return updateObject(state, {
        purchaseError: action.purchaseError
    })
}

const resetPurchaseError = (state) => {
    return updateObject(state, {
        purchaseError: null 
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SP:
            return setSP(state, action); 
        case actionTypes.SET_SP_FAIL:
            return setSPFail(state, action); 
        case actionTypes.PURCHASE_SPIN_CLIENT:
            return purchaseSpinClient(state, action); 
        case actionTypes.PURCHASE_SPIN_FAIL:
            return purchaseSpinFail(state, action); 
        case actionTypes.RESET_PURCHASE_ERROR:
            return resetPurchaseError(state); 
        default:
            return state;
    }
}

export default reducer; 
