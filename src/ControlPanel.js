import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {MomentLocale, IconForState, EDIT_TYPE_TURN_ON, EDIT_TYPE_TURN_OFF, EDIT_TYPE_SL, EDIT_TYPE_S, EDIT_TYPE_L, EDIT_TYPE_SPECIFIC} from './common'
import {Button, ButtonFI} from './Button'
import {Toolbar, ToolbarGroup, ToolbarSeparator/*, ToolbarTitle*/} from 'material-ui/Toolbar'
import DatePicker from 'material-ui/DatePicker'

class ControlPanel extends Component {
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
    const shouldDisableDatePicker = this.props.appState.editMode && this.props.appState.editType !== EDIT_TYPE_SPECIFIC

    return (
      <div id="controlPanel">
        <Toolbar>
          <ToolbarGroup>
            {!this.props.appState.editMode && <Button action={EDIT_TYPE_TURN_ON} {...editTypeButtonProps}>Upravit</Button>}
            
            {this.props.appState.editMode && <Button action={EDIT_TYPE_TURN_OFF} {...editTypeButtonProps}>Konec</Button>}
            {this.props.appState.editMode && <Button action={EDIT_TYPE_SL} {...editTypeButtonProps}>S&amp;L</Button>}
            {this.props.appState.editMode && <Button action={EDIT_TYPE_S} {...editTypeButtonProps}>S</Button>}
            {this.props.appState.editMode && <Button action={EDIT_TYPE_L} {...editTypeButtonProps}>L</Button>}
            {this.props.appState.editMode && <Button action={EDIT_TYPE_SPECIFIC} {...editTypeButtonProps}>Týden</Button>}
            
            <DatePicker 
              locale={MomentLocale} 
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
              <ButtonFI content={IconForState["unset"]} action="unset" {...actionButtonProps}/>
              <ButtonFI content={IconForState["free"]} action="free" {...actionButtonProps}/>
              <ButtonFI content={IconForState["occupied"]} action="occupied" {...actionButtonProps}/>
              <ButtonFI content={IconForState["maybe"]} action="maybe" {...actionButtonProps}/>
            </ToolbarGroup>
          )}
        </Toolbar>
      </div>
    )
  }
}

ControlPanel.propTypes = {
  appState: PropTypes.object.isRequired
}

export default ControlPanel