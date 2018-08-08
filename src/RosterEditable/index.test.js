import { shallow } from 'enzyme';
import { RosterEditable } from './index';
import React from 'react';


describe('RosterEditable', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<RosterEditable />);

    expect(wrapper).toMatchSnapshot();
  });
});
