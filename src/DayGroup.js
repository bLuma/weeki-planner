import React, { Component }  from 'react'
import * as common from './common'
import FontAwesome from 'react-fontawesome'

// props = {fn click, user, hour, state}
export class UserTableCell extends Component {

    constructor(props) {
      super(props)

      this.state = {
        mouseEntered: false,
        inNoteEditMode: false,
        commentMouseEntered: false
      }

      this.onMouseEnter = this.onMouseEnter.bind(this)
      this.onMouseLeave = this.onMouseLeave.bind(this)
      this.onKeyUp = this.onKeyUp.bind(this)
      this.onCommentMouseEnter = this.onCommentMouseEnter.bind(this)
      this.onCommentMouseLeave = this.onCommentMouseLeave.bind(this)
    }

    onMouseEnter() {
      if (this.isEditable())
        this.setState({mouseEntered: true})
    }

    onMouseLeave() {
      this.setState({mouseEntered: false})
    }

    onCommentMouseEnter() {
      this.setState({commentMouseEntered: true})
    }

    onCommentMouseLeave() {
      this.setState({commentMouseEntered: false})
    }

    onKeyUp(e) {
      //console.log(e.key + " " + e.keyCode + " " + e.charCode + " " + e.which);
      if (e.key === 'Enter') {
        this.setState({inNoteEditMode: false})
        console.log(this.textInput.value);
        this.props.appState.onTableCommentUpdate(this.props.day, this.props.hour, this.textInput.value);
      } else if (e.key === 'Escape') {
        this.setState({inNoteEditMode: false})
      }
    }

    isEditable() {
      return this.props.editable && this.props.appState.editMode &&
        (this.props.appState.editType !== common.EDIT_TYPE_SPECIFIC || (this.props.state.type === "custom" || this.props.appState.action !== "unset"))
    }

    render() {
      const onTableCellClick = this.isEditable() ? (() => this.props.appState.onTableClick(this.props.day, this.props.hour)) : () => {}
      const {state, comment, type} = this.props.state

      const mouseOverCommentButton = this.state.commentMouseEntered
      const className = [
        state,
        this.isEditable() ? "editable" : "",
        this.state.mouseEntered && !mouseOverCommentButton ? this.props.appState.action + "-striped" : ""
      ].join(" ")

      const visibleState = this.state.mouseEntered && !mouseOverCommentButton ? this.props.appState.action : state
      const faState = common.fontAwesomeNamesForStates[visibleState]

      return (
        <td className={className} onClick={onTableCellClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <div className="flexflow flexaround">
            {/* base/custom indicator */}
            {type === 'base' && <FontAwesome name="circle" className="invisible"/>}
            {type === 'custom' && <FontAwesome name="circle"/>}

            {/* state indicator */}
            {!this.state.inNoteEditMode && // TODO: fix this super ugly code
              <FontAwesome name={faState}/>
            }

            {/* comment indicator */}
            {(!this.state.inNoteEditMode && (comment !== undefined && comment !== "") && !this.state.mouseEntered) && (
              <FontAwesome name="comment-o" title={comment} />
            )}
            {(!this.state.inNoteEditMode && (comment === undefined || comment === "") && !this.state.mouseEntered) && (
              <FontAwesome name="comment-o" className="invisible"/>
            )}

            {/* make comment indicator (mouse hover) */}
            {(!this.state.inNoteEditMode && this.state.mouseEntered) && (
              <FontAwesome name="commenting-o" className="pencilClass" title={comment} onClick={e => {e.stopPropagation(); this.setState({inNoteEditMode: true})}}
                onMouseEnter={this.onCommentMouseEnter}
                onMouseLeave={this.onCommentMouseLeave}
                />
            )}

            {/* commenting mode */}
            {this.state.inNoteEditMode && (
              <div className="flexflow flexaround">
                <input type="text" placeholder={comment} ref={input => {this.textInput = input; if (input) input.focus()}} onKeyUp={this.onKeyUp} onClick={e => {e.stopPropagation()}}/>
                <FontAwesome name="check-circle" className="pencilClass" onClick={e => {e.stopPropagation(); this.setState({inNoteEditMode: false, mouseEntered: false}); console.log(this.textInput.value); this.props.appState.onTableCommentUpdate(this.props.day, this.props.hour, this.textInput.value); }}/>
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
    const editable = this.props.user === this.props.appState.user
    const data = Array.from(this.props.data) || common.emptySet.slice()
    const cells = data.map((state, idx) => (
      <UserTableCell key={idx} user={this.props.user} day={this.props.day} hour={common.baseHour + idx} editable={editable} state={state} appState={this.props.appState}/>
    ))

    return (
      <tr>
        <th className="paddingth">{this.props.user}</th>
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
        <tr><th rowSpan={userRowsCount+2} className="paddingth">{common.localDayNames[this.props.day]}</th></tr>
        {userRows}
        <tr></tr>
      </tbody>
    )
  }
}

