import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {WorkingHours, EmptySet, BaseHour, EDIT_TYPE_SL, EDIT_TYPE_TURN_OFF, EDIT_TYPE_TURN_ON, EDIT_TYPE_SPECIFIC} from './common'
import Table from './Table/Table'
import ControlPanel from './ControlPanel'
import moment from 'moment'
import Api from './api'
import Snackbar from 'material-ui/Snackbar'
import CircularProgress from 'material-ui/CircularProgress'
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
      editMode: false,
      editType: EDIT_TYPE_SL,
      apikey: props.apikey,

      snackbarOpen: false,
      snackbarMessage: '',
      
      showSpinner: true
    }

    this.onSelectedWeek = this.onSelectedWeek.bind(this)
    this.onSelectedAction = this.onSelectedAction.bind(this)
    this.onSelectedEditType = this.onSelectedEditType.bind(this)
    this.onTableClick = this.onTableClick.bind(this)
    this.onTableCommentUpdate = this.onTableCommentUpdate.bind(this)
    this.onUpdateActionCallback = this.onUpdateActionCallback.bind(this)
    this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this)
    this.api = new Api()
  }

  handleSnackbarRequestClose() {
    this.setState({snackbarOpen: false})
  }

  componentDidMount() {
    this.api.getCalendar(
      this.state,
      result => this.setState({ data: result, showSpinner: false }),
      error => this.setState({ snackbarOpen: true, snackbarMessage: '' + error, showSpinner: false})
    )
  }

  onSelectedWeek(week) {
    this.setState(state => {
      week.utcOffset(0)
      state.week = week
      state.showSpinner = true
      // console.log(week + " " + week.unix());
      // console.log(week.format());

      this.api.getCalendar(
        state,
        result => this.setState({ data: result, showSpinner: false }),
        error => this.setState({ snackbarOpen: true, snackbarMessage: '' + error, showSpinner: false})
      )

      return state
    })
  }

  onSelectedAction(action) {
    this.setState({ action: action })
  }

  onSelectedEditType(editType) {
    this.setState(state => {
      if (editType === EDIT_TYPE_TURN_OFF) {
        state.editMode = false
        state.editType = EDIT_TYPE_SL
      } else if (editType === EDIT_TYPE_TURN_ON) {
        state.editMode = true
        editType = EDIT_TYPE_SL
      }
      
      state.editType = editType
      state.data = []
      state.showSpinner = true

      this.api.getCalendar(
        state,
        result => this.setState({ data: result, showSpinner: false }),
        error => this.setState({ snackbarOpen: true, snackbarMessage: '' + error, showSpinner: false})
      )

      return state
    })
  }

  onTableClick(day, hour) {
    this.setState(state => {
      const userDataObject = this.findUserDataObject(state.data, state.user)
      if (userDataObject.data[day] === undefined) {
        userDataObject.data[day] = EmptySet.slice()
      }

      const hourIndex = hour - BaseHour
      const action = state.action
      const oldSlotState = userDataObject.data[day][hourIndex]

      if (state.editType === EDIT_TYPE_SPECIFIC && action !== "unset") {
        userDataObject.data[day][hourIndex] = {
          base: oldSlotState,
          override: state.week.unix(),
          state: action,
          type: 'custom',
          comment: ''
        }
      } else if (state.editType === EDIT_TYPE_SPECIFIC && action === "unset" && userDataObject.data[day][hourIndex].base !== undefined) {
        userDataObject.data[day][hourIndex] = userDataObject.data[day][hourIndex].base
      } else {
        userDataObject.data[day][hourIndex] = {
          ...oldSlotState,
          state: action,
          comment: ''
        }
      }

      this.api.updateAction(state, day, hourIndex, state.action, '',
        () => { 
          console.log('sucess update action')
        }, 
        () => {
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
        userDataObject.data[day] = EmptySet.slice()
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
        userDataObject.data[day] = EmptySet.slice()
      }

      const hourIndex = hour - BaseHour
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
      hours: WorkingHours,
      dateTimeFormat: this.props.dateTimeFormat,
      action: this.state.action,
      data: this.state.data,
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
        {this.state.showSpinner && <CircularProgress size={100} thickness={10} />}
        {!this.state.showSpinner && <Table appState={appState} />}
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

App.propTypes = {
  user: PropTypes.string.isRequired,
  apikey: PropTypes.string.isRequired,
  dateTimeFormat: PropTypes.func.isRequired
}

export default App;
