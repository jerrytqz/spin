import * as actionTypes from './actionTypes'; 
import { BACKEND_BASE_DIR } from '../../shared/utility'; 

export const buySpinStart = () => ({
    type: actionTypes.PURCHASE_SPIN_START
});

export const buySpinSuccess = (degree, item) => ({
    type: actionTypes.PURCHASE_SPIN_SUCCESS,
    degree: degree,
    item: item   
});

export const buySpinFail = (buyError) => ({
    type: actionTypes.PURCHASE_SPIN_FAIL,
    buyError: buyError
});

export const resetBuyError = () => ({
    type: actionTypes.RESET_PURCHASE_ERROR
});

export const resetDegree = () => ({
    type: actionTypes.RESET_DEGREE
});

export const buySpin = (token) => {
    return async dispatch => {
        dispatch(buySpinStart()); 
        try {
            const response = await fetch(`${BACKEND_BASE_DIR}buy-spin/`, {
                method: 'POST',
                headers: new Headers({'Authorization': token})
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(buySpinSuccess(result['degree'], result['item'])); 
            } else {
                dispatch(buySpinFail(result['buyError'])); 
            }
        } catch {
            dispatch(buySpinFail('Unexpected error')); 
        }
    };
};

export const getFreeSPSuccess = (freeSP) => ({
    type: actionTypes.GET_FREE_SP_SUCCESS,
    freeSP: freeSP
});

export const getFreeSPFail = (freeSPError) => ({
    type: actionTypes.GET_FREE_SP_FAIL,
    freeSPError: freeSPError
});

export const resetFreeSPError = () => ({
    type: actionTypes.RESET_FREE_SP_ERROR
});

export const getFreeSP = (token) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BACKEND_BASE_DIR}free-sp/`, {
                method: 'GET',
                headers: new Headers({'Authorization': token})
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(getFreeSPSuccess(result['freeSP'])); 
            } else {
                dispatch(getFreeSPFail(result['freeSPError'])); 
            }
        } catch {
            dispatch(getFreeSPFail('Unexpected error')); 
        }
    };
};

export const itemUnboxed = (itemName, rarity, unboxer) => ({
    type: actionTypes.ITEM_UNBOXED,
    itemName: itemName,
    rarity: rarity,
    unboxer: unboxer 
});
