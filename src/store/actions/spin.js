import * as actionTypes from './actionTypes'; 

export const purchaseSpinClient = () => {
    return actionTypes.PURCHASE_SPIN; 
}

export const purchaseSpin = (token) => {
    return async dispatch => {
        const data = new FormData();
        data.append('token', token);  
        try {
            let response = await fetch('http://127.0.0.1:8000/purchasespin/', {
                method: 'POST',
                body: data
            });
            if (response.status === 200) {
                dispatch(purchaseSpinClient()); 
            } else {
                console.log('ERROR');
            }
        }
        catch(error) {
            console.log(error); 
        }
    }
}
