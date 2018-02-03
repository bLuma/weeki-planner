import React, { Component } from 'react'
import { FIStyle } from './common'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

export const Button = ({children, action, activeAction, onSelectedAction}) => (
  <RaisedButton
    label={children}
    primary={activeAction === action}
    onClick={() => onSelectedAction(action)}
    style={{marginRight: 3, marginLeft: 3}}
  />
)

export const ButtonFI = (props) => (
  <Button {...props}>
    <FontIcon style={FIStyle}>
      {props.content}
    </FontIcon>
  </Button>
)
