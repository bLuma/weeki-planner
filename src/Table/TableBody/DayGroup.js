import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import { EmptySet, LocalDayNames } from '../../common'
import UserTableRow from './UserTableRow'

class DayGroup extends Component {
  render() {
    const users = Object.keys(this.props.users)
    const userRowsCount = users.length
    const userRows = users.map(user => (
      <UserTableRow key={user} user={user} day={this.props.day} data={this.props.users[user]} appState={this.props.appState}/>
    ))

    return (
      <tbody>
        <tr>
          <th rowSpan={userRowsCount + 1} className="paddingth">{LocalDayNames[this.props.day]}</th>
        </tr>
        {userRows}
        <tr>
          <td colSpan={EmptySet.length + 2}></td>
        </tr>
      </tbody>
    )
  }
}

DayGroup.propTypes = {
  day: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
}

export default DayGroup