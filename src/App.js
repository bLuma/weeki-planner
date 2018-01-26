import React, { Component } from 'react'
import * as common from './common'
import Table from './Table'
import ControlPanel from './ControlPanel'
import moment from 'moment'
import Api from './api'
import './App.css'
import Snackbar from 'material-ui/Snackbar';

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
      editMode: false,
      editType: common.EDIT_TYPE_SL,
      apikey: props.apikey,

      snackbarOpen: false,
      snackbarMessage: ''
    }

    this.onSelectedWeek = this.onSelectedWeek.bind(this)
    this.onSelectedAction = this.onSelectedAction.bind(this)
    this.onSelectedEditType = this.onSelectedEditType.bind(this)
    this.onTableClick = this.onTableClick.bind(this)
    this.onTableCommentUpdate = this.onTableCommentUpdate.bind(this)
    this.onUpdateActionCallback = this.onUpdateActionCallback.bind(this)
    this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this)
    this.api = new Api();
  }

  handleSnackbarRequestClose() {
    this.setState({snackbarOpen: false})
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
    this.setState(state => {
      const userDataObject = this.findUserDataObject(state.data, state.user)
      if (userDataObject.data[day] === undefined) {
        userDataObject.data[day] = common.emptySet.slice()
      }

      const hourIndex = hour - common.baseHour
      const action = state.action
      const oldSlotState = userDataObject.data[day][hourIndex]

      if (state.editType === common.EDIT_TYPE_SPECIFIC && action !== "unset") {
        userDataObject.data[day][hourIndex] = {
          base: oldSlotState,
          override: state.week.unix(),
          state: action,
          type: 'custom',
          comment: ''
        }
      } else if (state.editType === common.EDIT_TYPE_SPECIFIC && action === "unset" && userDataObject.data[day][hourIndex].base !== undefined) {
        userDataObject.data[day][hourIndex] = userDataObject.data[day][hourIndex].base
      } else {
        userDataObject.data[day][hourIndex] = {
          ...oldSlotState,
          state: action,
          comment: ''
        }
      }

      this.api.updateAction(state, day, hourIndex, state.action, '', () => {
        console.log('sucess update action')
      }, () => {
        console.log('failed update action')
        this.onUpdateActionCallback(day, hourIndex, oldSlotState)
      })

      return state
    })
  }

  onUpdateActionCallback(day, hourIndex, slotState) {
    this.setState(state => {
      const userDataObject = this.findUserDataObject(state.data, state.user)
      if (userDataObject.data[day] === undefined) {
        userDataObject.data[day] = common.emptySet.slice()
      }

      userDataObject.data[day][hourIndex] = slotState

      state.snackbarOpen = true
      state.snackbarMessage = 'Chyba komunikace, nepodařilo se nastavit stav!'

      return state
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
      dateTimeFormat: this.props.dateTimeFormat,
      onSelectedAction: this.onSelectedAction,
      onSelectedWeek: this.onSelectedWeek,
      onTableClick: this.onTableClick,
      onTableCommentUpdate: this.onTableCommentUpdate,
      onSelectedEditType: this.onSelectedEditType,
    }
    

    return (
      <div className="App">
        {/* <AppBar title='Weeki-Planner' /> */}
        <ControlPanel appState={appState} />
        <Table appState={appState} />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarRequestClose}
        />
      </div>
    );
  }
}

export default App;
