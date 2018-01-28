import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import {IconForState, EDIT_TYPE_SPECIFIC} from '../../common'
import 'moment/locale/cs'
import IconButton from 'material-ui/IconButton'
import CommentOIcon from 'mui-icons/fontawesome/comment-o'
import CommentingOIcon from 'mui-icons/fontawesome/commenting-o'
import CheckCircleIcon from 'mui-icons/fontawesome/check-circle'
import CircleIcon from 'mui-icons/fontawesome/circle'

// props = {fn click, user, hour, state}
class UserTableCell extends Component {

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
        (this.props.appState.editType !== EDIT_TYPE_SPECIFIC || (this.props.state.type === "custom" || this.props.appState.action !== "unset"))
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
      // const faState = common.fontAwesomeNamesForStates[visibleState]

      // unset: 'circle-o',
      // free: 'check',
      // occupied: 'times',
      // maybe: 'question',
      const stateIcon = IconForState[visibleState]
      // switch (visibleState) {
      //   case 'unset': stateIcon = <CircleOIcon />; break
      //   case 'free': stateIcon = <CheckIcon />; break
      //   case 'occupied': stateIcon = <TimesIcon />; break
      //   case 'maybe': stateIcon = <QuestionIcon />; break
      // }

      const ibiconstyle = {width: 13, height: 13}
      const ibstyle = {width: 15, height: 15, padding: 2}

      return (
        <td className={className} onClick={onTableCellClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <div className="flexflow flexaround">
            {/* base/custom indicator */}
            {type === 'base' && 
              <IconButton className="invisible" style={ibstyle} iconStyle={ibiconstyle}>
                <CircleIcon />
              </IconButton>
            }
            {type === 'custom' && 
              <IconButton style={ibstyle} iconStyle={ibiconstyle}>
                <CircleIcon />
              </IconButton>
            }

            {/* state indicator */}
            {!this.state.inNoteEditMode && // TODO: fix this super ugly code
              <IconButton style={ibstyle} iconStyle={ibiconstyle} disableTouchRipple={true}>
                {stateIcon}
              </IconButton>
            }

            {/* comment indicator */}
            {(!this.state.inNoteEditMode && (comment !== undefined && comment !== "") && !this.state.mouseEntered) && (
              <IconButton tooltip={comment} style={ibstyle} iconStyle={ibiconstyle}>
                <CommentOIcon />
              </IconButton>
                
            )}
            {(!this.state.inNoteEditMode && (comment === undefined || comment === "") && !this.state.mouseEntered) && (
              <IconButton className="invisible" style={ibstyle} iconStyle={ibiconstyle}>
                <CommentOIcon />
              </IconButton>
            )}

            {/* make comment indicator (mouse hover) */}
            {(!this.state.inNoteEditMode && this.state.mouseEntered) && (
              <IconButton className="pencilClass" tooltip={comment} style={ibstyle} iconStyle={ibiconstyle}
                onClick={e => {e.stopPropagation(); this.setState({inNoteEditMode: true})}}
                onMouseEnter={this.onCommentMouseEnter}
                onMouseLeave={this.onCommentMouseLeave}
              >
                <CommentingOIcon />
              </IconButton>
            )}

            {/* commenting mode */}
            {this.state.inNoteEditMode && (
              <div className="flexflow flexaround">
                <input type="text" placeholder={comment} ref={input => {this.textInput = input; if (input) input.focus()}} onKeyUp={this.onKeyUp} onClick={e => {e.stopPropagation()}}/>
                <IconButton style={ibstyle} iconStyle={ibiconstyle}
                  onClick={e => {e.stopPropagation(); this.setState({inNoteEditMode: false, mouseEntered: false}); console.log(this.textInput.value); this.props.appState.onTableCommentUpdate(this.props.day, this.props.hour, this.textInput.value); }}
                >
                  <CheckCircleIcon />
                </IconButton>
              </div>
            )}
          </div>
        </td>
      )
    }
}

UserTableCell.propTypes = {
  user: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  hour: PropTypes.number.isRequired,
  editable: PropTypes.bool.isRequired,
  state: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
}

export default UserTableCell