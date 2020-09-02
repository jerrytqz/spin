import * as actionTypes from './actionTypes'; 

export const fetchSPStart = () => ({
    type: actionTypes.FETCH_SP_START 
})

export const fetchSPSuccess = (SP) => ({
    type: actionTypes.FETCH_SP_SUCCESS,
    SP: SP
})

export const fetchSPFail = (fetchError) => ({
    type: actionTypes.FETCH_SP_FAIL,
    fetchError: fetchError 
})

export const purchaseSpinStart = () => ({
    type: actionTypes.PURCHASE_SPIN_START
})

export const purchaseSpinSuccess = (SP, degree) => ({
    type: actionTypes.PURCHASE_SPIN_SUCCESS,
    SP: SP,
    degree: degree  
})

export const purchaseSpinFail = (purchaseError) => ({
    type: actionTypes.PURCHASE_SPIN_FAIL,
    purchaseError: purchaseError
})

export const resetPurchaseError = () => ({
    type: actionTypes.RESET_PURCHASE_ERROR
})

export const resetDegree = () => ({
    type: actionTypes.RESET_DEGREE
})

export const fetchSP = (token) => {
    return async dispatch => {
        dispatch(fetchSPStart()); 
        try {
            let response = await fetch('http://127.0.0.1:8000/fetch-sp/', {
                method: 'GET',
                headers: new Headers({'Authorization': token})
            });
            let result = await response.json(); 
            if (response.status === 200) {
                dispatch(fetchSPSuccess(result['SP'])); 
            }
            else {
                dispatch(fetchSPFail(result['fetchError']));  
            }
        }
        catch {
            dispatch(fetchSPFail('UNEXPECTED ERROR')); 
        }
    }
}

export const purchaseSpin = (token) => {
    return async dispatch => {
        dispatch(purchaseSpinStart()); 
        try {
            let response = await fetch('http://127.0.0.1:8000/purchase-spin/', {
                method: 'POST',
                headers: new Headers({'Authorization': token})
            });
            let result = await response.json(); 
            if (response.status === 200) {
                dispatch(purchaseSpinSuccess(result['SP'], result['degree'])); 
            } else {
                dispatch(purchaseSpinFail(result['purchaseError'])); 
            }
        }
        catch {
            dispatch(purchaseSpinFail('Unexpected error')); 
        }
    }
}
