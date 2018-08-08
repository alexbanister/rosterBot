import * as actions from './actions';

describe('CreateTeam action', ()=>{
  it('SAVE_TEAM_NAME should take a string and return an action', () => {
    const teamName = 'Super Happy Fun Time';
    const expected = {
      type: 'SAVE_TEAM_NAME',
      teamName: 'Super Happy Fun Time'
    };

    expect(actions.saveTeamName(teamName)).toEqual(expected);
  });
});
