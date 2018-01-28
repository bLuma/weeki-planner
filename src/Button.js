import React, { Component } from 'react'
import {FIStyle} from './common'
// import FontAwesome from 'react-fontawesome'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

export class Button extends Component {
  render() {
    //const highlightClassName = this.props.activeAction === this.props.action ? "highlight" : ""
    //const className = [this.props.action, "button", highlightClassName, this.props.extraClassName]

    return (
      <RaisedButton
        label={this.props.children}
        primary={this.props.activeAction === this.props.action}
        onClick={() => this.props.onSelectedAction(this.props.action)}
        style={{marginRight: 3, marginLeft: 3}}
      />
    )
  }
}

export const ButtonFI = (props) => (
  <Button {...props}>
    <FontIcon style={FIStyle}>
      {props.content}
    </FontIcon>
  </Button>
)
