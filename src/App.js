import React, { Component } from 'react'
import * as common from './common.js'
import Table from './Table'
import './App.css'

import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


class Button extends Component {
  render() {
    return (
      <div className={this.props.action + " button"}>{this.props.action}</div>
    )
  }
}

class ControlPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {date: moment()}
    this.onChangeDate = this.onChangeDate.bind(this)
  }

  onChangeDate(selectedDate) {
    this.setState({date: selectedDate})
  }

  render() {
    return (
      <div id="controlPanel">
        <div className="flexflow">
          Týden: <DatePicker id="datepicker" selected={this.state.date} onChange={this.onChangeDate} locale="cs-cz"/>
        </div>
        <div className="flexflow">
          <Button action="remove"/>
          <Button action="free"/>
          <Button action="occupied"/>
          <Button action="maybe"/>
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    const data = [
      {
        user: "katka",
        data: {
          monday: ["free", "free", "occupied", "maybe", "unset", "unset", "free", "free", "occupied"],
          tuesday: ["free", "free", "occupied", "maybe", "free", "free", "free", "free", "maybe"]
        }
      },
      {
        user: "petra",
        data: {
          monday: ["occupied", "occupied", "occupied", "maybe", "free", "free", "free", "free", "free"],
          tuesday: ["free", "free", "occupied", "maybe", "free", "free", "free", "free", "free"]
        }
      }
    ]

    return (
      <div className="App">
        <ControlPanel />
        <Table hours={common.workingHours} data={data}/>
      </div>
    );
  }
}

export default App;
