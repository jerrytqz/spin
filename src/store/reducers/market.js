import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'; 

const initialState = {
    market: null,
    fetchMarketLoading: false,
    fetchError: null,
}

const fetchMarketStart = (state) => {
    return updateObject(state, {
        fetchMarketLoading: true
    })
}

const fetchMarketSuccess = (state, action) => {
    return updateObject(state, {
        market: action.market,
        fetchMarketLoading: false,
        fetchError: null  
    })
}

const fetchMarketFail = (state, action) => {
    return updateObject(state, {
        fetchError: action.fetchError, 
        fetchMarketLoading: false,
        market: null 
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MARKET_START:
            return fetchMarketStart(state); 
        case actionTypes.FETCH_MARKET_SUCCESS:
            return fetchMarketSuccess(state, action); 
        case actionTypes.FETCH_MARKET_FAIL:
            return fetchMarketFail(state, action); 
        default:
            return state;
    }
}

export default reducer; 
