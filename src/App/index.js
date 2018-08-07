import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../Welcome/';
import './styles.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <main>
          <Route
            exact path='/'
            component={Welcome}
            key='Welcome'/>
        </main>
      </div>
    );
  }
}

export default App;
