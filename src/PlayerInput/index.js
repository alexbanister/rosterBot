import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export class PlayerInput extends Component {
  constructor({...props}) {
    super();
    this.state = {
      firstName: props.firstName || '',
      lastName: props.lastName || '',
      speed: props.speed || 0,
      stregnth: props.stregnth || 0,
      agility: props.agility || 0,
      role: props.role
    };
  }

  handleChange(field, event){
    this.setState({
      [field]: event.target.value
    });
  }

  keepAsNumber(num) {
    num = num ? num : 0;
    return parseInt(num, 10);
  }

  getStatTotal({ speed, agility, stregnth }){
    const total = this.keepAsNumber(speed) + this.keepAsNumber(agility) + this.keepAsNumber(stregnth);
    const ifError = total > 100 ? 'error' : 'clean';
    return <div className={ifError}>{total}</div>;
  }

  render() {
    return (
      <tr className='playerInput'>
        <td>
          <input
            type='text'
            placeholder='First Name'
            value={this.state.firstName}
            onChange={(event) => this.handleChange('firstName', event)}
            onBlur={() => this.props.savePlayer(this.state)}
          />
        </td>
        <td>
          <input
            type='text'
            placeholder='Last Name'
            value={this.state.lastName}
            onChange={(event) => this.handleChange('lastName', event)}
            onBlur={() => this.props.savePlayer(this.state)}
          />
        </td>
        <td>
          <input
            type='number'
            className='attr'
            value={this.state.speed}
            onChange={(event) => this.handleChange('speed', event)}
            onBlur={() => this.props.savePlayer(this.state)}
          />
        </td>
        <td>
          <input
            type='number'
            className='attr'
            value={this.state.stregnth}
            onChange={(event) => this.handleChange('stregnth', event)}
            onBlur={() => this.props.savePlayer(this.state)}
          />
        </td>
        <td>
          <input
            type='number'
            className='attr'
            value={this.state.agility}
            onChange={(event) => this.handleChange('agility', event)}
            onBlur={() => this.props.savePlayer(this.state)}
          />
        </td>
        <td>
          { this.getStatTotal(this.state) }
        </td>
      </tr>
    );
  }
}

PlayerInput.propTypes ={
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  speed: PropTypes.number,
  stregnth: PropTypes.number,
  agility: PropTypes.number,
  role: PropTypes.string,
  savePlayer: PropTypes.func
};

export default PlayerInput;
