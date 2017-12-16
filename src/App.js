import React, { Component } from 'react'
import * as common from './common'
import Table from './Table'
import ControlPanel from './ControlPanel'
import moment from 'moment'
import Api from './api'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    const data = []
    const startDate = moment()
    startDate.utcOffset(0)

    this.state = {
      week: startDate,
      user: props.user,
      action: "unset",
      data: data,
      editMode: true,
      editType: common.EDIT_TYPE_SL,
      apikey: props.apikey
    }

    this.onSelectedWeek = this.onSelectedWeek.bind(this)
    this.onSelectedAction = this.onSelectedAction.bind(this)
    this.onSelectedEditType = this.onSelectedEditType.bind(this)
    this.onTableClick = this.onTableClick.bind(this)
    this.onTableCommentUpdate = this.onTableCommentUpdate.bind(this)
    this.api = new Api();
  }

  componentDidMount() {
    this.api.getCalendar(
      this.state,
      (r) => this.setState({ data: r }),
      (e) => console.log("err " + e)
    )
  }

  onSelectedWeek(week) {
    this.setState(state => {
      week.utcOffset(0)
      state.week = week
      console.log(week + " " + week.unix());
      console.log(week.format());

      this.api.getCalendar(
        state,
        (r) => { this.setState({ data: r }); console.log(r[0].date) },
        (e) => console.log("err " + e)
      )

      return state
    })
  }

  onSelectedAction(action) {
    this.setState({ action: action })
  }

  onSelectedEditType(editType) {
    this.setState(prevState => {
      if (editType === common.EDIT_TYPE_TURN_OFF) {
        prevState.editMode = false
        prevState.editType = common.EDIT_TYPE_SL
      } else if (editType === common.EDIT_TYPE_TURN_ON) {
        prevState.editMode = true
        editType = common.EDIT_TYPE_SL
      }
      Object.assign(prevState, { editType: editType })

      this.api.getCalendar(
        prevState,
        (r) => this.setState({ data: r }),
        (e) => console.log("err " + e)
      )

      return prevState
    })
  }

  onTableClick(day, hour) {
    this.setState((prevState) => {
      const userDataObject = this.findUserDataObject(prevState.data, prevState.user)
      if (userDataObject.data[day] === undefined) {
        userDataObject.data[day] = common.emptySet.slice()
      }

      const hourIndex = hour - common.baseHour
      const action = prevState.action

      if (prevState.editType === common.EDIT_TYPE_SPECIFIC && action !== "unset") {
        userDataObject.data[day][hourIndex].base = userDataObject.data[day][hourIndex]
        userDataObject.data[day][hourIndex].override = prevState.week.unix()
        userDataObject.data[day][hourIndex].type = "custom"
      }

      if (prevState.editType === common.EDIT_TYPE_SPECIFIC && action === "unset" && userDataObject.data[day][hourIndex].base !== undefined) {
        userDataObject.data[day][hourIndex] = userDataObject.data[day][hourIndex].base
      } else {
        userDataObject.data[day][hourIndex].state = prevState.action
      }



      this.api.updateAction(prevState, day, hourIndex, prevState.action)

      return prevState
    })
  }

  onTableCommentUpdate(day, hour, comment) {
    this.setState((prevState) => {
      const userDataObject = this.findUserDataObject(prevState.data, prevState.user)
      if (userDataObject.data[day] === undefined) {
        userDataObject.data[day] = common.emptySet.slice()
      }

      const hourIndex = hour - common.baseHour
      userDataObject.data[day][hourIndex].comment = comment

      this.api.updateAction(prevState, day, hourIndex, userDataObject.data[day][hourIndex].state, comment)

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
      editType: this.state.editType,
      user: this.state.user,
      week: this.state.week,
      onSelectedAction: this.onSelectedAction,
      onSelectedWeek: this.onSelectedWeek,
      onTableClick: this.onTableClick,
      onTableCommentUpdate: this.onTableCommentUpdate,
      onSelectedEditType: this.onSelectedEditType,
    }

    return (
      <div className="App">
        <ControlPanel appState={appState} />
        <Table appState={appState} />
      </div>
    );
  }
}

export default App;
