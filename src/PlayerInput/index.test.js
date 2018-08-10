import { shallow } from 'enzyme';
import PlayerInput from './index';
import React from 'react';


describe('PlayerInput', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<PlayerInput errorMessage={[]} />);

    expect(wrapper).toMatchSnapshot();
  });
  it('should update state', () => {
    const initialState = {
      firstName: '',
      lastName: '',
      speed: 0,
      strength: 0,
      agility: 0,
      role: 'starter'
    };
    const expectation = {
      firstName: 'R2',
      lastName: 'D2',
      speed: 12,
      strength: 49,
      agility: 31,
      role: 'starter'
    };
    const wrapper = shallow(<PlayerInput playerRole='starter' name='starter' errorMessage={[]} />);

    expect(wrapper.state()).toEqual(initialState);

    const firstName = wrapper.find('[name="starterFirstName"]').find('input');
    const lastName = wrapper.find('[name="starterLastName"]').find('input');
    const speed = wrapper.find('[name="starterSpeed"]').find('input');
    const agility = wrapper.find('[name="starterAgility"]').find('input');
    const strength = wrapper.find('[name="starterStrength"]').find('input');
    // console.log(wrapper.debug());
    // console.log(firstName);

    firstName.simulate('change', { target: { value: 'R2' }});
    lastName.simulate('change', { target: { value: 'D2' }});
    speed.simulate('change', { target: { value: '12' }});
    agility.simulate('change', { target: { value: '31' }});
    strength.simulate('change', { target: { value: '49' }});

    expect(wrapper.state()).toEqual(expectation);
  });
});
