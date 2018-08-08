import * as actions from './actions';

describe('RosterEditable action', ()=>{
  it('SAVE_ROSTER should take a roster and return an action', () => {
    const roster = {
      name: '3rd Friday Lineup',
      id: 3,
      roster: {
        starter0: {
          name: 'Bob'
        }
      }
    };
    const expected = {
      type: 'SAVE_ROSTER',
      roster
    };

    expect(actions.saveRoster(roster)).toEqual(expected);
  });
  it('UPDATE_ROSTER_ID should take no value and return an action', () => {
    const expected = {
      type: 'UPDATE_ROSTER_ID'
    };

    expect(actions.updateRosterID()).toEqual(expected);
  });
});
