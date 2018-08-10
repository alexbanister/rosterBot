import { shallow } from 'enzyme';
import { Rosters } from './index';
import React from 'react';


describe('Rosters', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<Rosters />);

    expect(wrapper).toMatchSnapshot();
  });
});
