import { combineReducers } from 'redux';
import { teamName } from './CreateTeam/reducers';
import { rosters, rostersID } from './RosterEditable/reducers';

export default combineReducers({
  teamName,
  rosters,
  rostersID
});
