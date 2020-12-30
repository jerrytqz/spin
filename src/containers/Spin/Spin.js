import React, { Component } from 'react';
import Prize from '../../components/Spin/Prize/Prize';  
import Spinner from '../../components/Spin/Spinner/Spinner'; 
import SpinInfo from '../../components/Spin/SpinInfo/SpinInfo'; 
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import Backdrop from '../../shared/UI/Backdrop/Backdrop'; 
import SP from '../../components/Spin/SP/SP'; 

class Spin extends Component {
    state = {
        startButtonPressed: false, 
        resetting: false,
        showPrize: false,
        showSpinnerText: true
    }

    startSpinHandler = async () => {
        this.setState({startButtonPressed: true, showErrorModal: true}); 
        await this.props.onPurchaseSpin(this.props.token);  
        if (this.props.degree !== 0) {
            setTimeout(() => this.setState({showPrize: true}), 700);
            this.props.onChangeSP(-500); 
        }
    }

    resetSpinHandler = () => {
        this.props.onResetDegree();  
        this.setState({resetting: true, showPrize: false, showSpinnerText: false}); 
        setTimeout(() => this.setState({startButtonPressed: false, resetting: false, showSpinnerText: true}), 700);
    }

    purchaseErrorClickedHandler = () => {
        this.setState({startButtonPressed: false}); 
        this.props.onResetPurchaseError(); 
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
                    purchaseError={this.props.purchaseError}
                    purchaseSpinLoading={this.props.purchaseSpinLoading}
                    showSpinnerText={this.state.showSpinnerText}
                    onClickBackdrop={this.purchaseErrorClickedHandler}
                />
                {this.state.showPrize 
                    ? <Prize degree={this.props.degree} clicked={this.resetSpinHandler} item={this.props.item}/> 
                    : null
                }
                <SpinInfo/>
                <SP 
                    SP={this.props.SP} 
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
        SP: state.authentication.SP,
        degree: state.spin.degree,
        item: state.spin.item, 
        purchaseError: state.spin.purchaseError,
        purchaseSpinLoading: state.spin.purchaseSpinLoading,
        freeSPError: state.spin.freeSPError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseSpin: (token) => dispatch(actions.purchaseSpin(token)),
        onResetPurchaseError: () => dispatch(actions.resetPurchaseError()),
        onResetDegree: () => dispatch(actions.resetDegree()),
        onGetFreeSP: (token) => dispatch(actions.getFreeSP(token)),
        onResetFreeSPError: () => dispatch(actions.resetFreeSPError()),
        onChangeSP: (changeAmount) => dispatch(actions.changeSP(changeAmount))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spin);
