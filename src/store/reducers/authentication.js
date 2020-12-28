import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'; 

const initialState = {
    isAuthenticated: false,
    user: null,
    SP: 0,
    token: null,
    authError: null,
    logOutAttemptFinished: false,
    autoAttemptFinished: false, 
    loading: false,
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
    if (localStorage.getItem('user') === null) {
        localStorage.setItem('user', action.user); 
    }
    return updateObject(state, {
        isAuthenticated: true, 
        user: action.user, 
        SP: action.SP, 
        token: action.token,
        loading: false,
        authError: null,
        logOutAttemptFinished: false,
        autoAttemptFinished: true
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

const logOutSuccess = (state) => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
    return updateObject(state, {
        isAuthenticated: false,
        user: null, 
        SP: 0,
        token: null,
        authError: null,
        logOutAttemptFinished: true,
        autoAttemptFinished: true
    })
}

const logOutFail = (state, action) => {
    return updateObject(state, {
        authError: action.authError,
        logOutAttemptFinished: true
    })
}

const changeSP = (state, action) => {
    let newSP = state.SP;
    newSP += action.changeAmount; 
    return updateObject(state, {
        SP: newSP 
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
        case actionTypes.LOG_OUT_SUCCESS:
            return logOutSuccess(state); 
        case actionTypes.LOG_OUT_FAIL:
            return logOutFail(state, action); 
        case actionTypes.CHANGE_SP:
            return changeSP(state, action); 
        default:
            return state;
    }
}

export default reducer; 
