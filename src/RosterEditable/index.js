import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveRoster, updateRosterID } from './actions';
import PlayerInput from '../PlayerInput';

export class RosterEditable extends Component {
  constructor({...props}) {
    super();
    this.state = {
      starterCount: 1,
      subCount: 1,
      rosterNameError: 'clean',
      errorMessages: {
        duplicateName: 'Player name already taken',
        statOverMax: 'Total of all stats must be less than 100',
        duplicateStat: 'Player stat totals must be unique',
        nameRequired: 'Player first and last name is required'
      },
      errors: {},
      rosterName: props.rosterName || '',
      roster: props.roster || {}
    };
  }

  handleChange(event){
    this.setState({
      rosterName: event.target.value
    });
  }

  checkDuplicateName(name, key) {
    const players = Object.keys(this.state.roster);
    const dupes = players.filter(player => {
      if (player === key) {
        return false;
      }
      return name.toLowerCase() ===
        `${this.state.roster[player].firstName} ${this.state.roster[player].lastName}`.toLowerCase();
    });
    return dupes.length > 0;
  }

  checkDuplicateStat(stat, key) {
    const players = Object.keys(this.state.roster);
    const dupes = players.filter(player => {
      if (player === key) {
        return false;
      }

      const total =
        this.state.roster[player].speed +
        this.state.roster[player].agility +
        this.state.roster[player].strength;
      return stat === total;
    });
    return dupes.length > 0;
  }

  checkStatError({ speed, agility, strength }) {
    return speed + agility + strength > 100;
  }

  checkNameNotNull(name) {
    return name.length < 1;
  }

  validatePlayer(player, key) {
    let isError = false;
    const errorMessages = [];
    if (this.checkDuplicateName(`${player.firstName} ${player.lastName}`, key)) {
      isError = true;
      errorMessages.push(this.state.errorMessages.duplicateName);
    }
    if (this.checkStatError(player)) {
      isError = true;
      errorMessages.push(this.state.errorMessages.statOverMax);
    }
    if (this.checkDuplicateStat(player.speed + player.agility + player.strength, key)) {
      isError = true;
      errorMessages.push(this.state.errorMessages.duplicateStat);
    }
    if (this.checkNameNotNull(player.firstName) || this.checkNameNotNull(player.lastName)) {
      isError = true;
      errorMessages.push(this.state.errorMessages.nameRequired);
    }
    const errors = Object.assign({}, this.state.errors, {
      [key]: {
        isError,
        errorMessages
      }
    });
    this.setState({
      errors
    });
  }

  checkRosterName(name) {
    this.setState({
      rosterNameError: !name ? 'error' : 'clean'
    });
  }

  validateRoster(name, roster, errors, size) {
    if (!name){
      return true;
    }
    if (Object.keys(roster).length !== size) {
      return true;
    }
    const hasError = Object.keys(errors).filter(key => {
      return errors[key].isError === true;
    });
    if (hasError.length > 0) {
      return true;
    }
    return false;
  }

  getStatTotal({ speed, agility, strength }){
    const total = speed + agility + strength;
    const ifError = total > 100 ? 'error' : 'clean';
    return <div className={ifError}>{total}</div>;
  }

  savePlayer(player, key) {
    const roster = Object.assign({}, this.state.roster, { [key]: player });
    this.setState({ roster });
  }

  buildPlayerForm(count, role){
    const form = [];
    for (let iter = 0; iter < count; iter++) {
      const key = `${role}${iter}`;
      let isError = this.state.errors[key] ? this.state.errors[key].isError : false;
      const errorMessages = this.state.errors[key] ? this.state.errors[key].errorMessages : [];
      form.push(
        <PlayerInput
          key={key}
          name={key}
          playerRole={role}
          error={isError}
          errorMessage={errorMessages}
          validatePlayer={(player) => this.validatePlayer(player, key)}
          savePlayer={(player) => this.savePlayer(player, key)}
        />);
    }
    return form;
  }

  setPlayerID({ firstName, lastName, speed, agility, strength }, rosterID) {
    let stat = (speed + agility + strength).toString();
    while (stat.length < 3){
      stat = `0${stat}`;
    }
    return `${firstName[0]}${lastName[0]}${stat}${rosterID}`.slice(0, 6);
  }

  prepRoster(name, roster) {
    const players = Object.keys(roster);
    const rosterWithIDs = {};
    players.forEach(player => {
      rosterWithIDs[player] = Object.assign({},
        roster[player],
        { id: this.setPlayerID(roster[player], this.props.rosterID) }
      );
    });
    const completeRoster = {
      name,
      id: this.props.rosterID,
      roster: rosterWithIDs
    };
    return completeRoster;
  }

  render() {
    const tableHead =
    <thead>
      <tr>
        <th>
          First Name
        </th>
        <th>
          Last Name
        </th>
        <th>
          Speed
        </th>
        <th>
          Agility
        </th>
        <th>
          Strength
        </th>
        <th>
          Stat Score
        </th>
      </tr>
    </thead>;

    return (
      <div className='createRoster'>
        <h3>Create a Roster</h3>
        <form onSubmit={(event) => {
          event.preventDefault();
          this.props.saveRoster(this.prepRoster(this.state.rosterName, this.state.roster));
          this.props.updateRosterID();
          this.props.history.push('/rosters');
        }
        }>
          <div className={`form-block ${this.state.rosterNameError}`}>
            <input
              type='text'
              placeholder='Roster Name'
              name='rosterName'
              value={this.state.rosterName}
              onChange={(event) => this.handleChange(event)}
              onBlur={() => this.checkRosterName(this.state.rosterName)}
            />
          </div>
          <h4>Starters</h4>
          <table className='form-block'>
            { tableHead }
            <tbody>
              { this.buildPlayerForm(this.state.starterCount, 'starter')}
            </tbody>
          </table>
          <h4>Subsitutes</h4>
          <table className='form-block'>
            { tableHead }
            <tbody>
              { this.buildPlayerForm(this.state.subCount, 'sub')}
            </tbody>
          </table>
          <button
            type='submit'
            // disabled={this.validateRoster(
            //   this.state.rosterName,
            //   this.state.roster,
            //   this.state.errors,
            //   this.state.starterCount + this.state.subCount)}
          >
              Save Roster
          </button>
        </form>
      </div>
    );
  }
}

RosterEditable.propTypes ={
  rosterName: PropTypes.string,
  roster: PropTypes.object,
  rosterID: PropTypes.number,
  saveRoster: PropTypes.func,
  updateRosterID: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps =  (store) => ({
  rosterName: store.rosterName,
  rosters: store.rosters,
  rosterID: store.rostersID.id
});

const mapDispatchToProps = (dispatch) => ({
  saveRoster: (roster) => {
    dispatch(saveRoster(roster));
  },
  updateRosterID: (id) => {
    dispatch(updateRosterID(id));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RosterEditable));
