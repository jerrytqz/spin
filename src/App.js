import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux'; 

import * as actions from './store/actions/index'; 
import Layout from './components/Layout/Layout'; 
import Spin from './containers/Spin/Spin'; 
import Market from './containers/Market/Market'; 
import Inventory from './containers/Inventory/Inventory';
import Profile from './containers/Profile/Profile'; 
import LogOut from './containers/Authentication/LogOut/LogOut'; 
import Authentication from './containers/Authentication/Authentication'; 
import Spinner from './shared/UI/LoadingSpinner/LoadingSpinner';
import io from 'socket.io-client'; 

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoLogIn();
        const socket = io('https://spin-web-socket.jerryzheng5.repl.co');
        socket.on('item bought', (marketID) => this.props.onBuyItemSuccess(marketID)); 
    }

    render() {
        return (
            this.props.autoAttemptFinished 
                ? 
                    <Layout>
                        <Route path="/" exact component={Spin}/>
                        <Route path="/market" component={Market}/>
                        <Route path="/inventory" exact component={Inventory}/>
                        <Route path={['/profile/:username', '/profile']} component={Profile}/>
                        <Route path="/authentication" component={Authentication}/> 
                        <Route path="/logout" component={LogOut}/>
                    </Layout> 
                : <Spinner/>
        );
    }
}

const mapStateToProps = state => {
    return {
        autoAttemptFinished: state.authentication.autoAttemptFinished
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoLogIn: () => dispatch(actions.tryAutoLogIn()),
        onBuyItemSuccess: (marketID) => dispatch(actions.buyItemSuccess(marketID))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
