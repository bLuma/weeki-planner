import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import {EmptySet, BaseHour} from '../../common'
import UserTableCell from './UserTableCell'

// props = {user, day, data[...,...,...]}
class UserTableRow extends Component {
  render() {
    const editable = this.props.user === this.props.appState.user
    const data = Array.from(this.props.data) || EmptySet.slice()
    const cells = data.map((state, idx) => (
      <UserTableCell key={idx} user={this.props.user} day={this.props.day} hour={BaseHour + idx} editable={editable} state={state} appState={this.props.appState}/>
    ))

    return (
      <tr>
        <th className="paddingth">{this.props.user}</th>
        {cells}
      </tr>
    )
  }
}

UserTableRow.propTypes = {
  user: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  appState: PropTypes.object.isRequired
}

export default UserTableRow