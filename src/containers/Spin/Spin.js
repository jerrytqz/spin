import React, {Component} from 'react';
import Prize from '../../components/Spin/Prize/Prize';  
import Spinner from '../../components/Spin/Spinner/Spinner'; 
import SpinInfo from '../../components/Spin/SpinInfo/SpinInfo'; 
import {connect} from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import Modal from '../../shared/UI/Modal/Modal'; 

class Spin extends Component {
    state = {
        spinDegree: 0,
        trueDegree: 0,
        startButtonPressed: false, 
        resetting: false,
        showPrize: false,
        showErrorModal: true 
    }

    componentDidMount() {
        this.props.onFetchSP(this.props.token); 
    }

    startSpinHandler = () => {
        this.props.onPurchaseSpin(this.props.token); 
        let spinDegree = 1800 + Math.random()*360; 
        let trueDegree = spinDegree - 1800; 
        this.setState({startButtonPressed: true, spinDegree: spinDegree, trueDegree: trueDegree, showErrorModal: true}); 
        setTimeout(() => this.setState({showPrize: true}), 700);
    }

    resetSpinHandler = () => { 
        this.setState({spinDegree: 0, resetting: true, showPrize: false}); 
        setTimeout(() => this.setState({startButtonPressed: false, resetting: false}), 700);
    }

    errorModalClickedHandler = () => {
        this.setState({showErrorModal: false}); 
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
            <div>
                {errorMessage}
                <Spinner 
                    startSpinHandler={this.startSpinHandler}
                    startButtonPressed={this.state.startButtonPressed}
                    spinDegree={this.state.spinDegree}
                    resetting={this.state.resetting}
                    fetchErrorMessage={this.props.fetchError}/>
                {this.state.showPrize ? <Prize angle={this.state.trueDegree} clicked={this.resetSpinHandler}/> : null}
                <SpinInfo/>
                <div>{this.props.SP}</div>
            </div>   
        ); 
    }
}

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        SP: state.spin.SP,
        fetchError: state.spin.fetchError,
        purchaseError: state.spin.purchaseError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseSpin: (token) => dispatch(actions.purchaseSpin(token)),
        onFetchSP: (token) => dispatch(actions.fetchSP(token)),
        onResetPurchaseError: () => dispatch(actions.resetPurchaseError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spin);
