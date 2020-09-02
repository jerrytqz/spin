import React, {Component} from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux'; 

import Layout from './components/Others/Layout/Layout'; 
import Spin from './containers/Spin/Spin'; 
import Authentication from './containers/Authentication/Authentication'; 
import LogOut from './containers/Authentication/LogOut/LogOut'; 
import * as actions from './store/actions/index'; 

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogIn();
    this.props.onFetchSP(localStorage.getItem('token'));  
  }

  render() {
    return (
      <Layout>
        <Route path="/" exact component={Spin}/>
        {!this.props.isAuthenticated ? <Route path="/authentication" component={Authentication}/> : <Redirect to="/"/>}
        {this.props.isAuthenticated ? <Route path="/logout" component={LogOut}/> : <Redirect to="/"/>}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogIn: () => dispatch(actions.tryAutoLogIn()),
    onFetchSP: (token) => dispatch(actions.fetchSP(token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
