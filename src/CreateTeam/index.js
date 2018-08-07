import React, { Component } from 'react';

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

  render() {
    return (
      <div className='createTeam'>
        <form onSubmit={(event) => this.handleSignUp(event)}>
          <input
            type='text'
            placeholder='Team Name'
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

export default CreateTeam;
