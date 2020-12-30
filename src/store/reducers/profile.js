import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'; 

const initialState = {
	profile: null,
	fetchProfileLoading: false,
	fetchError: null 
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
		fetchError: null  
	});
};

const fetchProfileFail = (state, action) => {
	return updateObject(state, {
		fetchError: action.fetchError, 
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
