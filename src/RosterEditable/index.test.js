import { shallow } from 'enzyme';
import { CreateTeam } from './index';
import React from 'react';


describe('CreateTeam', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<CreateTeam />);

    expect(wrapper).toMatchSnapshot();
  });
});
