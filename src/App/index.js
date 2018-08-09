import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../Welcome/';
import Header from '../Header/';
import Rosters from '../Rosters/';
import Roster from '../Roster/';
import RosterEditable from '../RosterEditable/';
import './styles.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Route
            exact path='/'
            component={Welcome}
            key='Welcome'/>
          <Route
            exact path='/rosters'
            component={Rosters}
            key='Rosters'/>
          <Route
            exact path='/roster/:id'
            component={Roster}
            key='Roster'/>
          <Route
            exact path='/editRoster'
            component={RosterEditable}
            key='RosterEditable'/>
          <Route
            exact path='/editRoster/:id'
            component={RosterEditable}
            key='RosterEditableID'/>
        </main>
      </div>
    );
  }
}

export default App;
