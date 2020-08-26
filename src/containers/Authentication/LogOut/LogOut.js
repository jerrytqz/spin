import React, {Component} from 'react';
import * as actions from '../../../store/actions/index'; 
import {Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux'; 
import Modal from '../../../shared/UI/Modal/Modal'; 

class LogOut extends Component {
    componentDidMount() {
        this.props.onLogOut(this.props.token); 
    }

    state = {
        showModal: true 
    }
    
    clickedHandler = () => {
        this.setState({showModal: false}); 
    }

    render() {
        return (this.props.authError ? 
        <Modal show={this.state.showModal} clicked={this.clickedHandler}>
            <div style={{color: "red"}}>{this.props.authError}</div>
        </Modal> : 
        <Redirect to="/"/>) 
    }
}

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        authError: state.authentication.authError 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: (token) => dispatch(actions.logOut(token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut); 
