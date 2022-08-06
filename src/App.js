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
    async componentDidMount() {
        await this.props.onTryAutoLogIn();
        const socket = io(process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://spin-socketio.jerryzheng5.repl.co');

        socket.on('item unboxed', (itemName, rarity, unboxer) => {
            if (unboxer !== this.props.user) {
                this.props.onItemUnboxed(itemName, rarity, unboxer); 
            }
        }); 

        socket.on('item bought', (marketID, seller, price) => {
            this.props.onBuyItemSuccess(marketID);
            if (seller === this.props.user) {
                this.props.onChangeSP(price); 
            }
        }); 

        socket.on('item listed', (item) => {
            this.props.onItemListed(item); 
        });
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
        autoAttemptFinished: state.authentication.autoAttemptFinished,
        user: state.authentication.user 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoLogIn: () => dispatch(actions.tryAutoLogIn()),
        onChangeSP: (changeAmount) => dispatch(actions.changeSP(changeAmount)),
        onBuyItemSuccess: (marketID) => dispatch(actions.buyItemSuccess(marketID)),
        onItemListed: (item) => dispatch(actions.itemListed(item)),
        onItemUnboxed: (itemName, rarity, unboxer) => dispatch(actions.itemUnboxed(itemName, rarity, unboxer))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
