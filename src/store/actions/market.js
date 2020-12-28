import * as actionTypes from './actionTypes'; 

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
