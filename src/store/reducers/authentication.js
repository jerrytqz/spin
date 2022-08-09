import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'; 

const initialState = {
    isAuthenticated: false,
    user: null,
    sp: 0,
    token: null,
    authError: null,
    logOutError: null,
    logOutAttemptFinished: false,
    autoLogInAttemptFinished: false, 
    authLoading: false,
};

const authStart = (state) => {
    return updateObject(state, {
        authError: null,
        authLoading: true
    });
};

const authSuccess = (state, action) => {
    if (localStorage.getItem('token') === null) {
        localStorage.setItem('token', action.token); 
    }
    if (localStorage.getItem('user') === null) {
        localStorage.setItem('user', action.user); 
    }
    return updateObject(state, {
        isAuthenticated: true, 
        user: action.user, 
        sp: action.sp, 
        token: action.token,
        authLoading: false,
        // In case the user is auto logged out, resetLogOutAttempt will not be called. 
        logOutAttemptFinished: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        authError: action.authError,
        authLoading: false
    });
};

const resetAuthError = (state) => {
    return updateObject(state, {
        authError: null
    });
};

const logOutSuccess = (state) => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
    return updateObject(state, {
        isAuthenticated: false,
        user: null, 
        sp: 0,
        token: null,
        logOutAttemptFinished: true
    });
};

const logOutFail = (state, action) => {
    return updateObject(state, {
        logOutError: action.logOutError,
        logOutAttemptFinished: true
    });
};

const resetLogOutAttempt = (state) => {
    return updateObject(state, {
        logOutAttemptFinished: false
    });
};

const resetLogOutError = (state) => {
    return updateObject(state, {
        logOutError: null
    });
};

const autoLogInSuccess = (state, action) => {
    return updateObject(state, {
        isAuthenticated: true, 
        user: action.user, 
        sp: action.sp, 
        token: action.token,
        autoLogInAttemptFinished: true
    });
};

const autoLogInFail = (state) => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
    return updateObject(state, {
        autoLogInAttemptFinished: true
    });
};

const changeSP = (state, action) => {
    return updateObject(state, {
        sp: state.sp + action.changeAmount 
    });
};

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
        case actionTypes.LOG_OUT_SUCCESS:
            return logOutSuccess(state); 
        case actionTypes.LOG_OUT_FAIL:
            return logOutFail(state, action); 
        case actionTypes.RESET_LOG_OUT_ATTEMPT:
            return resetLogOutAttempt(state);
        case actionTypes.RESET_LOG_OUT_ERROR:
            return resetLogOutError(state);
        case actionTypes.AUTO_LOG_IN_SUCCESS:
            return autoLogInSuccess(state, action);
        case actionTypes.AUTO_LOG_IN_FAIL:
            return autoLogInFail(state);
        case actionTypes.CHANGE_SP:
            return changeSP(state, action); 
        default:
            return state;
    }
};

export default reducer; 
