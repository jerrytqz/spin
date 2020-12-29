import * as actionTypes from './actionTypes'; 

export const buyItemStart = () => ({
    type: actionTypes.BUY_ITEM_START
})

export const buyItemSuccess = (marketID) => ({
    type: actionTypes.BUY_ITEM_SUCCESS,
    marketID: marketID
})

export const buyItemFail = (buyError) => ({
    type: actionTypes.BUY_ITEM_FAIL,
    buyError: buyError 
})

export const fetchMarketStart = () => ({
    type: actionTypes.FETCH_MARKET_START
})

export const fetchMarketSuccess = (market) => ({
    type: actionTypes.FETCH_MARKET_SUCCESS,
    market: market 
})

export const fetchMarketFail = (fetchError) => ({
    type: actionTypes.FETCH_MARKET_FAIL,
    fetchError: fetchError 
})

export const clearBuyError = () => ({
    type: actionTypes.CLEAR_BUY_ERROR
})

export const fetchMarket = (token) => {
    return async dispatch => {
        dispatch(fetchMarketStart()); 
        try {
            let response = await fetch('http://127.0.0.1:8000/fetch-market/', {
                method: 'GET',
                headers: new Headers({'Authorization': token})
            });
            let result = await response.json(); 
            if (response.status === 200) {
                dispatch(fetchMarketSuccess(result)); 
            }
            else {
                dispatch(fetchMarketFail(result['fetchError'])); 
            }
        }
        catch {
            dispatch(fetchMarketFail('Unexpected error')); 
        }
    }
}

export const buyItem = (token, marketID) => {
    return async dispatch => {
        dispatch(buyItemStart()); 
        const data = new FormData();
        data.append('marketID', marketID);  

        try {
            let response = await fetch('http://127.0.0.1:8000/buy-item/', {
                method: 'POST',
                headers: new Headers({'Authorization': token}),
                body: data 
            });
            let result = await response.json(); 
            if (response.status === 200) {
                dispatch(buyItemSuccess(marketID)); 
            }
            else {
                dispatch(buyItemFail(result['buyError'])); 
            }
        }
        catch {
            dispatch(buyItemFail('Unexpected error')); 
        }
    }
}
