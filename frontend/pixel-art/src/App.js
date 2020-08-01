import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BoardBuilder from './containers/BoardBuilder/BoardBuilder';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render () {
    return (
      <div>
       <Layout>
         <Switch>
            <Route path="/" component={BoardBuilder} />
         </Switch>
       </Layout>
      </div>
    );
  }
}

export default App;