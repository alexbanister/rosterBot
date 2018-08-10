import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTeamName } from './actions';

export class CreateTeam extends Component {
  constructor() {
    super();
    this.state = {
      teamName: ''
    };
  }

  handleChange(event){
    this.setState({
      teamName: event.target.value
    });
  }

  saveTeamName(event, teamName) {
    event.preventDefault();
    this.props.saveTeamName(teamName);
  }

  render() {
    return (
      <div className='createTeam'>
        <h3>Create your team</h3>
        <form onSubmit={(event) => this.saveTeamName(event, this.state.teamName)}>
          <input
            type='text'
            placeholder='Team Name'
            name='teamName'
            onChange={(event) => this.handleChange(event)}
          />
          <button type='submit'
            disabled={!this.state.teamName}>
              Create Team
          </button>
        </form>
      </div>
    );
  }
}

CreateTeam.propTypes ={
  saveTeamName: PropTypes.func,
  teamName: PropTypes.string
};

const mapDispatchToProps = (dispatch) => ({
  saveTeamName: (teamName) => {
    dispatch(saveTeamName(teamName));
  }
});

export default connect(null, mapDispatchToProps)(CreateTeam);
