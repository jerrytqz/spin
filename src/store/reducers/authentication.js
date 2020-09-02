import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/Functions/utility'; 

const initialState = {
    isAuthenticated: false,
    token: null,
    authError: null,
    logOutAttemptFinished: false,
    loading: false,
    autoLogInLoading: true  
}

const authStart = (state) => {
    return updateObject(state, {
        authError: null,
        loading: true
    })
}

const authSuccess = (state, action) => {
    if (localStorage.getItem('token') === null) {
        localStorage.setItem('token', action.token); 
    }
    return updateObject(state, {
        isAuthenticated: true, 
        token: action.token,
        loading: false,
        authError: null,
        logOutAttemptFinished: false,
        autoLogInLoading: false 
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        authError: action.authError,
        loading: false
    })
}

const resetAuthError = (state) => {
    return updateObject(state, {
        authError: null
    })
}

const logOutClient = (state) => {
    localStorage.removeItem('token'); 
    return updateObject(state, {
        isAuthenticated: false,
        token: null,
        authError: null,
        logOutAttemptFinished: true,
        autoLogInLoading: false 
    })
}

const logOutFail = (state, action) => {
    return updateObject(state, {
        authError: action.authError,
        logOutAttemptFinished: true
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state); 
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action); 
        case actionTypes.RESET_AUTH_ERROR:
            return resetAuthError(state); 
        case actionTypes.LOG_OUT_CLIENT:
            return logOutClient(state); 
        case actionTypes.LOG_OUT_FAIL:
            return logOutFail(state, action); 
        default:
            return state;
    }
}

export default reducer; 
