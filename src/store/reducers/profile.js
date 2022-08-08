import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'; 

const initialState = {
    profile: null,
    fetchProfileLoading: false,
    fetchProfileError: null 
};

const fetchProfileStart = (state) => {
    return updateObject(state, {
        fetchProfileLoading: true
    });
};

const fetchProfileSuccess = (state, action) => {
    return updateObject(state, {
        profile: action.profile,
        fetchProfileLoading: false,
        fetchProfileError: null  
    });
};

const fetchProfileFail = (state, action) => {
    return updateObject(state, {
        fetchProfileError: action.fetchProfileError, 
        fetchProfileLoading: false,
        profile: null 
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROFILE_START:
            return fetchProfileStart(state); 
        case actionTypes.FETCH_PROFILE_SUCCESS:
            return fetchProfileSuccess(state, action); 
        case actionTypes.FETCH_PROFILE_FAIL:
            return fetchProfileFail(state, action); 
        default:
            return state;
    }
};

export default reducer; 
