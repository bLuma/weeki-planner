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
    this.state = {
      week: moment(),
      user: "admin",
      action: "unset",
      data: data,
      editMode: true,
      editType: common.EDIT_TYPE_SL,
      apikey: 'admin'
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
      (r) => this.setState({data: r}),
      () => console.log("err")
    )
  }

  onSelectedWeek(week) {
    this.setState({week: week})

    console.log(week.unix());
    fetch('http://localhost:3000/backend/api/v1/calendar?api_key=' + this.state.apikey + '&timestamp=' + week.unix()).then(
      response => response.json()
    ).then(response => {
      this.setState({data: response})
    }).catch(error => {
      console.log("err " + error);
    })
  }

  onSelectedAction(action) {
    this.setState({action: action})
  }

  onSelectedEditType(editType) {
    this.setState(prevState => {
      if (editType === common.EDIT_TYPE_TURN_OFF) {
        prevState.editMode = false
        prevState.editType = common.EDIT_TYPE_SL
      } else if (editType === common.EDIT_TYPE_TURN_ON){
          prevState.editMode = true
          editType = common.EDIT_TYPE_SL
      }
      Object.assign(prevState, {editType: editType})

      this.api.getCalendar(
        prevState,
        (r) => this.setState({data: r}),
        () => console.log("err")
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
      userDataObject.data[day][hourIndex].state = prevState.action

      let fetchuri = 'http://localhost:3000/backend/api/v1/calendar-update?api_key=' + prevState.apikey
      fetchuri += '&week=' + encodeURIComponent(prevState.editType)
      fetchuri += '&day=' + encodeURIComponent(day)
      fetchuri += '&hour=' + encodeURIComponent(hourIndex)
      fetchuri += '&state=' + encodeURIComponent(prevState.action)
      fetch(fetchuri)

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

      let fetchuri = 'http://localhost:3000/backend/api/v1/calendar-update?api_key=' + prevState.apikey
      fetchuri += '&week=' + encodeURIComponent(prevState.editType)
      fetchuri += '&day=' + encodeURIComponent(day)
      fetchuri += '&hour=' + encodeURIComponent(hourIndex)
      fetchuri += '&state=' + encodeURIComponent(userDataObject.data[day][hourIndex].state)
      fetchuri += '&comment=' + encodeURIComponent(comment)
      fetch(fetchuri)

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
        <Table appState={appState}/>
      </div>
    );
  }
}

export default App;
