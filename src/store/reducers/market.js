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
    const newMarket = {};
    for (const [key, value] of Object.entries(state.market)) {
        if (Number(key) !== Number(action.marketID)) {
            newMarket[key] = { ...value };
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

const itemListed = (state, action) => {
    const marketID = Object.keys(action.item)[0];
    const newMarket = { ...state.market }; 
    newMarket[marketID] = action.item[marketID]; 
    return updateObject(state, {
        market: newMarket
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
        case actionTypes.ITEM_LISTED:
            return itemListed(state, action);  
        default:
            return state;
    }
};

export default reducer; 
