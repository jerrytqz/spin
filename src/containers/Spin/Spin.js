import React, { Component } from 'react';
import Prize from '../../components/Prize/Prize';  
import Spinner from '../../components/Spinner/Spinner'; 
import SpinInfo from '../../components/SpinInfo/SpinInfo'; 
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import SP from '../../components/SP/SP'; 
import Unboxings from '../../components/Unboxings/Unboxings'; 
import classes from './Spin.module.css'; 
import { SPIN_PRICE } from '../../shared/utility';

class Spin extends Component {
    state = {
        // spinInSession persists until after the spinner has reset.
        spinInSession: false, 
        resetting: false,
        showPrize: false
    }

    startSpinHandler = async () => {
        await this.props.onBuySpin(this.props.token);  
        if (!this.props.buySpinError) {
            this.setState({spinInSession: true}); 
            this.props.onChangeSP(-SPIN_PRICE); 
        }
    }

    clickUnauthorizedSpinHandler = () => {
        this.props.history.push("/authentication");
    }

    startResettingSpinHandler = () => {
        this.setState({resetting: true, showPrize: false}); 
    }

    finishResettingSpinHandler = () => {
        this.setState({spinInSession: false, resetting: false})
    }

    showPrizeHandler = () => {
        this.setState({showPrize: true}); 
        // Add unboxing to global unboxings list
        this.props.onItemUnboxed(this.props.item.name, this.props.item.rarity, this.props.user);
    }

    buySpinErrorClickedHandler = () => {
        this.props.onResetBuySpinError(); 
    }

    clickFreeSPHandler = async () => {
        await this.props.onGetFreeSP(this.props.token); 
        if (!this.props.getFreeSPError) {
            this.props.onChangeSP(this.props.freeSP);
        }
    }

    getFreeSPErrorClickedHandler = () => {
        this.props.onResetGetFreeSPError(); 
    }

    render() {
        return (
            <div className={classes.Spin}>
                {this.state.showPrize 
                    ? <Prize clicked={this.startResettingSpinHandler} item={this.props.item}/> 
                    : null
                }
                <Spinner
                    spinPrice={SPIN_PRICE}
                    sp={this.props.sp}
                    authenticated={this.props.isAuthenticated}
                    buySpinLoading={this.props.buySpinLoading}
                    buySpinError={this.props.buySpinError}
                    spinInSession={this.state.spinInSession}
                    showPrize={this.state.showPrize}
                    degree={this.props.degree}
                    resetting={this.state.resetting}
                    onClickUnauthorizedSpin={this.clickUnauthorizedSpinHandler}
                    onStartSpin={this.startSpinHandler}
                    onClickBackdrop={this.buySpinErrorClickedHandler}
                    onShowPrize={this.showPrizeHandler}
                    onFinishResettingSpin={this.finishResettingSpinHandler}
                />
                <div className={classes.Right}>
                    <SpinInfo/>
                    <Unboxings unboxings={this.props.unboxings}/>
                </div>
                <SP 
                    sp={this.props.sp} 
                    onClickFreeSP={this.clickFreeSPHandler}
                    onClickBackdrop={this.getFreeSPErrorClickedHandler}
                    getFreeSPLoading={this.props.getFreeSPLoading}
                    getFreeSPError={this.props.getFreeSPError}
                    disabledFreeSP={!this.props.isAuthenticated}
                />
            </div>   
        ); 
    }
}

const mapStateToProps = state => {
    return {
        freeSP: state.spin.freeSP,
        token: state.authentication.token,
        isAuthenticated: state.authentication.isAuthenticated,
        sp: state.authentication.sp,
        degree: state.spin.degree,
        item: state.spin.item, 
        buySpinError: state.spin.buySpinError,
        buySpinLoading: state.spin.buySpinLoading,
        getFreeSPLoading: state.spin.getFreeSPLoading,
        getFreeSPError: state.spin.getFreeSPError,
        unboxings: state.spin.unboxings,
        user: state.authentication.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onBuySpin: (token) => dispatch(actions.buySpin(token)),
        onResetBuySpinError: () => dispatch(actions.resetBuySpinError()),
        onGetFreeSP: (token) => dispatch(actions.getFreeSP(token)),
        onResetGetFreeSPError: () => dispatch(actions.resetGetFreeSPError()),
        onChangeSP: (changeAmount) => dispatch(actions.changeSP(changeAmount)),
        onItemUnboxed: (itemName, rarity, unboxer) => dispatch(actions.itemUnboxed(itemName, rarity, unboxer))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spin);
