import React, { Component } from 'react'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import * as common from './common'
import {Button, ButtonFA} from './Button'
import {Toolbar, ToolbarGroup, ToolbarSeparator/*, ToolbarTitle*/} from 'material-ui/Toolbar'
import DatePicker from 'material-ui/DatePicker'

export default class ControlPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: moment()
    }

    this.onChangeDate = this.onChangeDate.bind(this)
  }

  onChangeDate(event, selectedDate) {
    // console.log(selectedDate)
    selectedDate = moment(selectedDate)
    this.setState({date: selectedDate})
    this.props.appState.onSelectedWeek(selectedDate)
  }

  render() {
    const editTypeButtonProps = {
      activeAction: this.props.appState.editType,
      onSelectedAction: this.props.appState.onSelectedEditType,
      // extraClassName: "smallerButton",
    }
    const actionButtonProps = {
      activeAction: this.props.appState.action,
      onSelectedAction: this.props.appState.onSelectedAction,
    }
    const shouldDisableDatePicker = this.props.appState.editMode && this.props.appState.editType !== common.EDIT_TYPE_SPECIFIC

    return (
      <div id="controlPanel">
        <Toolbar>
          <ToolbarGroup>
            {!this.props.appState.editMode && <Button action={common.EDIT_TYPE_TURN_ON} {...editTypeButtonProps}>Upravit</Button>}
            
            {this.props.appState.editMode && <Button action={common.EDIT_TYPE_TURN_OFF} {...editTypeButtonProps}>Konec</Button>}
            {this.props.appState.editMode && <Button action={common.EDIT_TYPE_SL} {...editTypeButtonProps}>S&amp;L</Button>}
            {this.props.appState.editMode && <Button action={common.EDIT_TYPE_S} {...editTypeButtonProps}>S</Button>}
            {this.props.appState.editMode && <Button action={common.EDIT_TYPE_L} {...editTypeButtonProps}>L</Button>}
            {this.props.appState.editMode && <Button action={common.EDIT_TYPE_SPECIFIC} {...editTypeButtonProps}>Týden</Button>}
            
            <DatePicker 
              locale={common.momentLocale} 
              DateTimeFormat={this.props.appState.dateTimeFormat} 
              disabled={shouldDisableDatePicker}
              onChange={this.onChangeDate}
              value={this.state.date.toDate()}
              hintText='Výběr data'
              textFieldStyle={{width:'12ex',marginLeft:'1ex'}}
            />
          </ToolbarGroup>
          {this.props.appState.editMode && (
            <ToolbarGroup>
              <ToolbarSeparator />
              <ButtonFA content={common.fontAwesomeNamesForStates["unset"]} action="unset" {...actionButtonProps}/>
              <ButtonFA content={common.fontAwesomeNamesForStates["free"]} action="free" {...actionButtonProps}/>
              <ButtonFA content={common.fontAwesomeNamesForStates["occupied"]} action="occupied" {...actionButtonProps}/>
              <ButtonFA content={common.fontAwesomeNamesForStates["maybe"]} action="maybe" {...actionButtonProps}/>
            </ToolbarGroup>
          )}
        </Toolbar>
      </div>
    )
  }
}
