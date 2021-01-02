import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    freeSP: 0,
    degree: 0, 
    item: null, 
    buySpinLoading: false,
    buyError: null,
    freeSPError: null,
    unboxings: [] 
};

const buySpinStart = (state) => {
    return updateObject(state, {
        buySpinLoading: true
    });
};

const buySpinSuccess = (state, action) => {
    return updateObject(state, {
        degree: action.degree,
        item: action.item, 
        buyError: null,
        buySpinLoading: false
    });
};

const buySpinFail = (state, action) => {
    return updateObject(state, {
        buyError: action.buyError,
        buySpinLoading: false 
    });
};

const resetBuyError = (state) => {
    return updateObject(state, {
        buyError: null 
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
        'itemName': action.itemName,
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
            return buySpinSuccess(state, action); 
        case actionTypes.PURCHASE_SPIN_FAIL:
            return buySpinFail(state, action); 
        case actionTypes.RESET_PURCHASE_ERROR:
            return resetBuyError(state); 
        case actionTypes.RESET_DEGREE: 
            return resetDegree(state); 
        case actionTypes.PURCHASE_SPIN_START: 
            return buySpinStart(state); 
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
