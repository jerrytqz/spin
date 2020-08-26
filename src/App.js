import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom'; 
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
        <Route path="/authentication" component={Authentication}/>
        {this.props.isAuthenticated ? <Route path="/logout" component={LogOut}/> : null}
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
