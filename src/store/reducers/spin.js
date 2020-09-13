import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'; 

const initialState = {
    SP: 0,
    degree: 0, 
    item: null, 
    fetchSPLoading: false,  
    purchaseSpinLoading: false,
    fetchError: null,
    purchaseError: null,
    freeSPError: null 
}

const fetchSPStart = (state) => {
    return updateObject(state, {
        fetchSPLoading: true 
    })
}

const fetchSPSuccess = (state, action) => {
    return updateObject(state, {
        SP: action.SP,
        fetchError: null,
        fetchSPLoading: false  
    })
}

const fetchSPFail = (state, action) => {
    return updateObject(state, {
        fetchError: action.fetchError,
        SP: 0,
        fetchSPLoading: false  
    })
}

const purchaseSpinStart = (state) => {
    return updateObject(state, {
        purchaseSpinLoading: true
    })
}

const purchaseSpinSuccess = (state, action) => {
    return updateObject(state, {
        SP: action.SP,
        degree: action.degree,
        item: action.item, 
        purchaseError: null,
        purchaseSpinLoading: false
    })
}

const purchaseSpinFail = (state, action) => {
    return updateObject(state, {
        purchaseError: action.purchaseError,
        purchaseSpinLoading: false 
    })
}

const resetPurchaseError = (state) => {
    return updateObject(state, {
        purchaseError: null 
    })
}

const resetDegree = (state) => {
    return updateObject(state, {
        degree: 0
    })
}


const getFreeSPSuccess = (state, action) => {
    return updateObject(state, {
        SP: action.SP,
        freeSPError: null 
    })
}


const getFreeSPFail = (state, action) => {
    return updateObject(state, {
        freeSPError: action.freeSPError
    })
}

const resetFreeSPError = (state) => {
    return updateObject(state, {
        freeSPError: null 
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SP_START: 
        return fetchSPStart(state); 
        case actionTypes.FETCH_SP_SUCCESS:
            return fetchSPSuccess(state, action); 
        case actionTypes.FETCH_SP_FAIL:
            return fetchSPFail(state, action); 
        case actionTypes.PURCHASE_SPIN_SUCCESS:
            return purchaseSpinSuccess(state, action); 
        case actionTypes.PURCHASE_SPIN_FAIL:
            return purchaseSpinFail(state, action); 
        case actionTypes.RESET_PURCHASE_ERROR:
            return resetPurchaseError(state); 
        case actionTypes.RESET_DEGREE: 
            return resetDegree(state); 
        case actionTypes.PURCHASE_SPIN_START: 
            return purchaseSpinStart(state); 
        case actionTypes.GET_FREE_SP_SUCCESS: 
            return getFreeSPSuccess(state, action); 
        case actionTypes.GET_FREE_SP_FAIL: 
            return getFreeSPFail(state, action); 
        case actionTypes.RESET_FREE_SP_ERROR: 
            return resetFreeSPError(state); 
        default:
            return state;
    }
}

export default reducer; 
