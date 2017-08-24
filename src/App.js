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
      <div onClick={() => this.props.onSelectedAction(this.props.action)} className={this.props.action + " button"}>{this.props.action}</div>
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
    this.props.onSelectedWeek(selectedDate)
  }

  render() {
    return (
      <div id="controlPanel">
        <div className="flexflow">
          Týden: <DatePicker id="datepicker" selected={this.state.date} onChange={this.onChangeDate} locale="cs-cz"/>
        </div>
        <div className="flexflow">
          <Button action="remove" onSelectedAction={this.props.onSelectedAction}/>
          <Button action="free" onSelectedAction={this.props.onSelectedAction}/>
          <Button action="occupied" onSelectedAction={this.props.onSelectedAction}/>
          <Button action="maybe" onSelectedAction={this.props.onSelectedAction}/>
        </div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)

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

    this.state = {
      week: moment(),
      user: "katka",
      action: "unset",
      data: data
    }

    this.onSelectedWeek = this.onSelectedWeek.bind(this)
    this.onSelectedAction = this.onSelectedAction.bind(this)
    this.onTableClick = this.onTableClick.bind(this)
  }

  onSelectedWeek(week) {
    this.setState({week: week})
  }

  onSelectedAction(action) {
    this.setState({action: action})
  }

  onTableClick(day, hour) {
    this.setState((prevState) => {
      const userDataObject = this.findUserDataObject(prevState.data, prevState.user)
      if (userDataObject.data[day] === undefined) {
        userDataObject.data[day] = common.emptySet.slice()
      }

      const hourIndex = hour - common.baseHour
      userDataObject.data[day][hourIndex] = prevState.action

      return prevState
    })
  }

  findUserDataObject(data, user) {
    for (const obj of data) {
      if (obj.user === user)
        return obj
    }

    return undefined
  }


  render() {
    return (
      <div className="App">
        <ControlPanel onSelectedWeek={this.onSelectedWeek} onSelectedAction={this.onSelectedAction}/>
        <Table hours={common.workingHours} data={this.state.data} onTableClick={this.onTableClick}/>
      </div>
    );
  }
}

export default App;
