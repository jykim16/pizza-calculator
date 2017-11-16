import React, { Component } from 'react';

import Title from './Title';
import Input from './Input';
import Result from './Result';

import calculatePizzasNeeded from './lib/calculate-pizzas-needed';

const initialState = {
  numberOfPeople: 10,
  slicesPerPerson: 2,
};

export default class Application extends Component {
  state = { ...initialState };

  updateNumberOfPeople = event => {
    const numberOfPeople = parseInt(event.target.value, 10);
    this.setState({ numberOfPeople });
  };

  updateSlicesPerPerson = event => {
    const slicesPerPerson = parseInt(event.target.value, 10);
    this.setState({ slicesPerPerson });
  };

  reset = event => {
    this.setState({ ...initialState });
  };

  render() {
    const { numberOfPeople, slicesPerPerson } = this.state;
    return (
      <div className="Application">
        <Pizza
          numberOfPeople={numberOfPeople}
          slicesPerPerson={slicesPerPerson}
          updateSlicesPerPerson={this.updateSlicesPerPerson}
          updateNumberOfPeople={this.updateNumberOfPeople}
          reset={this.reset}
        />
      </div>
    );
  }
}

class Pizza extends Component {
  render() {
    const { numberOfPeople, slicesPerPerson, updateNumberOfPeople, updateSlicesPerPerson, reset } = this.props;
    const numberOfPizzas = calculatePizzasNeeded(
      numberOfPeople,
      slicesPerPerson,
    );

    return (
      <div className="Application">
        <Title />
        <Input
          label="Number of Guests"
          type="number"
          min={0}
          value={numberOfPeople}
          onChange={updateNumberOfPeople}
        />
        <Input
          label="Slices Per Person"
          type="number"
          min={0}
          value={slicesPerPerson}
          onChange={updateSlicesPerPerson}
        />
        <Result amount={numberOfPizzas} />
        <button className="full-width" onClick={reset}>
          Reset
        </button>
      </div>
    );
  }
}
