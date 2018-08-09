import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import CreateTeamContainer, { CreateTeam } from './index';
import React from 'react';


describe('CreateTeam', () => {
  it('Container should always match the snapshot', () => {
    const mockStore = configureStore();
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = shallow(<CreateTeamContainer
      store = {store}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should always match the snapshot', () => {
    const wrapper = shallow(<CreateTeam />);

    expect(wrapper).toMatchSnapshot();
  });

  it('CreateTeam should update state', () => {
    const initialState = {
      teamName: ''
    };
    const expectation = {
      teamName: 'Super Happy Fun Time'
    };
    const wrapper = shallow(<CreateTeam />);

    expect(wrapper.state()).toEqual(initialState);

    const teamName = wrapper.find('input');
    teamName.simulate('change', { target: { value: 'Super Happy Fun Time' }});

    expect(wrapper.state()).toEqual(expectation);
  });
});
