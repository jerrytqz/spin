import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    freeSP: 0,
    degree: 0, 
    item: null, 
    purchaseSpinLoading: false,
    purchaseError: null,
    freeSPError: null,
    unboxings: [] 
};

const purchaseSpinStart = (state) => {
    return updateObject(state, {
        purchaseSpinLoading: true
    });
};

const purchaseSpinSuccess = (state, action) => {
    return updateObject(state, {
        degree: action.degree,
        item: action.item, 
        purchaseError: null,
        purchaseSpinLoading: false
    });
};

const purchaseSpinFail = (state, action) => {
    return updateObject(state, {
        purchaseError: action.purchaseError,
        purchaseSpinLoading: false 
    });
};

const resetPurchaseError = (state) => {
    return updateObject(state, {
        purchaseError: null 
    });
};

const resetDegree = (state) => {
    return updateObject(state, {
        degree: 0
    });
};

const getFreeSPSuccess = (state, action) => {
    return updateObject(state, {
        freeSP: action.freeSP,
        freeSPError: null 
    });
};

const getFreeSPFail = (state, action) => {
    return updateObject(state, {
        freeSPError: action.freeSPError
    });
};

const resetFreeSPError = (state) => {
    return updateObject(state, {
        freeSPError: null 
    });
};

const itemUnboxed = (state, action) => {
    const newUnboxings = state.unboxings; 
    newUnboxings.push({
        'item': action.item,
        'rarity': action.rarity,
        'unboxer': action.unboxer 
    });
    if (newUnboxings.length > 10) {
        newUnboxings.shift(); 
    }
    return updateObject(state, {
        unboxings: [...newUnboxings]
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
        case actionTypes.ITEM_UNBOXED: 
            return itemUnboxed(state, action); 
        default:
            return state;
    }
};

export default reducer; 
