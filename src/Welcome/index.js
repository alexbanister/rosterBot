import React from 'react';
import CreateTeam from '../CreateTeam/';
import './styles.css';

const Welcome = () => {
  return (
    <div className='welcome'>
      <h3>Welcome to RosterBot</h3>
      <h3>Create your team</h3>
      <CreateTeam />
    </div>
  );
};

export default Welcome;
