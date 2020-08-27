import React, {Component} from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux'; 

import Layout from './components/Others/Layout/Layout'; 
import Spin from './containers/Spin/Spin'; 
import Authentication from './containers/Authentication/Authentication'; 
import LogOut from './containers/Authentication/LogOut/LogOut'; 

class App extends Component {
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

export default withRouter(connect(mapStateToProps)(App));
