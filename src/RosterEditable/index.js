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
        '1': 'Player names must be unique',
        '2': 'Total of all stats must be less than 100',
        '3': 'Player names must be unique and total of all stats must be less than 100',
        '4': 'Player stat totals must be unique',
        '5': 'Player names and stat totals must be unique',
        '6': 'Player stat totals must be unique, and Total of all stats must be less than 100',
        '7': 'Player names and stat totals must be unique, and Total of all stats must be less than 100'
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
      return name === `${this.state.roster[player].firstName} ${this.state.roster[player].lastName}`;
    });
    return dupes.length > 0;
  }

  checkDuplicateStat(stat, key) {
    const players = Object.keys(this.state.roster);
    const dupes = players.filter(player => {
      if (player === key) {
        return false;
      }
      return stat ===
        this.state.roster[player].speed +
        this.state.roster[player].agility +
        this.state.roster[player].agility;
    });
    return dupes.length > 0;
  }

  getStatTotal({ speed, agility, strength }){
    const total = this.keepAsNumber(speed) + this.keepAsNumber(agility) + this.keepAsNumber(strength);
    const ifError = total > 100 ? 'error' : 'clean';
    return <div className={ifError}>{total}</div>;
  }

  checkStatError({ speed, agility, strength }) {
    return speed + agility + strength > 100;
  }

  savePlayer(player, key) {
    const isDuplicateName = this.checkDuplicateName(`${player.firstName} ${player.lastName}`, key) ? 1 : 0;
    const isStatOver = this.checkStatError(player) ? 2 : 0;
    const isStatDuplicate = this.checkDuplicateStat(player) ? 4 : 0;
    const errors = Object.assign({}, this.state.errors, { [key]: isDuplicateName + isStatOver + isStatDuplicate });
    const roster = Object.assign({}, this.state.roster, { [key]: player });
    this.setState({
      roster,
      errors
    });
  }

  buildPlayerForm(count, role){
    const form = [];
    for (let iter = 0; iter < count; iter++) {
      const key = `${role}${iter}`;
      const error = this.state.errors[key];
      const message = error ? this.state.errorMessages[error] : null;
      form.push(
        <PlayerInput
          key={key}
          role={role}
          errors={error}
          errorMessage={message}
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
          console.log('hi')
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
