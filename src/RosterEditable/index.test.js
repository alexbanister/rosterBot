import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import createRouterContext from 'react-router-test-context';
import RosterEditableContainer, { RosterEditable } from './index';
import React from 'react';


describe('RosterEditable', () => {
  it('should always match the snapshot', () => {
    const context = createRouterContext();
    const wrapper = shallow(<RosterEditable rosters={[]} match={{ params: {}}}/>, { context });

    expect(wrapper).toMatchSnapshot();
  });
  it('Container should always match the snapshot', () => {
    const mockStore = configureStore();
    const initialState = { rostersID: { id: 1 }};
    const store = mockStore(initialState);
    const wrapper = shallow(<RosterEditableContainer
      store = {store}
    />);

    expect(wrapper).toMatchSnapshot();
  });
  it('should update state', () => {
    const context = createRouterContext();
    const initialState = {
      starterCount: 1,
      subCount: 1,
      rosterNameError: 'clean',
      errorMessages: {
        duplicateName: 'Player name already taken',
        statOverMax: 'Total of all stats must be less than 100',
        duplicateStat: 'Player stat totals must be unique',
        nameRequired: 'Player first and last name is required'
      },
      errors: {},
      rosterName: '',
      roster: {}
    };
    const expectation = {
      starterCount: 1,
      subCount: 1,
      rosterNameError: 'clean',
      errorMessages: {
        duplicateName: 'Player name already taken',
        statOverMax: 'Total of all stats must be less than 100',
        duplicateStat: 'Player stat totals must be unique',
        nameRequired: 'Player first and last name is required'
      },
      errors: {},
      rosterName: 'My Awesome Roster',
      roster: {}
    };
    const wrapper = shallow(<RosterEditable rosters={[]} match={{ params: {}}}/>, { context });

    expect(wrapper.state()).toEqual(initialState);

    const rosterName = wrapper.find('[name="rosterName"]').find('input');
    rosterName.simulate('change', { target: { value: 'My Awesome Roster' }});

    expect(wrapper.state()).toEqual(expectation);
  });
});
