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

class Spin extends Component {
    state = {
        startButtonPressed: false, 
        resetting: false,
        showPrize: false,
        showSpinnerText: true
    }

    startSpinHandler = async () => {
        this.setState({startButtonPressed: true}); 
        await this.props.onBuySpin(this.props.token);  
        if (this.props.degree !== 0) {
            this.props.onChangeSP(-500); 
        }
    }

    resetSpinHandler = () => {
        this.props.onResetDegree();  
        this.setState({resetting: true, showPrize: false, showSpinnerText: false}); 
        setTimeout(() => this.setState({startButtonPressed: false, resetting: false, showSpinnerText: true}), 700);
    }

    buyErrorClickedHandler = () => {
        this.setState({startButtonPressed: false}); 
        this.props.onResetBuyError(); 
    }

    clickFreeSPHandler = async() => {
        await this.props.onGetFreeSP(this.props.token); 
        if (this.props.freeSPError === null) {
            this.props.onChangeSP(this.props.freeSP);
        }
    }

    freeSPErrorClickedHandler = () => {
        this.props.onResetFreeSPError(); 
    }

    spinFinishedHandler = () => {
        this.setState({showPrize: true}); 
        // Add unboxing to global unboxings list
        this.props.onItemUnboxed(this.props.item.name, this.props.item.rarity, this.props.user);
    }

    render() {
        return (
            <div>
                {this.state.startButtonPressed ? <Backdrop show style={{opacity: '0'}}/> : null}
                <Spinner 
                    startSpinHandler={this.startSpinHandler}
                    startButtonPressed={this.state.startButtonPressed}
                    degree={this.props.degree}
                    resetting={this.state.resetting}
                    authenticated={this.props.isAuthenticated}
                    buyError={this.props.buyError}
                    buySpinLoading={this.props.buySpinLoading}
                    showSpinnerText={this.state.showSpinnerText}
                    onClickBackdrop={this.buyErrorClickedHandler}
                    onSpinFinish={() => this.spinFinishedHandler()}
                    sp={this.props.sp}
                />
                {this.state.showPrize 
                    ? <Prize clicked={this.resetSpinHandler} item={this.props.item}/> 
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
        buyError: state.spin.buyError,
        buySpinLoading: state.spin.buySpinLoading,
        freeSPError: state.spin.freeSPError,
        unboxings: state.spin.unboxings,
        user: state.authentication.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onBuySpin: (token) => dispatch(actions.buySpin(token)),
        onResetBuyError: () => dispatch(actions.resetBuyError()),
        onResetDegree: () => dispatch(actions.resetDegree()),
        onGetFreeSP: (token) => dispatch(actions.getFreeSP(token)),
        onResetFreeSPError: () => dispatch(actions.resetFreeSPError()),
        onChangeSP: (changeAmount) => dispatch(actions.changeSP(changeAmount)),
        onItemUnboxed: (itemName, rarity, unboxer) => dispatch(actions.itemUnboxed(itemName, rarity, unboxer))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spin);
