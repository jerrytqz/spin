import React, {Component} from 'react';
import Prize from '../../components/Spin/Prize/Prize';  
import Spinner from '../../components/Spin/Spinner/Spinner'; 
import SpinInfo from '../../components/Spin/SpinInfo/SpinInfo'; 
import {connect} from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import Backdrop from '../../shared/UI/Backdrop/Backdrop'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner';
import classes from './Spin.module.css'; 
import SP from '../../components/Spin/SP/SP'; 

class Spin extends Component {
    state = {
        startButtonPressed: false, 
        resetting: false,
        showPrize: false,
        showSpinnerText: true
    }

    componentDidMount() {
        this.props.onFetchSP(this.props.token); 
    }

    startSpinHandler = async () => {
        this.setState({startButtonPressed: true, showErrorModal: true}); 
        await this.props.onPurchaseSpin(this.props.token);  
        if (this.props.degree !== 0) {
            setTimeout(() => this.setState({showPrize: true}), 700);
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

    clickFreeSPHandler = () => {
        this.props.onGetFreeSP(this.props.token); 
    }

    freeSPErrorClickedHandler = () => {
        this.props.onResetFreeSPError(); 
    }

    render() {
        return (
            this.props.fetchSPLoading ? <div className={classes.LoadingSpinner}><LoadingSpinner/></div> : 
            <div>
                {this.state.startButtonPressed ? <Backdrop show opacity="0"/> : null}
                <Spinner 
                    startSpinHandler={this.startSpinHandler}
                    startButtonPressed={this.state.startButtonPressed}
                    degree={this.props.degree}
                    resetting={this.state.resetting}
                    fetchError={this.props.fetchError}
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
        token: state.authentication.token,
        isAuthenticated: state.authentication.isAuthenticated,
        SP: state.spin.SP,
        degree: state.spin.degree,
        item: state.spin.item, 
        fetchError: state.spin.fetchError,
        purchaseError: state.spin.purchaseError,
        purchaseSpinLoading: state.spin.purchaseSpinLoading,
        fetchSPLoading: state.spin.fetchSPLoading,
        freeSPError: state.spin.freeSPError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseSpin: (token) => dispatch(actions.purchaseSpin(token)),
        onFetchSP: (token) => dispatch(actions.fetchSP(token)),
        onResetPurchaseError: () => dispatch(actions.resetPurchaseError()),
        onResetDegree: () => dispatch(actions.resetDegree()),
        onGetFreeSP: (token) => dispatch(actions.getFreeSP(token)),
        onResetFreeSPError: () => dispatch(actions.resetFreeSPError()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spin);
