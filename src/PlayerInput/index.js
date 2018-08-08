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
      strength: props.strength || 0,
      agility: props.agility || 0,
      role: props.role
    };
  }

  handleChange(field, value){
    this.setState({
      [field]: value
    });
  }

  keepAsNumber(num) {
    num = num ? num : 0;
    return parseInt(num, 10);
  }

  getStatTotal({ speed, agility, strength }){
    return speed + agility + strength;
  }

  render() {
    const isError = this.props.errors ? 'error' : 'clean';
    return (
      <tr className={`playerInput ${isError}`}>
        <td>
          <input
            type='text'
            placeholder='First Name'
            value={this.state.firstName}
            onChange={(event) => this.handleChange('firstName', event.target.value)}
            onBlur={() => this.props.savePlayer(this.state)}
          />
        </td>
        <td>
          <input
            type='text'
            placeholder='Last Name'
            value={this.state.lastName}
            onChange={(event) => this.handleChange('lastName', event.target.value)}
            onBlur={() => this.props.savePlayer(this.state)}
          />
        </td>
        <td>
          <input
            type='number'
            className='attr'
            value={this.state.speed}
            onChange={(event) => this.handleChange('speed', this.keepAsNumber(event.target.value, 10))}
            onBlur={() => this.props.savePlayer(this.state)}
          />
        </td>
        <td>
          <input
            type='number'
            className='attr'
            value={this.state.strength}
            onChange={(event) => this.handleChange('strength', this.keepAsNumber(event.target.value, 10))}
            onBlur={() => this.props.savePlayer(this.state)}
          />
        </td>
        <td>
          <input
            type='number'
            className='attr'
            value={this.state.agility}
            onChange={(event) => this.handleChange('agility', this.keepAsNumber(event.target.value, 10))}
            onBlur={() => this.props.savePlayer(this.state)}
          />
        </td>
        <td>
          { this.getStatTotal(this.state) }
        </td>
        <td className='errorMessage'>
          <div className='tooltip'>
            <img src={process.env.PUBLIC_URL + '/warning.svg'} alt='Error Icon'/>
            <span className='tooltiptext'>
              {this.props.errorMessage}
            </span>
          </div>
        </td>
      </tr>
    );
  }
}

PlayerInput.propTypes ={
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  speed: PropTypes.number,
  strength: PropTypes.number,
  agility: PropTypes.number,
  role: PropTypes.string,
  errorMessage: PropTypes.string,
  errors: PropTypes.number,
  savePlayer: PropTypes.func
};

export default PlayerInput;
