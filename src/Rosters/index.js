import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';

export const Rosters = ({ rosters, history }) => {
  const displayPlayers = (players) => {
    const keys = Object.keys(players);
    return keys.map(key => {
      return (
        <tr key={key}>
          <td>{players[key].id}</td>
          <td>{players[key].firstName}</td>
          <td>{players[key].lastName}</td>
          <td>{players[key].speed}</td>
          <td>{players[key].agility}</td>
          <td>{players[key].strength}</td>
          <td>{players[key].speed + players[key].agility + players[key].strength}</td>
        </tr>
      );
    });
  };

  const displayRosters = (rosters) => {
    const tableHead =
    <thead>
      <tr>
        <th>Player ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Speed</th>
        <th>Agility</th>
        <th>Strength</th>
        <th>Stat Score</th>
      </tr>
    </thead>;
    return rosters.map((roster, iter) => {
      return (
        <div className='roster' key={`${roster.name}${iter}`}>
          <h4>{roster.name}</h4>
          <table>
            {tableHead}
            <tbody>
              {displayPlayers(roster.roster)}
            </tbody>
          </table>
        </div>
      );
    });
  };

  return (
    <div className='rosters'>
      <h3>Welcome to RosterBot</h3>
      {displayRosters(rosters)}
      <button
        onClick={() => {
          history.push('/editRoster');
        }}>
        + Add Roster</button>
    </div>
  );
};

Rosters.propTypes ={
  rosters: PropTypes.array,
  history: PropTypes.object
};

const mapStateToProps =  (store) => ({
  rosters: store.rosters
});

export default connect(mapStateToProps)(Rosters);
