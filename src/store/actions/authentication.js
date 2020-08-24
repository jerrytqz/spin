import * as actionTypes from './actionTypes'; 

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = (authError) => {
    return {
        type: actionTypes.AUTH_FAIL,
        authError: authError
    }
}

export const authFailServer = (serverError) => {
    return {
        type: actionTypes.AUTH_FAIL_SERVER,
        serverError: serverError
    }
}

export const switchAuthMode = () => {
    return {
        type: actionTypes.SWITCH_AUTH_MODE
    }
}

export const logOutClient = () => {
    return {
        type: actionTypes.LOG_OUT_CLIENT
    }
}

export const logOut = (token) => {
    return async dispatch => {
        dispatch(logOutClient()); 
        let data = new FormData();
        data.append('token', token); 
        try {
            let response = await fetch('http://127.0.0.1:8000/logout/', {
                method: 'POST',
                body: data 
            });
            if (response.status === 200) {
                console.log('Log out successful!'); 
            } else {
                console.log('Log out error'); 
            } 
        }
        catch(serverError) {
            console.log(serverError); 
        }
    }
}

export const auth = (username, email, password, confirmPassword, isLogIn) => {
    return async dispatch => {
        dispatch(authStart());
        let data = new FormData();
        data.append('username', username);  
        data.append('password', password);  
        let path = 'http://127.0.0.1:8000/login/';  
        if (!isLogIn) {
            path = 'http://127.0.0.1:8000/register/';
            data.append('email', email);
            data.append('confirmPassword', confirmPassword);
        }
        try {
            let response = await fetch(path, {
                method: 'POST',
                body: data
            });
            let result = await response.json(); 
            if (response.status === 200) {
                dispatch(authSuccess(result['token']));
            } else {
                dispatch(authFail(result['authError']));
            }
        }
        catch(serverError) {
            dispatch(authFailServer(serverError));
        }
    }
}
