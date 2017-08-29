import React, { Component } from 'react'
import * as common from './common.js'
import FontAwesome from 'react-fontawesome'

export class Button extends Component {
  render() {
    const highlightClassName = this.props.activeAction === this.props.action ? "highlight" : ""
    const className = [this.props.action, "button", highlightClassName, this.props.extraClassName]

    return (
      <div onClick={() => this.props.onSelectedAction(this.props.action)} className={className.join(" ")}>
        {this.props.children}
      </div>
    )
  }
}

export const ButtonFA = (props) => (
  <Button {...props}>
    <FontAwesome name={props.content}/>
  </Button>
)
