import * as reducers from './reducers';

describe('CreateTeam Reducers', () => {
  it('teamName should set default state', () => {
    const expectation = '';

    expect(reducers.teamName(undefined, '')).toEqual(expectation);
  });

  it('teamName should update', () => {
    const action = {
      type: 'SAVE_TEAM_NAME',
      teamName: 'Super Happy Fun Time'
    };

    expect(reducers.teamName(undefined, action)).toEqual(action.teamName);
  });
});
