import React, { Component }  from 'react'
import * as common from './common.js'

// props = {fn click, user, hour, state}
export const UserTableCell = (props) => (
  <td className={props.state} onClick={() => props.onTableClick(props.day, props.hour)}>{props.state}</td>
)

// props = {user, day, data[...,...,...]}
export class UserTableRow extends Component {
  render() {
    const data = this.props.data || common.emptySet.slice()
    const cells = data.map((state, idx) => (
      <UserTableCell key={idx} user={this.props.user} day={this.props.day} hour={common.baseHour + idx} state={state} onTableClick={this.props.onTableClick}/>
    ))

    return (
      <tr>
        <th>{this.props.user}</th>
        {cells}
      </tr>
    )
  }
}

export default class DayGroup extends Component {
  render() {
    const users = Object.keys(this.props.users)
    const userRowsCount = users.length
    const userRows = users.map(user => (
      <UserTableRow key={user} user={user} day={this.props.day} data={this.props.users[user]} onTableClick={this.props.onTableClick}/>
    ))

    return (
      <tbody>
        <tr><th rowSpan={userRowsCount+2}>{common.localDayNames[this.props.day]}</th></tr>
        {userRows}
        <tr></tr>
      </tbody>
    )
  }
}

