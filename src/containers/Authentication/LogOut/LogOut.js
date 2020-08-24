import React, {Component} from 'react';
import * as actions from '../../../store/actions/index'; 
import {Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux'; 

class LogOut extends Component {
    componentDidMount() {
        this.props.onLogOut(this.props.token); 
    }
    
    render() {
        return <Redirect to = "/"/>; 
    }
}

const mapStateToProps = state => {
    return {
        token: state.authentication.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: (token) => dispatch(actions.logOut(token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut); 
