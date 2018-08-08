import { shallow } from 'enzyme';
import PlayerInput from './index';
import React from 'react';


describe('PlayerInput', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<PlayerInput errorMessage={[]} />);

    expect(wrapper).toMatchSnapshot();
  });
});
