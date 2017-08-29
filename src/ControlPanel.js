import React, { Component } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
//import FontAwesome from 'react-fontawesome'
import * as common from './common'
import {Button, ButtonFA} from './Button'

export default class ControlPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {date: moment()}
    this.onChangeDate = this.onChangeDate.bind(this)
  }

  onChangeDate(selectedDate) {
    this.setState({date: selectedDate})
    this.props.appState.onSelectedWeek(selectedDate)
  }

  render() {
    const editTypeButtonProps = {
      activeAction: this.props.appState.editType,
      onSelectedAction: this.props.appState.onSelectedEditType,
      extraClassName: "smallerButton",
    }
    const actionButtonProps = {
      activeAction: this.props.appState.action,
      onSelectedAction: this.props.appState.onSelectedAction,
    }
    const shouldDisableDatePicker = this.props.appState.editMode && this.props.appState.editType !== common.EDIT_TYPE_SPECIFIC

    return (
      <div id="controlPanel">
        <div className="flexflow">
          {this.props.appState.editMode && <Button action={common.EDIT_TYPE_SL} {...editTypeButtonProps}>S&L</Button>}
          {this.props.appState.editMode && <Button action={common.EDIT_TYPE_S} {...editTypeButtonProps}>S</Button>}
          {this.props.appState.editMode && <Button action={common.EDIT_TYPE_L} {...editTypeButtonProps}>L</Button>}
          {this.props.appState.editMode && <Button action={common.EDIT_TYPE_SPECIFIC} {...editTypeButtonProps}>Week</Button>}
          <DatePicker id="datepicker" selected={this.state.date} onChange={this.onChangeDate} locale="cs-cz" disabled={shouldDisableDatePicker}/>
        </div>

        {this.props.appState.editMode && (
          <div className="flexflow">
            <ButtonFA content={common.fontAwesomeNamesForStates["unset"]} action="unset" {...actionButtonProps}/>
            <ButtonFA content={common.fontAwesomeNamesForStates["free"]} action="free" {...actionButtonProps}/>
            <ButtonFA content={common.fontAwesomeNamesForStates["occupied"]} action="occupied" {...actionButtonProps}/>
            <ButtonFA content={common.fontAwesomeNamesForStates["maybe"]} action="maybe" {...actionButtonProps}/>
          </div>
        )}
      </div>
    )
  }
}
