import React, { Component }  from 'react'
import DayGroup from './DayGroup'
import * as common from './common'

export class TableHeaderWithHours extends Component {

  render() {
    const ths = this.props.hours.map(hour => (
      <th key={hour}>{hour}-{hour + 1}</th>
    ))

    return (
      <tr>
        <td colSpan="2"></td>
        {ths}
      </tr>
    );
  }
}


export default class Table extends Component {
  aggregateUserDataForDay(day) {
    return this.props.appState.data.reduce((result, userObject) => {
      result[userObject.user] = userObject.data[day]
      return result
    }, {})
  }

  render() {
    const days = common.workingDays.map(day => (
        <DayGroup key={day} day={day} users={this.aggregateUserDataForDay(day)} appState={this.props.appState}/>
    ))

    return (
      <table>
        <thead>
          <TableHeaderWithHours hours={this.props.appState.hours}/>
        </thead>
        {days}
      </table>
    )
  }
}