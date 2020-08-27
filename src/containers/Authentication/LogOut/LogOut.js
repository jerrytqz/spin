import React, {Component} from 'react';
import * as actions from '../../../store/actions/index'; 
import {connect} from 'react-redux'; 
import Modal from '../../../shared/UI/Modal/Modal'; 
import LoadingSpinner from '../../../shared/UI/LoadingSpinner/LoadingSpinner'; 

class LogOut extends Component {
    state = {
        showModal: true 
    }
    
    componentDidMount() {
        this.props.onLogOut(this.props.token); 
    }
    
    clickedHandler = () => {
        this.setState({showModal: false}); 
    }

    render() {
        let logOutResult = <LoadingSpinner/>
        if (this.props.logOutAttemptFinished && this.props.authError) {
            logOutResult = (
                <Modal show={this.state.showModal} clicked={this.clickedHandler}>
                    <div style={{color: "red"}}>{this.props.authError}</div>
                </Modal> 
            )
        }
        return (
            logOutResult
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        authError: state.authentication.authError,
        logOutAttemptFinished: state.authentication.logOutAttemptFinished
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: (token) => dispatch(actions.logOut(token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut); 
