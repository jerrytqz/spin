import * as actionTypes from './actionTypes'; 

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
            let response = await fetch('http://127.0.0.1:8000/fetch-profile/', {
                method: 'POST',
                body: data
            });
            let result = await response.json(); 
            if (response.status === 200) {
                dispatch(fetchProfileSuccess(result)); 
            } else {
                dispatch(fetchProfileFail(result['fetchError'])); 
            }
        }
        catch {
            dispatch(fetchProfileFail('Unexpected error')); 
        }
    };
};
