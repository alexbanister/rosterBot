import * as reducers from './reducers';

describe('RosterEditable Reducers', () => {
  it('rosters should set default state', () => {
    const expectation = [];

    expect(reducers.rosters(undefined, '')).toEqual(expectation);
  });

  it('rosters should save', () => {
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
  it('rosters should update', () => {
    const intial = [{
      name: '3rd Friday Lineup',
      id: 3,
      roster: {
        starter0: {
          name: 'Jim'
        }
      }
    }];
    const action = {
      type: 'UPDATE_ROSTER',
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

    expect(reducers.rosters(intial, action)).toEqual([action.roster]);
  });
  it('rosters should remove', () => {
    const intial = [{
      name: '3rd Friday Lineup',
      id: 3,
      roster: {
        starter0: {
          name: 'Jim'
        }
      }
    }];
    const action = {
      type: 'REMOVE_ROSTER',
      id: 3
    };

    expect(reducers.rosters(intial, action)).toEqual([]);
  });

  it('rostersID should update', () => {
    const action = {
      type: 'UPDATE_ROSTER_ID'
    };

    expect(reducers.rostersID(undefined, action)).toEqual({ id: 2 });
    expect(reducers.rostersID({ id: 3 }, action)).toEqual({ id: 4 });
  });
});
