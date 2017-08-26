import React, { Component } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
//import * as common from './common.js'

export class Button extends Component {
  render() {
    const highlightClassName = this.props.activeAction === this.props.action ? "highlight" : ""
    const className = [this.props.action, "button", highlightClassName]

    return (
      <div onClick={() => this.props.onSelectedAction(this.props.action)} className={className.join(" ")}>{this.props.action}</div>
    )
  }
}

export default class ControlPanel extends Component {
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
    const buttonProps = {
      activeAction: this.props.action,
      onSelectedAction: this.props.onSelectedAction
    }

    return (
      <div id="controlPanel">
        <div className="flexflow">
          Týden: <DatePicker id="datepicker" selected={this.state.date} onChange={this.onChangeDate} locale="cs-cz"/>
        </div>
        <div className="flexflow">
          <Button action="unset" {...buttonProps}/>
          <Button action="free" {...buttonProps}/>
          <Button action="occupied" {...buttonProps}/>
          <Button action="maybe" {...buttonProps}/>
        </div>
      </div>
    )
  }
}
