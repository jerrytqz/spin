import React, { Component } from 'react';
import * as actions from '../../../store/actions/index'; 
import { connect } from 'react-redux'; 
import Modal from '../../../shared/UI/Modal/Modal'; 
import Backdrop from '../../../shared/UI/Backdrop/Backdrop';
import LoadingSpinner from '../../../shared/UI/LoadingSpinner/LoadingSpinner'; 
import classes from './LogOut.module.css'; 
import { Redirect } from 'react-router-dom';

class LogOut extends Component {
    state = {
        showModal: true 
    }
    
    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        } else {
            this.props.onLogOut(this.props.token);
        } 
    }

    componentWillUnmount() {
        this.props.onResetLogOutAttempt();
        this.props.onResetLogOutError();
    }
    
    clickedHandler = () => {
        this.setState({showModal: false});
        this.props.history.push('/'); 
    }

    render() {
        let logOutResult = (
            <>
                <div className={classes.LoadingSpinner}><LoadingSpinner/></div>;
                <Backdrop style={{opacity: '0'}}/>
            </>
        )
        
        if (this.props.logOutAttemptFinished) {
            logOutResult = !this.props.logOutError ? <Redirect to="/"/> : (this.state.showModal 
                ?
                    <Modal clicked={this.clickedHandler}>
                        <div style={{color: 'red'}}>{this.props.logOutError}</div>
                    </Modal> 
                : null
            );
        }

        return logOutResult;
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        token: state.authentication.token,
        logOutError: state.authentication.logOutError,
        logOutAttemptFinished: state.authentication.logOutAttemptFinished
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: (token) => dispatch(actions.logOut(token)),
        onResetLogOutAttempt: () => dispatch(actions.resetLogOutAttempt()),
        onResetLogOutError: () => dispatch(actions.resetLogOutError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut); 
