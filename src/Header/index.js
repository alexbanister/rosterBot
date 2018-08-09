import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.css';

export const Header = () => {
  if (this.props.rosters.length < 1) {
    this.props.history.push('/');
  }
  return (
    <div className='header'>
      <h1>RosterBot</h1>
      <h2>{this.props.teamName}</h2>
    </div>
  );
};

Header.propTypes ={
  teamName: PropTypes.string,
  rosters: PropTypes.array
};

const mapStateToProps =  (store) => ({
  teamName: store.teamName,
  rosters: store.rosters
});

export default withRouter(connect(mapStateToProps)(Header));
