import { shallow } from 'enzyme';
import { Header } from './index';
import React from 'react';


describe('Header', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<Header location={{ pathname: '/' }}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
