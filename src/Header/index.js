import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.css';

export const Header = (props) => {
  if (props.location.pathname !== '/' && props.rosters.length < 1) {
    props.history.push('/');
  }
  return (
    <div className='header'>
      <h1>Roster<strong>Bot</strong></h1>
      <h2>{props.teamName}</h2>
    </div>
  );
};

Header.propTypes ={
  teamName: PropTypes.string,
  rosters: PropTypes.array,
  history: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps =  (store) => ({
  teamName: store.teamName,
  rosters: store.rosters
});

export default withRouter(connect(mapStateToProps)(Header));
