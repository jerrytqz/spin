import React, {Component} from 'react';
import Prize from '../../components/Spin/Prize/Prize';  
import Spinner from '../../components/Spin/Spinner/Spinner'; 
import SpinInfo from '../../components/Spin/SpinInfo/SpinInfo'; 
import {connect} from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import Modal from '../../shared/UI/Modal/Modal'; 
import Backdrop from '../../shared/UI/Backdrop/Backdrop'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner';
import classes from './Spin.module.css'; 

class Spin extends Component {
    state = {
        startButtonPressed: false, 
        resetting: false,
        showPrize: false,
        showErrorModal: true,
        showSpinnerText: true 
    }

    componentDidMount() {
        if (this.props.autoLogInAttemptFinished) {
            this.props.onFetchSP(this.props.token); 
        }
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

    errorModalClickedHandler = () => {
        this.setState({showErrorModal: false, startButtonPressed: false}); 
        this.props.onResetPurchaseError(); 
    }

    render() {
        let errorMessage = null; 
        if (this.props.purchaseError) {
            errorMessage = (
                <Modal show={this.state.showErrorModal} clicked={this.errorModalClickedHandler}>
                    <div style={{color: "red"}}>{this.props.purchaseError}</div>
                </Modal>    
            )
        }
        
        return (
            this.props.fetchSPLoading ? <div className={classes.LoadingSpinner}><LoadingSpinner/></div> : 
            <div>
                {this.state.startButtonPressed ? <Backdrop show opacity="0"/> : null}
                {errorMessage}
                <Spinner 
                    startSpinHandler={this.startSpinHandler}
                    startButtonPressed={this.state.startButtonPressed}
                    degree={this.props.degree}
                    resetting={this.state.resetting}
                    fetchErrorMessage={this.props.fetchError}
                    purchaseSpinLoading={this.props.purchaseSpinLoading}
                    showSpinnerText={this.state.showSpinnerText}/>
                {this.state.showPrize ? <Prize degree={this.props.degree} clicked={this.resetSpinHandler} item={this.props.item}/> : null}
                <SpinInfo/>
                <div className={classes.SP}><strong className={classes.SPNumber}>{this.props.SP}</strong> SP</div>
            </div>   
        ); 
    }
}

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        SP: state.spin.SP,
        degree: state.spin.degree,
        item: state.spin.item, 
        fetchError: state.spin.fetchError,
        purchaseError: state.spin.purchaseError,
        purchaseSpinLoading: state.spin.purchaseSpinLoading,
        fetchSPLoading: state.spin.fetchSPLoading,
        autoLogInAttemptFinished: state.authentication.autoLogInAttemptFinished
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseSpin: (token) => dispatch(actions.purchaseSpin(token)),
        onFetchSP: (token) => dispatch(actions.fetchSP(token)),
        onResetPurchaseError: () => dispatch(actions.resetPurchaseError()),
        onResetDegree: () => dispatch(actions.resetDegree())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spin);
