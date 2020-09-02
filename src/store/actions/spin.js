import * as actionTypes from './actionTypes'; 

export const fetchSPStart = () => ({
    type: actionTypes.FETCH_SP_START 
})

export const setSP = (SP) => ({
    type: actionTypes.SET_SP,
    SP: SP
})

export const setSPFail = (fetchError) => ({
    type: actionTypes.SET_SP_FAIL,
    fetchError: fetchError 
})

export const startPurchaseSpin = () => ({
    type: actionTypes.START_PURCHASE_SPIN
})

export const purchaseSpinClient = (SP, degree) => ({
    type: actionTypes.PURCHASE_SPIN_CLIENT,
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
                dispatch(setSP(result['SP'])); 
            }
            else {
                dispatch(setSPFail(result['fetchError']));  
            }
        }
        catch {
            dispatch(setSPFail('UNEXPECTED ERROR')); 
        }
    }
}

export const purchaseSpin = (token) => {
    return async dispatch => {
        dispatch(startPurchaseSpin()); 
        try {
            let response = await fetch('http://127.0.0.1:8000/purchase-spin/', {
                method: 'POST',
                headers: new Headers({'Authorization': token})
            });
            let result = await response.json(); 
            if (response.status === 200) {
                dispatch(purchaseSpinClient(result['SP'], result['degree'])); 
            } else {
                dispatch(purchaseSpinFail(result['purchaseError'])); 
            }
        }
        catch {
            dispatch(purchaseSpinFail('Unexpected error')); 
        }
    }
}
