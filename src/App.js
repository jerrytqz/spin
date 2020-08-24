import React from 'react';
import {Route} from 'react-router-dom'; 

import Layout from './components/Others/Layout/Layout'; 
import Spin from './containers/Spin/Spin'; 
import Authentication from './containers/Authentication/Authentication'; 

function App() {
  return (
    <Layout>
      <Route path="/" exact component={Spin}/>
      <Route path="/authentication" component={Authentication}/>
    </Layout>
  );
}

export default App;
