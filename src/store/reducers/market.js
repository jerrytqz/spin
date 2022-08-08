import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'; 

const initialState = {
    market: {},
    fetchMarketLoading: false,
    fetchMarketError: null,
    buyItemLoading: false,
    buyItemError: null 
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
        buyItemError: null,
        market: newMarket
    });
};

const buyItemFail = (state, action) => {
    return updateObject(state, {
        buyItemError: action.buyItemError, 
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
        fetchMarketError: null  
    });
};

const fetchMarketFail = (state, action) => {
    return updateObject(state, {
        fetchMarketError: action.fetchMarketError, 
        fetchMarketLoading: false,
        market: null 
    });
};

const resetBuyItemError = (state) => {
    return updateObject(state, {
        buyItemError: null 
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
        case actionTypes.RESET_BUY_ITEM_ERROR:
            return resetBuyItemError(state);  
        case actionTypes.ITEM_LISTED:
            return itemListed(state, action);  
        default:
            return state;
    }
};

export default reducer; 
