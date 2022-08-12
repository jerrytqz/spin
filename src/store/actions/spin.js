import * as actionTypes from './actionTypes'; 
import { BACKEND_BASE_DIR } from '../../shared/utility'; 

export const buySpinStart = () => ({
    type: actionTypes.BUY_SPIN_START
});

export const buySpinSuccess = (degree, item) => ({
    type: actionTypes.BUY_SPIN_SUCCESS,
    degree: degree,
    item: item   
});

export const buySpinFail = (buySpinError) => ({
    type: actionTypes.BUY_SPIN_FAIL,
    buySpinError: buySpinError
});

export const resetBuySpinError = () => ({
    type: actionTypes.RESET_BUY_SPIN_ERROR
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
                dispatch(buySpinFail(result['buySpinError'])); 
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

export const getFreeSPFail = (getFreeSPError) => ({
    type: actionTypes.GET_FREE_SP_FAIL,
    getFreeSPError: getFreeSPError
});

export const resetGetFreeSPError = () => ({
    type: actionTypes.RESET_GET_FREE_SP_ERROR
});

export const getFreeSPStart = () => ({
    type: actionTypes.GET_FREE_SP_START
});

export const getFreeSP = (token) => {
    return async dispatch => {
        dispatch(getFreeSPStart());
        try {
            const response = await fetch(`${BACKEND_BASE_DIR}get-free-sp/`, {
                method: 'GET',
                headers: new Headers({'Authorization': token})
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(getFreeSPSuccess(result['freeSP'])); 
            } else {
                dispatch(getFreeSPFail(result['getFreeSPError'])); 
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
