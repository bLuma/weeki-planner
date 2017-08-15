import React, { Component } from 'react';
import './App.css';

class TableHeaderWithHours extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.click = this.click.bind(this);
  }

  click(e) {
    let key = e.target.attributes.getNamedItem('data-key').value;
    this.setState(prevState => ({
      [key]: !prevState[key]
    }));
  }

  click2(e, i) {
    this.setState(prevState => ({
      [i]: !prevState[i]
    }));
  }

  render() {
    let ths = this.props.hours.map(hour => (
      this.state[hour] ?
        <th className='red' onClick={this.click} key={hour} data-key={hour}>{hour}-{hour + 1}</th>
        :
        <th onClick={(e) => {this.click2(e, hour);}} key={hour} data-key={hour}>{hour}-{hour + 1}</th>

    ));

    return (
      <tr>
        <td colSpan="2"></td>
        {ths}
      </tr>
    );
  }
}

class Tabulka extends Component {
  render() {
    return (
      <table>
        <thead>
          <TableHeaderWithHours hours={this.props.hours}/>
        </thead>
        <tbody>
          <tr><td>aa</td></tr>
        </tbody>
      </table>
    );
  }
}

class App extends Component {
  render() {
    const hours = [8,9,10,11,12,13,14,15,16];

    return (
      <div className="App">
        <Tabulka hours={hours}/>
      </div>


    );
  }
}

export default App;
