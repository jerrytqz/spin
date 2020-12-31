import * as actionTypes from './actionTypes'; 
import { BACKEND_BASE_DIR } from '../../shared/utility'; 

export const fetchProfileStart = () => ({
    type: actionTypes.FETCH_PROFILE_START
});

export const fetchProfileSuccess = (profile) => ({
    type: actionTypes.FETCH_PROFILE_SUCCESS,
    profile: profile 
});

export const fetchProfileFail = (fetchError) => ({
    type: actionTypes.FETCH_PROFILE_FAIL,
    fetchError: fetchError 
});

export const fetchProfile = (username) => {
    return async dispatch => {
        dispatch(fetchProfileStart()); 

        const data = new FormData();
        data.append('username', username); 

        try {
            const response = await fetch(`${BACKEND_BASE_DIR}fetch-profile/`, {
                method: 'POST',
                body: data
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(fetchProfileSuccess(result)); 
            } else {
                dispatch(fetchProfileFail(result['fetchError'])); 
            }
        } catch {
            dispatch(fetchProfileFail('Unexpected error')); 
        }
    };
};
