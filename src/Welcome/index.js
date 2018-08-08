import React from 'react';
import PropTypes from 'prop-types';
import CreateTeam from '../CreateTeam/';
import RosterEditable from '../RosterEditable/';
import { connect } from 'react-redux';
import './styles.css';

const Welcome = ({ teamName }) => {
  const setFormStep = (teamName) => {
    return teamName ? <CreateTeam /> : <RosterEditable />;
  };

  return (
    <div className='welcome'>
      <h3>Welcome to RosterBot</h3>
      { setFormStep(teamName) }
    </div>
  );
};

Welcome.propTypes ={
  teamName: PropTypes.string
};

const mapStateToProps =  (store) => ({
  teamName: store.teamName,
  rosters: store.rosters
});

export default connect(mapStateToProps)(Welcome);
