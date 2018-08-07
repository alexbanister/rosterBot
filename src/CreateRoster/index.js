import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTeamName } from './actions';
import PlayerInput from '../PlayerInput';

export class CreateRoster extends Component {
  constructor() {
    super();
    this.state = {
      starterCount: 10,
      subCount: 5
    };
  }

  handleChange(event){
    this.setState({
      teamName: event.target.value
    });
  }

  buildPlayerForm(count){
    const form = [];
    for (let iter = 0; iter < count; iter++) {
      form.push(<PlayerInput key={iter} />);
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
        <form onSubmit={(event) => this.saveTeamName(event, this.state.teamName)}>
          <div className='form-block'>
            <input
              type='text'
              placeholder='Roster Name'
              onChange={(event) => this.handleChange(event)}
            />
          </div>
          <h4>Starters</h4>
          <table className='form-block'>
            { tableHead }
            <tbody>
              { this.buildPlayerForm(this.state.starterCount)}
            </tbody>
          </table>
          <h4>Subsitutes</h4>
          <table className='form-block'>
            { tableHead }
            <tbody>
              { this.buildPlayerForm(this.state.subCount)}
            </tbody>
          </table>
          <button type='submit'
            disabled={!this.state.teamName}>
              Create Team
          </button>
        </form>
      </div>
    );
  }
}

CreateRoster.propTypes ={
  saveTeamName: PropTypes.func,
  teamName: PropTypes.string
};

const mapDispatchToProps = (dispatch) => ({
  saveTeamName: (teamName) => {
    dispatch(saveTeamName(teamName));
  }
});

export default connect(null, mapDispatchToProps)(CreateRoster);
