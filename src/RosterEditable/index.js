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
      rosterName: props.rosterName || '',
      players: props.players || []
    };
  }

  handleChange(event){
    this.setState({
      rosterName: event.target.value
    });
  }

  savePlayer(player, key) {
    const roster = Object.assign({}, this.state.roster, { [key]: player });
    this.setState({
      roster
    });
  }

  buildPlayerForm(count, role){
    const form = [];
    for (let iter = 0; iter < count; iter++) {
      const key = `${role}${iter}`;
      form.push(
        <PlayerInput
          key={key}
          role={role}
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
  players: PropTypes.array
};

const mapDispatchToProps = (dispatch) => ({
  saveTeamName: (teamName) => {
    dispatch(saveTeamName(teamName));
  }
});

export default connect(null, mapDispatchToProps)(RosterEditable);
