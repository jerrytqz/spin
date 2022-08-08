import * as actionTypes from './actionTypes'; 
import { BACKEND_BASE_DIR } from '../../shared/utility'; 

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, user, sp) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: user, 
        sp: sp
    };
};

export const authFail = (authError) => {
    return {
        type: actionTypes.AUTH_FAIL,
        authError: authError
    };
};

export const resetAuthError = () => {
    return {
        type: actionTypes.RESET_AUTH_ERROR
    };
};

export const logOutSuccess = () => {
    return {
        type: actionTypes.LOG_OUT_SUCCESS
    };
};

export const logOutFail = (authError) => {
    return {
        type: actionTypes.LOG_OUT_FAIL,
        authError: authError 
    };
};

export const logOut = (token) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BACKEND_BASE_DIR}log-out/`, {
                method: 'POST',
                headers: new Headers({'Authorization': token})
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(logOutSuccess()); 
                dispatch(checkExpiration(result['expirationTime'], true));
            } else {
                dispatch(logOutFail(result['authError'])); 
            } 
        } catch {
            dispatch(logOutFail('Unexpected error')); 
        }
    };
};

export const auth = (username, email, password, confirmPassword, isLogIn) => {
    return async dispatch => {
        dispatch(authStart());
        const data = new FormData();
        data.append('username', username);  
        data.append('password', password);  
        let path = `${BACKEND_BASE_DIR}log-in/`;  
        if (!isLogIn) {
            path = `${BACKEND_BASE_DIR}register/`;
            data.append('email', email);
            data.append('confirmPassword', confirmPassword);
        }
        try {
            const response = await fetch(path, {
                method: 'POST',
                body: data
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(authSuccess(result['token'], result['user'], result['sp']));
                dispatch(checkExpiration(result['expirationTime'], false));
            } else {
                dispatch(authFail(result['authError']));
            }
        } catch {
            dispatch(authFail('Unexpected error'));
        }
    };
};

export const tryAutoLogIn = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BACKEND_BASE_DIR}auto-log-in/`, {
                method: 'POST',
                headers: new Headers({'Authorization': localStorage.getItem('token')})
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(authSuccess(localStorage.getItem('token'), localStorage.getItem('user'), result['sp']));
                dispatch(checkExpiration((result['expirationDate'] - new Date().getTime())/1000), false); 
            } else {
                dispatch(logOutSuccess()); 
            }
        } catch {
            console.log('Unexpected error logging in'); 
        }
    };
};

let timeout = null; 
export const checkExpiration = (expirationTime, clear) => {
    if (!clear) {
        return dispatch => {
            timeout = setTimeout(() => {
                dispatch(logOutSuccess()); 
            }, expirationTime * 1000);
        };
    } else return clearTimeout(timeout)
};

export const changeSP = (changeAmount) => {
    return {
        type: actionTypes.CHANGE_SP,
        changeAmount: changeAmount 
    };
};
