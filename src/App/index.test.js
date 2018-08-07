import React from 'react';
import App from './index';
import { shallow } from 'enzyme';

describe('App snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});
