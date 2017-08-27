import React, { Component } from 'react'
import * as common from './common.js'
import Table from './Table'
import ControlPanel from './ControlPanel'
import moment from 'moment'
import './App.css'

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
      data: data,
      editMode: true
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
    const appState = {
      data: this.state.data,
      action: this.state.action,
      hours: common.workingHours,
      editMode: this.state.editMode,
      user: this.state.user,
      week: this.state.week,
      onSelectedAction: this.onSelectedAction,
      onSelectedWeek: this.onSelectedWeek,
      onTableClick: this.onTableClick,
    }

    return (
      <div className="App">
        <ControlPanel appState={appState} />
        <Table appState={appState}/>
      </div>
    );
  }
}

export default App;
