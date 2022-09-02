import * as actionTypes from './actionTypes'; 
import { BACKEND_BASE_DIR } from '../../shared/utility'; 

export const buyItemStart = () => ({
    type: actionTypes.BUY_ITEM_START
});

export const buyItemSuccess = (marketID) => ({
    type: actionTypes.BUY_ITEM_SUCCESS,
    marketID: marketID
});

export const buyItemFail = (buyItemError) => ({
    type: actionTypes.BUY_ITEM_FAIL,
    buyItemError: buyItemError 
});

export const fetchMarketStart = () => ({
    type: actionTypes.FETCH_MARKET_START
});

export const fetchMarketSuccess = (market) => ({
    type: actionTypes.FETCH_MARKET_SUCCESS,
    market: market 
});

export const fetchMarketFail = (fetchMarketError) => ({
    type: actionTypes.FETCH_MARKET_FAIL,
    fetchMarketError: fetchMarketError 
});

export const resetBuyItemError = () => ({
    type: actionTypes.RESET_BUY_ITEM_ERROR
});

export const fetchMarket = (token) => {
    return async dispatch => {
        dispatch(fetchMarketStart()); 
        try {
            const response = await fetch(`${BACKEND_BASE_DIR}fetch-market/`, {
                method: 'GET',
                headers: new Headers({'Authorization': token})
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(fetchMarketSuccess(result)); 
            } else {
                dispatch(fetchMarketFail(result['fetchMarketError'])); 
            }
        } catch {
            dispatch(fetchMarketFail('Unexpected error')); 
        }
    };
};

export const buyItem = (token, marketID) => {
    return async dispatch => {
        dispatch(buyItemStart()); 
        const data = new FormData();
        data.append('marketID', marketID); 

        try {
            const response = await fetch(`${BACKEND_BASE_DIR}buy-item/`, {
                method: 'POST',
                headers: new Headers({'Authorization': token}),
                body: data 
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(buyItemSuccess(marketID)); 
            } else {
                dispatch(buyItemFail(result['buyItemError'])); 
            }
        } catch {
            dispatch(buyItemFail('Unexpected error')); 
        }
    };
};

export const setSelectedItem = (selectedItem) => ({
    type: actionTypes.SET_SELECTED_ITEM,
    selectedItem: selectedItem
});

export const resetSelectedItem = () => ({
    type: actionTypes.RESET_SELECTED_ITEM
});

export const itemListed = (item) => ({
    type: actionTypes.ITEM_LISTED,
    item: item 
});
