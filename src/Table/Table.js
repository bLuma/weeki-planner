import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import DayGroup from './TableBody/DayGroup'
import {WorkingDays} from '../common'
import TableHeaderWithHours from './TableHeaderWithHours'

class Table extends Component {
  
  aggregateUserDataForDay(day) {
    return this.props.appState.data.reduce((result, userObject) => {
      result[userObject.user] = userObject.data[day]
      return result
    }, {})
  }

  render() {
    const days = WorkingDays.map(day => (
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

Table.propTypes = {
  appState: PropTypes.object.isRequired
}

export default Table