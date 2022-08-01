import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'; 
import thunk from 'redux-thunk'; 

import spinReducer from './store/reducers/spin';
import marketReducer from './store/reducers/market'; 
import inventoryReducer from './store/reducers/inventory'; 
import profileReducer from './store/reducers/profile'; 
import authenticationReducer from './store/reducers/authentication'; 

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose; 

const rootReducer = combineReducers({
    spin: spinReducer,
    market: marketReducer,
    inventory: inventoryReducer,
    profile: profileReducer,
    authentication: authenticationReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
)); 

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(
    <React.StrictMode>
        {app}
    </React.StrictMode>,
    document.getElementById('root')
);
