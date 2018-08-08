import * as reducers from './reducers';

describe('RosterEditable Reducers', () => {
  it('rosters should set default state', () => {
    const expectation = [];

    expect(reducers.rosters(undefined, '')).toEqual(expectation);
  });

  it('rosters should update', () => {
    const action = {
      type: 'SAVE_ROSTER',
      roster: {
        name: '3rd Friday Lineup',
        id: 3,
        roster: {
          starter0: {
            name: 'Bob'
          }
        }
      }
    };

    expect(reducers.rosters(undefined, action)).toEqual([action.roster]);
  });
});
