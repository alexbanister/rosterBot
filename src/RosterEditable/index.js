import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTeamName } from './actions';
import PlayerInput from '../PlayerInput';

export class RosterEditable extends Component {
  constructor({...props}) {
    super();
    this.state = {
      starterCount: 3,
      subCount: 1,
      errorMessages: {
        duplicateName: 'Player names must be unique',
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

  getStatTotal({ speed, agility, strength }){
    const total = this.keepAsNumber(speed) + this.keepAsNumber(agility) + this.keepAsNumber(strength);
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
          role={role}
          error={isError}
          errorMessage={errorMessages}
          validatePlayer={(player) => this.validatePlayer(player, key)}
          savePlayer={(player) => this.savePlayer(player, key)}
        />);
    }
    return form;
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
        }
        }>
          <div className='form-block'>
            <input
              type='text'
              placeholder='Roster Name'
              value={this.state.rosterName}
              onChange={(event) => this.handleChange(event)}
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
          <button type='submit'>
              Create Team
          </button>
        </form>
      </div>
    );
  }
}

RosterEditable.propTypes ={
  rosterName: PropTypes.string,
  roster: PropTypes.object
};

const mapDispatchToProps = (dispatch) => ({
  saveTeamName: (teamName) => {
    dispatch(saveTeamName(teamName));
  }
});

export default connect(null, mapDispatchToProps)(RosterEditable);
