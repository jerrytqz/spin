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

export const auth = (username, email, password, confirmPassword, isLogIn) => {
    return dispatch => {
        dispatch(authStart())
        let data = new FormData();
        data.append('username', username);  
        data.append('password', password);  
        let path = 'http://127.0.0.1:8000/login/';  
        if (!isLogIn) {
            path = 'http://127.0.0.1:8000/register/';
            data.append('email', email);
            data.append('confirmPassword', confirmPassword);
        }
        (async () => {
            try {
                let response = await fetch(path, {
                    method: 'POST',
                    body: data
                });
                let result = await response.json(); 
                if (response.status === 200) {
                    dispatch(authSuccess(result['token']));
                } 
                else {
                    dispatch(authFail(result['authError']));
                }
            }
            catch(serverError) {
                dispatch(authFailServer(serverError));
            }
        })(); 
    }
}
