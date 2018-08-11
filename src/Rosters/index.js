import React from 'react';
import PropTypes from 'prop-types';
import { removeRoster } from '../RosterEditable/actions';
import { connect } from 'react-redux';
import './styles.css';

export const Rosters = ({ rosters, history, removeRoster }) => {
  const sortByRole = (roster, role) => {
    const newList = Object.keys(roster).filter(player => {
      return roster[player].role === role;
    });
    return newList.map(player => {
      return roster[player];
    });
  };

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
          <h4 className='rosterName'>{roster.name}</h4>
          <div className='buttonArea'>
            <button
              className='editButton'
              onClick={() => {
                history.push(`/editRoster/${roster.id}`);
              }}>Edit</button>
            <button
              className='removeButton'
              onClick={() => {
                removeRoster(roster.id);
              }}>Remove</button>
          </div>
          <table>
            {tableHead}
            <tbody>
              <tr>
                <td className='roles' colSpan='7'>
                  Starters
                </td>
              </tr>
              {displayPlayers(sortByRole(roster.roster, 'starter'))}
              <tr>
                <td className='roles' colSpan='7'>
                  Subs
                </td>
              </tr>
              {displayPlayers(sortByRole(roster.roster, 'sub'))}
            </tbody>
          </table>
        </div>
      );
    });
  };

  return (
    <div className='rosters'>
      <h3>Your Team Rosters</h3>
      {displayRosters(rosters)}
      <button
        className='addButton'
        onClick={() => {
          history.push('/editRoster');
        }}>
        + Add Roster</button>
    </div>
  );
};

Rosters.propTypes ={
  rosters: PropTypes.array,
  history: PropTypes.object,
  removeRoster: PropTypes.func
};

const mapStateToProps =  (store) => ({
  rosters: store.rosters
});

const mapDispatchToProps = (dispatch) => ({
  removeRoster: (id) => {
    dispatch(removeRoster(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Rosters);
