import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/Functions/utility'; 

const initialState = {
    SP: 1000
}

const purchaseSpinClient = (state) => {
    let newSP = state.SP - 500; 
    return updateObject(state, {
        SP: newSP
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_SPIN:
            return purchaseSpinClient(state); 
        default:
            return state;
    }
}

export default reducer; 
