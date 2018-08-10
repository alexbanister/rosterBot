import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const Roster = () => {
  return (
    <div className='rosters'>
      <h3>It a roster</h3>
    </div>
  );
};

Roster.propTypes ={
  roster: PropTypes.object
};

export default Roster;
