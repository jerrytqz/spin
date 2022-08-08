import React, { Component } from 'react';
import Prize from '../../components/Prize/Prize';  
import Spinner from '../../components/Spinner/Spinner'; 
import SpinInfo from '../../components/SpinInfo/SpinInfo'; 
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import Backdrop from '../../shared/UI/Backdrop/Backdrop'; 
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
        if (!this.props.freeSPError) {
            this.props.onChangeSP(this.props.freeSP);
        }
    }

    freeSPErrorClickedHandler = () => {
        this.props.onResetFreeSPError(); 
    }

    render() {
        return (
            <div>
                {this.props.buySpinLoading || this.state.spinInSession ? <Backdrop show style={{opacity: '0'}}/> : null}
                <Spinner
                    spinPrice={SPIN_PRICE}
                    sp={this.props.sp}
                    authenticated={this.props.isAuthenticated}
                    buySpinLoading={this.props.buySpinLoading}
                    buySpinError={this.props.buySpinError}
                    spinInSession={this.state.spinInSession}
                    degree={this.props.degree}
                    resetting={this.state.resetting}
                    onStartSpin={this.startSpinHandler}
                    onClickBackdrop={this.buySpinErrorClickedHandler}
                    onShowPrize={this.showPrizeHandler}
                    onFinishResettingSpin={this.finishResettingSpinHandler}
                />
                {this.state.showPrize 
                    ? <Prize clicked={this.startResettingSpinHandler} item={this.props.item}/> 
                    : null
                }
                <div className={classes.Right}>
                    <SpinInfo/>
                    <Unboxings unboxings={this.props.unboxings}/>
                </div>
                <SP 
                    sp={this.props.sp} 
                    onClickFreeSP={this.clickFreeSPHandler}
                    onClickBackdrop={this.freeSPErrorClickedHandler}
                    freeSPError={this.props.freeSPError}
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
        freeSPError: state.spin.freeSPError,
        unboxings: state.spin.unboxings,
        user: state.authentication.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onBuySpin: (token) => dispatch(actions.buySpin(token)),
        onResetBuySpinError: () => dispatch(actions.resetBuySpinError()),
        onGetFreeSP: (token) => dispatch(actions.getFreeSP(token)),
        onResetFreeSPError: () => dispatch(actions.resetFreeSPError()),
        onChangeSP: (changeAmount) => dispatch(actions.changeSP(changeAmount)),
        onItemUnboxed: (itemName, rarity, unboxer) => dispatch(actions.itemUnboxed(itemName, rarity, unboxer))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spin);
