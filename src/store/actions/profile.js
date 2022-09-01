import * as actionTypes from './actionTypes'; 
import { BACKEND_BASE_DIR } from '../../shared/utility'; 

export const fetchProfileStart = () => ({
    type: actionTypes.FETCH_PROFILE_START
});

export const fetchProfileSuccess = (profile) => ({
    type: actionTypes.FETCH_PROFILE_SUCCESS,
    profile: profile 
});

export const fetchProfileFail = (fetchProfileError) => ({
    type: actionTypes.FETCH_PROFILE_FAIL,
    fetchProfileError: fetchProfileError 
});

export const fetchProfile = (username) => {
    return async dispatch => {
        dispatch(fetchProfileStart()); 

        try {
            let address = `${BACKEND_BASE_DIR}fetch-profile/${username}`;
            if (username == null) address = `${BACKEND_BASE_DIR}fetch-profile/`;
            const response = await fetch(address, {
                method: 'GET'
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(fetchProfileSuccess(result)); 
            } else {
                dispatch(fetchProfileFail(result['fetchProfileError'])); 
            }
        } catch (e) {
            console.log(e)
            dispatch(fetchProfileFail('Unexpected error')); 
        }
    };
};
