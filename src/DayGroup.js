import React, { Component }  from 'react'
import * as common from './common.js'
import FontAwesome from 'react-fontawesome'

// props = {fn click, user, hour, state}
export class UserTableCell extends Component {

    constructor(props) {
      super(props)

      this.state = {
        mouseEntered: false,
        inNoteEditMode: false
      }

      this.onMouseEnter = this.onMouseEnter.bind(this)
      this.onMouseLeave = this.onMouseLeave.bind(this)
      this.onKeyUp = this.onKeyUp.bind(this)
    }

    onMouseEnter() {
      this.setState({mouseEntered: true})
    }

    onMouseLeave() {
      this.setState({mouseEntered: false})
    }

    onKeyUp(e) {
      //console.log(e.key + " " + e.keyCode + " " + e.charCode + " " + e.which);
      if (e.key === 'Enter') {
        this.setState({inNoteEditMode: false})
      } else if (e.key === 'Escape') {
        this.setState({inNoteEditMode: false})
      }
    }

    render() {
      const className = [this.props.state, this.props.appState.editMode ? "editable" : ""].join(" ")
      const onClick = () => this.props.appState.onTableClick(this.props.day, this.props.hour)
      const faState = common.fontAwesomeIconsForStates[this.props.state]

      return (
        <td className={className} onClick={onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <div className="flexflow flexaround">
            {!this.state.inNoteEditMode &&
              <FontAwesome name={faState}/>
            }
            {(this.state.mouseEntered || this.state.inNoteEditMode) && (
              <div>
                {!this.state.inNoteEditMode && (
                  <FontAwesome name="pencil-square-o" className="pencilClass" onClick={e => {e.stopPropagation(); this.setState({inNoteEditMode: true})}}/>
                )}
                {this.state.inNoteEditMode && (
                  <div className="flexflow flexaround">
                    <input type="text" ref={input => {this.textInput = input}} onKeyUp={this.onKeyUp} onClick={e => {e.stopPropagation()}}/>
                    <FontAwesome name="check-circle" className="pencilClass" onClick={e => {e.stopPropagation(); this.setState({inNoteEditMode: false, mouseEntered: false}); console.log(this.textInput.value); }}/>
                  </div>
                )}
              </div>
            )}
          </div>
        </td>
      )
    }
}



// props = {user, day, data[...,...,...]}
export class UserTableRow extends Component {
  render() {
    const data = this.props.data || common.emptySet.slice()
    const cells = data.map((state, idx) => (
      <UserTableCell key={idx} user={this.props.user} day={this.props.day} hour={common.baseHour + idx} state={state} appState={this.props.appState}/>
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
      <UserTableRow key={user} user={user} day={this.props.day} data={this.props.users[user]} appState={this.props.appState}/>
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

