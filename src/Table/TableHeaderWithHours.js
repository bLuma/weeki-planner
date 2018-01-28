import React, { Component }  from 'react'
import PropTypes from 'prop-types'

class TableHeaderWithHours extends Component {

  render() {
    const ths = this.props.hours.map(hour => (
      <th key={hour}>{hour}&ndash;{hour + 1}</th>
    ))

    return (
      <tr>
        <td colSpan="2"></td>
        {ths}
      </tr>
    );
  }
}

TableHeaderWithHours.propTypes = {
  hours: PropTypes.array.isRequired
}

export default TableHeaderWithHours