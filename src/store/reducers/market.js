import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'; 

const initialState = {
    market: null,
    fetchMarketLoading: false,
    fetchError: null,
    buyItemLoading: false,
    buyError: null 
};

const buyItemStart = (state) => {
    return updateObject(state, {
        buyItemLoading: true
    });
};

const buyItemSuccess = (state, action) => {
    let newMarket = state.market;
    const rawMarket = Object.entries(state.market);
    for (const item of rawMarket) {
        if (item[0].split('|')[1] === action.marketID) {
            delete newMarket[item[0]];
        }
    }
    return updateObject(state, {
        buyItemLoading: false,
        buyError: null,
        market: newMarket 
    });
};

const buyItemFail = (state, action) => {
    return updateObject(state, {
        buyError: action.buyError, 
        buyItemLoading: false
    });
};

const fetchMarketStart = (state) => {
    return updateObject(state, {
        fetchMarketLoading: true
    });
};

const fetchMarketSuccess = (state, action) => {
    return updateObject(state, {
        market: action.market,
        fetchMarketLoading: false,
        fetchError: null  
    });
};

const fetchMarketFail = (state, action) => {
    return updateObject(state, {
        fetchError: action.fetchError, 
        fetchMarketLoading: false,
        market: null 
    });
};

const clearBuyError = (state) => {
    return updateObject(state, {
        buyError: null 
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MARKET_START:
            return fetchMarketStart(state); 
        case actionTypes.FETCH_MARKET_SUCCESS:
            return fetchMarketSuccess(state, action); 
        case actionTypes.FETCH_MARKET_FAIL:
            return fetchMarketFail(state, action); 
        case actionTypes.BUY_ITEM_START:
            return buyItemStart(state); 
        case actionTypes.BUY_ITEM_SUCCESS:
            return buyItemSuccess(state, action); 
        case actionTypes.BUY_ITEM_FAIL:
            return buyItemFail(state, action);
        case actionTypes.CLEAR_BUY_ERROR:
            return clearBuyError(state);  
        default:
            return state;
    }
};

export default reducer; 
